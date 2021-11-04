const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { TEE_COLOURS } = require('../constants');

const formatDate = require('../utilities/formatDate');

const ScoreSchema = new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    team: String,
    shots: [ Number ]
});

const RoundSchema = new Schema({
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
        comments: String
    },
    lastModified: {
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
        comments: String
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    tee: {
        type: String,
        enum: TEE_COLOURS.map(({ colours }) => colours)
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    games: [ String ],
    scores: [ ScoreSchema ]
});

RoundSchema.virtual('formattedDate').get(function () {
    const { date } = this;
    return {
        datePicker: formatDate.customDate('yyyy-mm-dd', date),
        friendly: formatDate.customDate('dd/mm/yyyy', date),
        full: formatDate.fullDate(date)
    };
});

module.exports = mongoose.model('Round', RoundSchema);