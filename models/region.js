const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { COUNTRY_CODES } = require('../constants');

const RegionSchema = new Schema({
    name: String,
    code: {
        type: String,
        unique: true
    },
    country: {
        type: String,
        enum: COUNTRY_CODES.map(({ name }) => name)
    }
});

module.exports = mongoose.model('Region', RegionSchema);