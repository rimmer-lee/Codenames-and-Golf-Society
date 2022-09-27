const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegionSchema = new Schema({
    code: {
        type: String,
        unique: true
    },
    country: {
        ref: 'Country',
        type: Schema.Types.ObjectId
    },
    name: String
});

RegionSchema.statics.findByCountry = async function(country) {
    return await this.find().populate({ path: 'country', match: { country } }).populate('country');
};

RegionSchema.statics.findByCountryCode = async function(code) {
    return await this.find().populate({ path: 'country', match: { code } }).populate('country');
};

module.exports = mongoose.model('Region', RegionSchema);