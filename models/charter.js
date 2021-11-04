const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formatDate = require('../utilities/formatDate');

const options = { toJSON: { virtuals: true } };

const SectionSchema = new Schema({
    title: String,
    description: [ String ],
    rules: [{ type: Schema.Types.ObjectId, ref: 'Rule' }]
});

const CharterSchema = new Schema({
    created: {
        date: {
            type: Date,
            default: Date.now(),
            required: true
        },
        by: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comments: String,
        // format of year and iteration e.g. 2021.2
        version: {
            type: String,
            required: true,
            // unique: true
        }
    },
    sections: [ SectionSchema ],
    status: {
        type: String,
        enum: ['Submitted', 'Approved'],
        required: true
    }
}, options);

CharterSchema.virtual('created.fullDate').get(function () {
    const { date } = this.created;
    return `${formatDate.fullDate(date)} ${formatDate.time(date)}`;
});

module.exports = mongoose.model('Charter', CharterSchema);