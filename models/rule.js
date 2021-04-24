const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
                    enum: ['award', 'revoke']
                },
                title: {
                    type: String,
                    enum: ['Ace', 'flag bitch', 'Karen']
                }
            }
        ]
    },
    breakdown: [ BreakdownSchema ]
});

module.exports = mongoose.model('Rule', RuleSchema);