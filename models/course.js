const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { BREAKDOWN_OBJECT, GENDERS } = require('../constants');

const { findTeeColour } = require('../utilities/courseFunctions');

const options = { toJSON: { virtuals: true } };

const changeObject = {
    by: {
        immutable: true,
        ref: 'User',
        required: true,
        type: Schema.Types.ObjectId
    },
    comments: {
        immutable: true,
        type: String
    },
    date: {
        default: Date.now(),
        immutable: true,
        required: true,
        type: Date
    }
};

const slopeObject = {
    max: 155,
    min: 55,
    type: Number
};

const HoleSchema = new Schema({
    distance: Number,
    index: {
        max: 18,
        min: 1,
        type: Number
    },
    name: String,
    par: {
        max: 5,
        min: 3,
        type: Number
    },
    strokeIndex: {
        max: 18,
        min: 1,
        type: Number
    }
});

const TeeSchema = new Schema({
    // colour: { enum: TEE_COLOURS },
    colour: Schema.Types.Mixed,
    distance: BREAKDOWN_OBJECT,
    gender: {
        enum: GENDERS,
        type: String
    },
    holes: [ HoleSchema ],
    measure: {
        full: {
            default: 'yards',
            enum: [ 'yards', 'metres' ],
            type: String
        }
    },
    name: String,
    names: {
        long: String,
        short: String,
        value: String
    },
    par: BREAKDOWN_OBJECT,
    ratings: {
        bogey: Number,
        course: BREAKDOWN_OBJECT,
        slope: {
            back: slopeObject,
            front: slopeObject,
            full: slopeObject
        }
    }
}, options);

const CourseSchema = new Schema({
    address: {
        city: String,
        firstLine: String,
        postcode: String,
        region: {
            ref: 'Region',
            type: Schema.Types.ObjectId
        }
    },
    created: changeObject,
    facility: String,
    geometry: {
        coordinates: [ Number ],
        type: {
            default: 'Point',
            enum: [ 'Point' ],
            type: String
        }
    },
    name: String,
    randa: Number,
    scorecardUrl: {
        domain: String,
        path: String
    },
    tees: [ TeeSchema ],
    updated: [ changeObject ]
}, options);

CourseSchema.pre('validate', function(next) {
    for (const tee of this.tees) {
        const { gender } = tee;
        if (gender) tee.gender = gender.toLowerCase();
        for (hole of tee.holes) {
            const { distance, par, strokeIndex } = hole;
            if (distance < 0) hole.distance = undefined;
            if (par > 5 || par < 3) hole.par = undefined;
            if (strokeIndex > 18 || strokeIndex < 1) hole.strokeIndex = undefined;
        };
    };
    next();
});

CourseSchema.pre('save', async function(next) {
    for (const tee of this.tees) {
        tee.measure.full = tee.measure.full || 'yards';
        tee.distance.front = 0;
        tee.distance.back = 0;
        tee.par.front = 0;
        tee.par.back = 0;
        tee.colour = tee.colour || findTeeColour(tee);
        for (const hole of tee.holes) {
            const { distance = 0, index, par = 0 } = hole;
            if (index < 10) {
                tee.distance.front += distance;
                tee.par.front += par;
                continue;
            };
            tee.distance.back += distance;
            tee.par.back += par;
        };
        tee.distance.full = tee.distance.front + tee.distance.back;
        if (tee.par.front === 0 && tee.par.back === 0) continue;
        tee.par.full = tee.par.front + tee.par.back;
    };
    next();
});

CourseSchema.statics.findByRanda = async function(randa) {
    return await this.findOne({ randa });
};

CourseSchema.virtual('scorecardUrl.full').get(function() {
    const { domain, path } = this;
    return `https://${domain}${path}`;
});

TeeSchema.virtual('measure.short').get(function() {
    const { full } = this.measure;
    if (full === 'yards') return 'yd';
    if (full === 'metres') return 'm';
    return undefined;
});

module.exports = mongoose.model('Course', CourseSchema);