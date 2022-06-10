const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Region = require('../models/region');

const { COUNTRY_CODES, TEE_COLOURS } = require('../constants');

const { searchCourse, searchCourses } = require('../utilities/externalApis');

// is this necessary?
require('../utilities/capitalize');

const options = { toJSON: { virtuals: true } };

const changeObject = {
    date: {
        type: Date,
        default: Date.now(),
        required: true,
        immutable: true
    },
    by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true
    },
    comments: {
        type: String,
        immutable: true
    }
};

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
    name: String,
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
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
    distance: {
        full: Number,
        front: Number,
        back: Number
    },
    par: {
        full: Number,
        front: Number,
        back: Number
    },
    measure: {
        full: {
            type: String,
            enum: [ 'yards', 'metres' ],
            default: 'yards'
        }
    },
    holes: [ HoleSchema ]
}, options);

const CourseSchema = new Schema({
    created: changeObject,
    updated: [ changeObject ],
    randa: Number,
    name: String,
    facility: String,
    geometry: {
        type: {
            type: String,
            enum: [ 'Point' ]
        },
        coordinates: {
            type: [ Number ]
        }
    },
    address: {
        firstLine: String,
        city: String,
        region: {
            type: Schema.Types.ObjectId,
            ref: 'Region'
        },
        country: {
            type: String,
            enum: COUNTRY_CODES.map(({ name }) => name)
        },
        postcode: String
    },
    tees: [ TeeSchema ],
    scorecardUrl: {
        domain: String,
        path: String
    }
});

CourseSchema.pre('validate', function(next) {
    for (const tee of this.tees) {
        const { gender } = tee;
        if (gender) tee.gender = gender.capitalize();
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
    const { name, randa } = this;
    if (randa) {
        const coursesData = await searchCourses({ name });
        const courseData = await searchCourse(randa);
        const courses = JSON.parse(coursesData).find(({ CourseID }) => CourseID === randa);
        const course = JSON.parse(courseData)[0];
        if (courses) {
            const { Address1: firstLine, City: city, Country, FacilityName, State: code, Zip: postcode } = courses;
            const region = await Region.findOne({ code });
            this.address = {
                firstLine,
                city,
                region,
                country: (COUNTRY_CODES.find(country => country['alpha-3'] === Country) || {}).name,
                postcode
            };
            this.facility = FacilityName.split(' (')[0];
        };
        if (course) {
            for (const tee of this.tees) {
                const { gender, name } = tee;
                const courseTee = course.TeeRows.find(({ TeeName, Gender }) => {
                    return TeeName === name && (gender ? Gender === gender : true)
                });
                const { Back, BogeyRating, CourseRating, Front, Gender, Par, SlopeRating } = courseTee;
                const [ courseFront, slopeFront ] = Front.split(' / ');
                const [ courseBack, slopeBack ] = Back.split(' / ');
                tee.gender = Gender;
                // tee.par = { full: +Par };
                tee.ratings = {
                    course: {
                        full: Number.parseFloat(CourseRating).toFixed(1),
                        front: Number.parseFloat(courseFront).toFixed(1),
                        back: Number.parseFloat(courseBack).toFixed(1)
                    },
                    bogey: Number.parseFloat(BogeyRating).toFixed(1),
                    slope: {
                        full: +SlopeRating,
                        front: +slopeFront,
                        back: +slopeBack
                    }
                };
            };
        };
    };
    for (const tee of this.tees) {
        const teeColour = TEE_COLOURS.find(({ colour }) => colour === tee.name.split(' ')[0].toLowerCase());
        tee.measure.full = 'yards';
        tee.distance.front = 0;
        tee.distance.back = 0;
        tee.par.front = 0;
        tee.par.back = 0;
        if (teeColour && !tee.colour) tee.colour = teeColour.colour;
        for (const hole of tee.holes) {
            const { distance, index, par } = hole;
            if (index < 10) {
                if (distance) tee.distance.front += distance;
                if (par) tee.par.front += par;
                continue;
            };
            if (distance) tee.distance.back += distance;
            if (par) tee.par.back += par;
        };
        tee.distance.full = tee.distance.front + tee.distance.back;
        if (!tee.par.full) tee.par.full = tee.par.front + tee.par.back;
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