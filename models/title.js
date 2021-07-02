const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// get titles from from elsewhere
const titles = ['Ace', 'flag bitch', 'Karen'];

const formatDate = require('../utilities/formatDate');

const options = { toJSON: { virtuals: true } };

const TitleSchema = new Schema({
    name: {
        type: String,
        enum: titles,
        required: true
    },
    method: {
        type: String,
        enum: ['award', 'revoke']
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

TitleSchema.virtual('when.formattedDate.datePicker').get(function () {
    return formatDate('yyyy-mm-dd', this.when.date);
});

TitleSchema.virtual('when.formattedDate.friendly').get(function () {
    return formatDate('dd/mm/yyyy', this.when.date);
});

TitleSchema.virtual('when.formattedDate.date').get(function () {
    const date = this.when.date;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
});

module.exports = mongoose.model('Title', TitleSchema);