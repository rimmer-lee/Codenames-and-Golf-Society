const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RuleSchema = new Schema({
    index: Number,
    description: [ String ],
    demerits: Number,
    rules: [ this ]
});

module.exports = mongoose.model('Rule', RuleSchema);