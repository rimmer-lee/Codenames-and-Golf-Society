const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Title = require('./title');

const formatDate = require('../utilities/formatDate');

const options = { toJSON: { virtuals: true } };

const DemeritSchema = new Schema({
    when: {
        date: {
            type: Date,
            default: Date.now(),
            required: true
        },
        hole: Number
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rule: {
        type: Schema.Types.ObjectId,
        ref: 'Rule',
        required: true
    },
    comments: String,
    status: {
        type: String,
        enum: ['Submitted', 'Approved'],
        required: true
    },
    action: {
        demerits: {
            type: Number,
            default: 0,
            required: true
        },
        titles: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Title'
            }
        ]
    },
    history: [
        {
            status: {
                type: String,
                enum: ['Created', 'Submitted', 'Approved'],
                reqrired: true
            },
            updated: {
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                date: {
                    type: Date,
                    default: Date.now(),
                    required: true
                },
                // updates: [{ property: String, value: String }]
            }
        }
    ]
}, options);

// shared with drink schema
DemeritSchema.virtual('when.formattedDate.datePicker').get(function () {
    return formatDate('yyyy-mm-dd', this.when.date);
});

DemeritSchema.virtual('when.formattedDate.friendly').get(function () {
    return formatDate('dd/mm/yyyy', this.when.date);
});

DemeritSchema.virtual('when.formattedDate.date').get(function () {
    const date = this.when.date;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
});

DemeritSchema.post('findOneAndDelete', async function(demerit) {
    if (demerit && demerit.action && demerit.action.titles) {
        for (const title of demerit.action.titles) {
            console.log(await Title.findById(title._id))
            await Title.findByIdAndDelete(title._id)
        };
    };
});

module.exports = mongoose.model('Demerit', DemeritSchema);