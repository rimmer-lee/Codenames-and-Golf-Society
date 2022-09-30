const Region = require('../models/region');

const { TEE_COLOURS } = require('../constants');

const { createScorecard, searchCourse, searchCourses, removeRAndAId, testMatch } = require('./externalApis.js');

function courseNames(gender, name, tees) {
    const multiple = gender && tees.filter(tee => tee.name === name).length > 1;
    return {
        long: `${name}${multiple ? ` (${gender.capitalize()})` : ''}`,
        short: `${name.split((function(value) {
            if (/\s/.test(value)) return ' ';
            if (/\//.test(value)) return '/';
            return;
        })(name)).map(value => {
            if (!/\D/.test(value)) return value;
            for (const v of value) {
                if (/\w/.test(v)) return v.toUpperCase();
            };
        }).join('')}${multiple ? ` (${gender[0].toUpperCase()})` : ''}`,
        value: `${name.toLowerCase()}${multiple ? `-${gender.toLowerCase()}` : ''}`
    };
};

async function createCourse(id) {
    const course = await searchCourse(id);
    if (!course) return false;
    const { CourseName: name, TeeRows } = JSON.parse(course)[0];
    const coursesData = await searchCourses({ name });
    const courseData = JSON.parse(coursesData).find(({ CourseID }) => CourseID == id);
    const { Address1: firstLine, City: city, FacilityName, State: code, Zip: postcode } = courseData;
    const region = await Region.findOne({ code });
    const address = { city, firstLine, postcode, region };
    const facility = removeRAndAId(FacilityName);
    const scorecard = await createScorecard({ ...courseData, FacilityName: facility });
    const { url: scorecardUrl, tees: scorecardTees } = scorecard;
    const tees = TeeRows.length > 0 ? TeeRows.map(tee => {
        const [ courseFront, slopeFront ] = tee.Front.split(' / ');
        const [ courseBack, slopeBack ] = tee.Back.split(' / ');
        const { CourseRating, TeeName: name, Gender: gender, Par, SlopeRating } = tee;
        const colour = findTeeColour({ colour: '', name });
        const scorecardTee = scorecardTees.find(tee => {
            return ((testMatch(tee.name, name, 'loose') ||
                testMatch(tee.name, colour.colour, 'loose')) &&
                (testMatch(tee.gender, gender) ||
                testMatch(tee.name, gender, 'loose'))) ||
                ((+tee.ratings.course.back === +courseBack ||
                +tee.ratings.course.full === +CourseRating ||
                +tee.ratings.course.front === +courseFront) &&
                (+tee.ratings.slope.back === +slopeBack ||
                +tee.ratings.slope.full === +SlopeRating ||
                +tee.ratings.slope.front === +slopeFront));
        });
        const holes = (scorecardTee || {}).holes || [];
        return {
            colour,
            gender,
            holes,
            name,
            names: courseNames(gender, name, TeeRows.map(({ TeeName }) => TeeName)),
            par: { full: Par },
            ratings: {
                course: {
                    full: +CourseRating,
                    front: +courseFront,
                    back: +courseBack
                },
                bogey: +tee.BogeyRating,
                slope: {
                    full: +SlopeRating,
                    front: +slopeFront,
                    back: +slopeBack
                }
            }
        };
    }) : scorecardTees.map(({ gender, holes, name, ratings }) => {
        return {
            colour: findTeeColour({ colour: '', name }),
            gender,
            holes,
            name,
            names: courseNames(gender, name, scorecardTees.map(({ name }) => name)),
            par: {},
            ratings
        };
    });
    return { address, facility, randa: id, name, scorecardUrl, tees };
};

function findTeeColour(tee) {
    return TEE_COLOURS.find(({ colour }) => colour.toLowerCase() === (tee.colour && tee.colour.colour || tee.colour || '').toLowerCase()) ||
        TEE_COLOURS.find(({ colour }) => colour.toLowerCase() === tee.name.split(' ')[0].toLowerCase()) ||
        TEE_COLOURS.find(({ colour }) => colour === 'white');
};

module.exports = { courseNames, createCourse, findTeeColour };