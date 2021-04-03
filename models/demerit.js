const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DemeritSchema = new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    value: { type: Number, required: true },
    // rule: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Section',
    //     required: true
    // },
    comments: String,
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

module.exports = mongoose.model('Demerit', DemeritSchema);