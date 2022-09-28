const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Country = require('./country');

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

RegionSchema.statics.findByCountry = async function(value) {
    const options = /\w{3}/.test(value) ? { code: value } : { country: value };
    const country = await Country.find(options);
    return await this.find({ country }).populate('country');
};

// why is this no longer working?
// RegionSchema.statics.findByCountry = async function(code) {
//     return await this.find().populate({ path: 'country', match: { code } }).populate('country');
// };

module.exports = mongoose.model('Region', RegionSchema);