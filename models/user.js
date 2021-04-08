const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const options = { toJSON: { virtuals: true } };

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const UserSchema = new Schema({
    name: {
        knownAs: String,
        first: String,
        middle: [ String ],
        last: String
    },
    image: ImageSchema,
    email: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        enum: ['founder', 'admin', 'user'],
        required: true
    }
}, options);

// UserSchema.plugin(passportLocalMongoose);

UserSchema.virtual('name.full').get(function () {
    const { first, middle = [], last } = this;
    if (!first || !last) return;
    return `${first} ${middle.length > 0 ? middle.join(' ') + ' ' : ''}${last}`;
});

UserSchema.virtual('name.initialed').get(function () {
    const { first = '', middle = [], last = '' } = this;
    if (!first || !last) return;
    return `${first[0]}. ${middle.length > 0 ? middle.map(m => `${m[0]}.`).join(' ') + ' ' : ''}${last}`;
});

module.exports = mongoose.model('User', UserSchema);