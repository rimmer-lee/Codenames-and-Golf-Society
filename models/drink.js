const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formatDate = require('../utilities/formatDate');

const DrinkSchema = new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    value: { type: Number, required: true },
    comments: String,
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

DrinkSchema.virtual('formattedDate.datePicker').get(function () {
    return formatDate('yyyy-mm-dd', this.date);
});

DrinkSchema.virtual('formattedDate.friendly').get(function () {
    return formatDate('dd/mm/yyyy', this.date);
});

module.exports = mongoose.model('Drink', DrinkSchema);