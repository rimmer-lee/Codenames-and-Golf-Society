const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TitleSchema = new Schema({
    name: {
        type: String,
        enum: ['Ace', 'flag bitch', 'Karen'],
        required: true
    },
    holder: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    comments: String
});

module.exports = mongoose.model('Title', TitleSchema);