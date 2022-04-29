const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const { GENDERS, NAME_TITLES, ROLES } = require('../constants');

const { customDate } = require('../utilities/formatDate');
const sort = require('../utilities/sort');

const options = { toJSON: { virtuals: true } };

const handicapObject = {
    type: Number,
    default: 54.0,
    max: 54.0
};

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const UserSchema = new Schema({
    name: {
        title: {
            type: String,
            enum: NAME_TITLES
        },
        preferred: String,
        full: String,
        first: String,
        middle: [ String ],
        last: String
    },
    images: [ ImageSchema ],
    username: {
        type: String,
        unique: true,
        sparse: true
        // required: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive'],
        required: true
    },
    role: {
        type: String,
        default: 'guest',
        enum: ROLES,
        required: true
    },
    birthday: Date,
    gender: {
        type: String,
        enum: GENDERS
    },
    password: String,
    handicap: {
        progression: [
            {
                date: Date,
                handicap: handicapObject
            }
        ],
        starting: handicapObject,
        current: handicapObject
    }
}, options);

UserSchema.plugin(passportLocalMongoose, { usernameQueryFields: [ 'email' ] });

UserSchema.pre('save', async function(next) {
    const { full } = this.name;
    if (!full) return next();
    const names = full.split(' ');
    for (let i = 1; i < 4; i++) {
        switch (i) {
            case 1:
                this.name.first = names.shift();
                break;
            case 2:
                this.name.last = names.pop();
                break;
            case 3:
                this.name.middle = names;
                break;
        };
    };
    next();
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
    const { first = '', middle = [], last = '' } = this.name;
    if (!first && !last) return;
    return `${first[0]}. ${middle.length > 0 ? middle.map(m => `${m[0]}.`).join(' ') + ' ' : ''}${last}`;
});

UserSchema.virtual('name.initials').get(function() {
    const { knownAs = '', first = '', middle = [], last = '' } = this.name;
    if (!knownAs && !last) return;
    return {
        short: `${knownAs[0]}${last[0]}`,
        full: `${first[0]}${middle.length > 0 ? middle.map(m => m[0]).join('') : ''}${last[0]}`
    }
});

UserSchema.statics.findMembers = async function() {
    const members = await this.find({ 'role': { $nin: ['guest', 'super'] } });
    return sort(members, 'name.friendly');
};

UserSchema.statics.findPlayers = async function() {
    const players = await this.find({ 'role': { $ne: 'super' } });
    return sort(players, 'name.friendly');
};

module.exports = mongoose.model('User', UserSchema);