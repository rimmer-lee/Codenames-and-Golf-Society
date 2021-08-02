const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const { NAME_TITLES, GENDERS } = require('../constants');

const formatDate = require('../utilities/formatDate');

const options = { toJSON: { virtuals: true } };

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
        first: String,
        middle: [ String ],
        last: String
    },
    image: ImageSchema,
    email: {
        type: String,
        // unique: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['founder', 'admin', 'user', 'super'],
        required: true
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive'],
        required: true
    },
    birthday: Date,
    gender: {
        type: String,
        enum: GENDERS
    }
}, options);

UserSchema.plugin(passportLocalMongoose);

UserSchema.virtual('name.knownAs').get(function () {
    const { first, preferred } = this.name;
    return preferred ? preferred : first;
});

UserSchema.virtual('name.full').get(function () {
    const { first, middle = [], last } = this.name;
    if (!first && !last) return;
    return `${first} ${middle.length > 0 ? middle.join(' ') + ' ' : ''}${last}`;
});

UserSchema.virtual('name.friendly').get(function () {
    const { knownAs, last } = this.name;
    if (!knownAs && !last) return;
    return `${knownAs} ${last}`;
});

UserSchema.virtual('name.initialed').get(function () {
    const { first = '', middle = [], last = '' } = this.name;
    if (!first && !last) return;
    return `${first[0]}. ${middle.length > 0 ? middle.map(m => `${m[0]}.`).join(' ') + ' ' : ''}${last}`;
});

UserSchema.virtual('formattedBirthday.datePicker').get(function () {
    return formatDate('yyyy-mm-dd', this.birthday);
});

UserSchema.virtual('formattedBirthday.friendly').get(function () {
    return formatDate('dd/mm/yyyy', this.birthday);
});

UserSchema.virtual('formattedBirthday.date').get(function () {
    const date = this.birthday;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
});

module.exports = mongoose.model('User', UserSchema);