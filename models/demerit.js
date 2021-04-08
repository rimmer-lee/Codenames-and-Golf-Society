const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formatDate = require('../utilities/formatDate');

const options = { toJSON: { virtuals: true } };

const DemeritSchema = new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    value: { type: Number, required: true },
    rule: {
        type: Schema.Types.ObjectId,
        ref: 'Rule',
        required: true
    },
    comments: String,
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    history: [
        {
            status: {
                type: String,
                enum: ['Submitted', 'Approved'],
                // reqrired: true
            },
            updated: {
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    // required: true
                },
                date: {
                    type: Date,
                    default: Date.now(),
                    // required: true
                },
                changes: [
                    {
                        property: {
                            type: String,
                            enum: ['comments', 'rule', 'value', 'player'],
                            // required: true
                        },
                        value: { 
                            type: String,
                            // required: true
                        }
                    }                    
                ]
            }
        }
    ],
    created: {
        by: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            // required: true
        },
        date: {
            type: Date,
            default: Date.now(),
            // required: true
        }
    }
}, options);

// shared with drink schema
DemeritSchema.virtual('formattedDate.datePicker').get(function () {
    return formatDate('yyyy-mm-dd', this.date);
});

DemeritSchema.virtual('formattedDate.friendly').get(function () {
    return formatDate('dd/mm/yyyy', this.date);
});

module.exports = mongoose.model('Demerit', DemeritSchema);