const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const { GENDERS, NAME_TITLES, NON_MEMBERS, ROLES } = require('../constants');

const { customDate } = require('../utilities/formatDate');

const options = { toJSON: { virtuals: true } };

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const UserSchema = new Schema({
    birthday: Date,
    email: {
        sparse: true,
        type: String,
        unique: true
    },
    gender: {
        enum: GENDERS,
        type: String
    },
    handicap: {
        handicaps: [
            {
                calculated: {
                    default: true,
                    type: Boolean
                },
                date: Date,
                value: {
                    type: Number,
                    default: 54.0,
                    max: 54.0
                }
            }
        ],
        scoreDifferentials: [
            {
                date: Date,
                exceptions: [
                    {
                        date: Date,
                        value: Number
                    }
                ],
                value: Number
            }
        ],
        starting: Number
    },
    images: [ ImageSchema ],
    name: {
        first: String,
        full: String,
        last: String,
        middle: [ String ],
        preferred: String,
        title: {
            enum: NAME_TITLES,
            type: String
        }
    },
    password: String,
    role: {
        default: 'guest',
        enum: ROLES,
        required: true,
        type: String
    },
    status: {
        default: 'active',
        enum: ['active', 'inactive'],
        required: true,
        type: String
    },
    username: {
        // required: true,
        sparse: true,
        type: String,
        unique: true
    }
}, options);

UserSchema.plugin(passportLocalMongoose, { usernameQueryFields: [ 'email' ] });

UserSchema.pre('save', async function(next) {
    const { full } = this.name;
    if (!full) return next();
    const names = full.split(' ');
    this.name.first = names.shift();
    this.name.last = names.pop();
    this.name.middle = names;
    next();
});

UserSchema.virtual('access').get(function() {
    const { role } = this;
    return {
        admin: ['admin', 'super'].includes(role),
        edit: ['admin', 'founder', 'super'].includes(role)
    };
});

UserSchema.virtual('formattedBirthday').get(function() {
    const { birthday } = this;
    if (!birthday) return null;
    return {
        datePicker: customDate('yyyy-mm-dd', birthday),
        friendly: customDate('dd/mm/yyyy', birthday),
        date: new Date(birthday.getUTCFullYear(), birthday.getUTCMonth(), birthday.getUTCDate())
    };
});

UserSchema.virtual('handicap.current').get(function() {
    const { handicap: { handicaps } } = this;
    if (handicaps.length === 0) return 54.0;
    return handicaps[handicaps.length - 1].value;
});

UserSchema.virtual('name.knownAs').get(function() {
    const { first, preferred } = this.name;
    return preferred ? preferred : first;
});

UserSchema.virtual('name.friendly').get(function() {
    const { knownAs, last } = this.name;
    if (!knownAs && !last) return;
    return `${knownAs} ${last}`;
});

UserSchema.virtual('name.initialed').get(function() {
    const { first = ' ', middle = [], last = ' ' } = this.name;
    if (!first && !last) return;
    return `${first[0]}. ${middle.length > 0 ? middle.map(m => `${m[0]}.`).join(' ') + ' ' : ''}${last}`;
});

UserSchema.virtual('name.initials').get(function() {
    const { knownAs = ' ', first = ' ', middle = [], last = ' ' } = this.name;
    if (!knownAs && !last) return;
    return {
        short: `${knownAs[0]}${last[0]}`,
        full: `${first[0]}${middle.length > 0 ? middle.map(m => m[0]).join('') : ''}${last[0]}`
    }
});

UserSchema.statics.findMembers = async function() {
    const members = await this.find({ 'role': { $nin: NON_MEMBERS } });
    return members.sortAlphabetically('name.friendly');
};

UserSchema.statics.findPlayers = async function() {
    const players = await this.find({ 'role': { $ne: 'super' } });
    return players.sortAlphabetically('name.friendly');
};

module.exports = mongoose.model('User', UserSchema);