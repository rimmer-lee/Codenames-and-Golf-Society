const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { TITLES, ACTIONS } = require('../constants');

const BreakdownSchema = new Schema({
    description: [ String ],
    breakdown: [ this ]
});

const RuleSchema = new Schema({
    index: Number,
    description: [ String ],
    action: {
        demerits: Number,
        titles: [
            {
                method: {
                    type: String,
                    enum: ACTIONS.map(({ method }) => method)
                },
                title: {
                    type: String,
                    enum: TITLES.map(({ value }) => value)
                }
            }
        ]
    },
    breakdown: [ BreakdownSchema ]
});

module.exports = mongoose.model('Rule', RuleSchema);