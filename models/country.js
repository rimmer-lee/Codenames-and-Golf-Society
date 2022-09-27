const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
    code: {
        type: String,
        unique: true
    },
    name: String
});

module.exports = mongoose.model('Country', CountrySchema);