const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formatDate = require('../utilities/formatDate');

const DrinkSchema = new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    value: {
        type: Number,
        default: 0,
        required: true
    },
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

DrinkSchema.virtual('formattedDate.date').get(function () {
    const date = this.date;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
});

module.exports = mongoose.model('Drink', DrinkSchema);