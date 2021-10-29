const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { TEE_COLOURS } = require('../constants');

const HoleSchema = new Schema({
    name: String,
    index: {
        type: Number,
        min: 1,
        max: 18
    },
    distance: Number,
    strokeIndex: {
        type: Number,
        min: 1,
        max: 18
    },
    par: {
        type: Number,
        min: 3,
        max: 5
    }
});

const TeeSchema = new Schema({
    colour: {
        type: String,
        enum: TEE_COLOURS.map(({ colour }) => colour)
    },
    ratings: {
        course: {
            full: Number,
            front: Number,
            back: Number,
        },
        bogey: Number,
        slope: {
            full: {
                type: Number,
                min: 55,
                max: 155
            },
            front: {
                type: Number,
                min: 55,
                max: 155
            },
            back: {
                type: Number,
                min: 55,
                max: 155
            }
        }   
    },
    measure: {
        type: String,
        enum: [ 'yards' ]
    },
    holes: [ HoleSchema ]
});

const CourseSchema = new Schema({
    created: {
        date: {
            type: Date,
            default: Date.now(),
            required: true
        },
        by: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comments: String
    },
    name: String,
    geometry: {
        type: {
            type: String,
            enum: [ 'Point' ]
        },
        coordinates: {
            type: [ Number ]
        }
    },
    tees: [ TeeSchema ]
});

module.exports = mongoose.model('Course', CourseSchema);