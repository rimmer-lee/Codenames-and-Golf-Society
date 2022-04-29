const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formatDate = require('../utilities/formatDate');

const options = { toJSON: { virtuals: true } };

const SectionSchema = new Schema({
    title: String,
    description: [ String ],
    rules: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Rule'
        }
    ]
});

const CharterSchema = new Schema({
    created: {
        date: {
            type: Date,
            default: Date.now(),
            required: true,
            immutable: true
        },
        by: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comments: String
    },
    sections: [ SectionSchema ],
    status: {
        type: String,
        enum: ['Submitted', 'Approved'],
        required: true
    },
    version: {
        type: Number,
        required: true,
        unique: true,
        immutable: true
    }
}, options);

CharterSchema.virtual('created.fullDate').get(function () {
    const { date } = this.created;
    return `${formatDate.fullDate(date)} ${formatDate.time(date)}`;
});

CharterSchema.pre('validate', async function(next) {
    const charters = await Charter.find();
    this.version = ++charters.length;
    next();
});

CharterSchema.statics.findLatest = async function() {
    return await this.findOne().sort({ 'version': -1 }).populate('sections.rules');
};

const Charter = mongoose.model('Charter', CharterSchema)

module.exports = Charter;