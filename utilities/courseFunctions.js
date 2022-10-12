const Region = require('../models/region');

const { TEE_COLOURS } = require('../constants');

const { createScorecard, searchCourse, searchCourses, removeRAndAId, testMatch } = require('./externalApis.js');

function calculateTeeNames(tees) {
    const refinedTees = tees.map(({ gender, name }, index) => ({ gender, index, name }));
    return refinedTees.map(({ gender, index, name }) => {
        const multipleTeeNames = refinedTees.filter(tee => tee.name === name).length > 1;
        const { longSuffix, shortSuffix } = (function() {
            if (!multipleTeeNames) return { longSuffix: '', shortSuffix: '' };
            const matchingTees = refinedTees.filter(tee => tee.name === name && tee.gender === gender);
            const teeIndex = matchingTees.length > 1 ? ` ${matchingTees.findIndex(tee => tee.index === index) + 1}` : '';
            const capitalizedGender = gender.capitalize();
            return {
                longSuffix: ` (${capitalizedGender}${teeIndex})`,
                shortSuffix: `(${capitalizedGender[0]}${teeIndex})`.replaceWhiteSpace()
            };
        })();
        const long = `${name}${longSuffix}`;
        const short = (function() {
            const splitRegex = /[\s\/]+/;
            const nameParts = name.split(splitRegex);
            if (multipleTeeNames) return `${nameParts.map(v => v[0]).join('')}${shortSuffix}`.toUpperCase();
            const maximumLength = Math.min(Math.max( ...nameParts.map(v => v.length) ), 3);
            let letters = 1;
            while (letters <= maximumLength) {
                const short = nameParts.map(v => v.slice(0, letters)).join('');
                const shortenedTeeNames = refinedTees
                    .map(({ name }) => {
                        return name
                            .split(splitRegex)
                            .map(v => v.slice(0, letters))
                            .join('');
                    });
                if (shortenedTeeNames
                    .filter(name => {
                        return name === short &&
                            shortenedTeeNames.filter(shortenedTeeName => {
                                return shortenedTeeName === name;
                            }).length === 1;
                    }).length === 1) return short;
                letters++;
            };
            return name;
        })();
        const value = long
            .replace(/[()]+/g, '')
            .replaceWhiteSpace('-')
            .toLowerCase();
        return { long, short, value };
    });
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
    const tees = TeeRows.length === 0 ? scorecardTees : TeeRows.map(tee => {
        const [ courseFront, slopeFront ] = tee.Front.split(' / ');
        const [ courseBack, slopeBack ] = tee.Back.split(' / ');
        const { CourseRating, TeeName: name, Gender: gender, Par, SlopeRating } = tee;
        const scorecardTee = scorecardTees.find(tee => {
            return (testMatch(tee.name, name, 'loose') &&
                (testMatch(tee.gender, gender) ||
                testMatch(tee.name, gender, 'loose'))) ||
                ((+tee.ratings.course.back === +courseBack ||
                +tee.ratings.course.full === +CourseRating ||
                +tee.ratings.course.front === +courseFront) &&
                (+tee.ratings.slope.back === +slopeBack ||
                +tee.ratings.slope.full === +SlopeRating ||
                +tee.ratings.slope.front === +slopeFront));
        });
        const holes = scorecardTee?.holes || [];
        return {
            gender,
            holes,
            name,
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
    });
    return { address, facility, randa: id, name, scorecardUrl, tees };
};

function findTeeColour(tee) {
    return TEE_COLOURS.find(({ colour }) => colour.toLowerCase() === (tee?.colour?.colour || tee?.colour || '').toLowerCase()) ||
        TEE_COLOURS.find(({ colour }) => colour.toLowerCase() === tee.name.split(' ')[0].toLowerCase()) ||
        TEE_COLOURS.find(({ colour }) => colour === 'white');
};

module.exports = { calculateTeeNames, createCourse, findTeeColour };