const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formatDate = require('../utilities/formatDate');

const options = { toJSON: { virtuals: true } };

const DemeritSchema = new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    value: { type: Number, required: true },
    rule: {
        type: Schema.Types.ObjectId,
        ref: 'Rule',
        required: true
    },
    comments: String,
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
}, options);

DemeritSchema.virtual('formattedDate.datePicker').get(function () {
    return formatDate('yyyy-mm-dd', this.date);
});

DemeritSchema.virtual('formattedDate.friendly').get(function () {
    return formatDate('dd/mm/yyyy', this.date);
});

module.exports = mongoose.model('Demerit', DemeritSchema);