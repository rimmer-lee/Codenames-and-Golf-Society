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

module.exports = mongoose.model('Region', RegionSchema);