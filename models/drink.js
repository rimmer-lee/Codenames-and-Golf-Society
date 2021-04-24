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
    when: {
        date: {
            type: Date,
            default: Date.now(),
            required: true
        },
        created: {
            type: Date,
            default: Date.now(),
            required: true
        },
        updated: {
            type: Date,
            default: Date.now(),
            required: true
        }
    }
});

DrinkSchema.virtual('when.formattedDate.datePicker').get(function () {
    return formatDate('yyyy-mm-dd', this.when.date);
});

DrinkSchema.virtual('when.formattedDate.friendly').get(function () {
    return formatDate('dd/mm/yyyy', this.when.date);
});

DrinkSchema.virtual('when.formattedDate.date').get(function () {
    const date = this.when.date;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
});

DrinkSchema.pre('save', function(next) {
    this.when.updated = Date.now();
    next();
});

module.exports = mongoose.model('Drink', DrinkSchema);