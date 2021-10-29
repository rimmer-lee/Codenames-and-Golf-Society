const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { TITLES, ACTIONS } = require('../constants');

const { customDate } = require('../utilities/formatDate');

const options = { toJSON: { virtuals: true } };

const TitleSchema = new Schema({
    name: {
        type: String,
        enum: TITLES.map(({ value }) => value),
        required: true
    },
    method: {
        type: String,
        enum: ACTIONS.map(({ method }) => method)
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    when: {
        hole: Number,
        date: {
            type: Date,
            default: Date.now(),
            required: true
        },
        updated: {
            type: Date,
            default: Date.now(),
            required: true
        },
        created: {
            type: Date,
            default: Date.now(),
            required: true
        }
    }
}, options);

TitleSchema.virtual('when.formattedDate').get(function () {
    const date = this.when.date;
    return {
        datePicker: customDate('yyyy-mm-dd', date),
        friendly: customDate('dd/mm/yyyy', date),
        date: new Date(date.getFullYear(), date.getMonth(), date.getDate())
    };
});

module.exports = mongoose.model('Title', TitleSchema);