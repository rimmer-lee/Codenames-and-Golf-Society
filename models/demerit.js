const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Title = require('./title');

const { customDate } = require('../utilities/formatDate');

const options = { toJSON: { virtuals: true } };

const DemeritSchema = new Schema({
    when: {
        date: {
            type: Date,
            default: Date.now(),
            required: true
        },
        hole: Number,
        updated: {
            type: Date,
            default: Date.now(),
            required: true
        },
        created: {
            type: Date,
            default: Date.now(),
            required: true,
            immutable: true
        }
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
                required: true
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

DemeritSchema.virtual('when.formattedDate').get(function () {
    const { date } = this.when;
    return {
        datePicker: customDate('yyyy-mm-dd', date),
        friendly: customDate('dd/mm/yyyy', date),
        date: new Date(date.getFullYear(), date.getMonth(), date.getDate())
    };
});

DemeritSchema.post('findOneAndDelete', async function(demerit) {
    if (demerit && demerit.action && demerit.action.titles) {
        await Title.deleteMany({ _id: { $in: demerit.action.titles } })
    };
});

DemeritSchema.pre('save', function(next) {
    this.when.updated = Date.now();
    next();
});

module.exports = mongoose.model('Demerit', DemeritSchema);