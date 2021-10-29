const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { customDate } = require('../utilities/formatDate');

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

DrinkSchema.virtual('when.formattedDate').get(function () {
    const date = this.when.date;
    return {
        datePicker: customDate('yyyy-mm-dd', date),
        friendly: customDate('dd/mm/yyyy', date),
        date: new Date(date.getFullYear(), date.getMonth(), date.getDate())
    };
});

DrinkSchema.pre('save', function(next) {
    this.when.updated = Date.now();
    next();
});

module.exports = mongoose.model('Drink', DrinkSchema);