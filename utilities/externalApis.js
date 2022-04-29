const HTMLParser = require('node-html-parser');

const Region = require('../models/region');

const { COUNTRY_CODES, TEE_COLOURS } = require('../constants');

const fetch = require('./fetch');

async function createCourse(id) {
    const course = await searchCourse(id);
    if (!course) return false;
    const { CourseCity, CourseName: name, CourseState, TeeRows } = JSON.parse(course)[0];
    const scorecard = await createScorecard(CourseCity, name, CourseState);
    const { url: scorecardUrl, tees: scorecardTees } = scorecard;
    return { randa: id, name, scorecardUrl, tees: TeeRows.map(tee => {
        const [ courseFront, slopeFront ] = tee.Front.split(' / ');
        const [ courseBack, slopeBack ] = tee.Back.split(' / ');
        const { CourseRating, TeeName: name, Gender: gender, Par, SlopeRating } = tee;
        const colour = (TEE_COLOURS.find(({ colour }) => colour === name.split(' - ')[0].toLowerCase()) || {}).colour || '';
        const scorecardTee = scorecardTees.find(tee => {
            return testMatch(tee.name, name) ||
                ((testMatch(tee.name, colour) ||
                testMatch(tee.name, gender)) &&
                (+tee.courseRating == +CourseRating ||
                +tee.slopeRating == +SlopeRating));
        });
        const holes = (scorecardTee || {}).holes || [];
        return {
            name,
            gender,
            holes,
            colour,
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
    })};
};

async function createScorecard(city, courseName, regionCode) {
    const emptyObject = { url: { domain: undefined, path: undefined }, tees: [] };
    try {
        const region = await Region.findOne({ code: regionCode });
        if (!region) return emptyObject;
        const coursesRandaDataString = await searchCourses({ country: region.country, name: courseName, region: regionCode });
        const { Address1, CourseName, FacilityName, Zip } = JSON.parse(coursesRandaDataString)[0];

        // search for first 30 courses by default
        const coursesSwinguDataString = await fetch('courses.swingu.com', `/api/swingbyswing/-/v1/courses?name=${encodeURIComponent(courseName)}&to=30&from=0`);

        const coursesSwinguData = coursesSwinguDataString ? JSON.parse(coursesSwinguDataString) : { courses: [] };
        const foundCourseSwingu = coursesSwinguData.courses.find(course => {
            return (testMatch(course.name, FacilityName) ||
                testMatch(course.name, CourseName, 'loose')) &&
                (testMatch(course.addr1, Address1) ||
                testMatch(course.city, city) ||
                testMatch(course.stateOrProvince, region.country) ||
                testMatch(course.stateOrProvince, region.name) ||
                testMatch(course.zipCode, Zip));
        });
        if (!foundCourseSwingu) return emptyObject;
        const { city: sCity, country: sCountry, courseId, name: sName, stateOrProvince } = foundCourseSwingu;
        const domain = 'courses.swingu.com';
        const path = removeWhiteSpace('-', `/courses/${sCountry}/${stateOrProvince}/${sCity}/${sName}/${courseId}`).toLowerCase();
        return await searchScorecards(domain, path, emptyObject);
    } catch (error) {
        console.error(error);
        return emptyObject;
    };
};

async function findRegions(country) {
    try {
        const fetchedRegions = await fetch('www.randa.org', `/api/sitecore/chclookup/getcounties?contryName=${encodeURIComponent(country)}`);
        if (fetchedRegions) {
            const parsedRegions = JSON.parse(fetchedRegions);
            for (const code of Object.keys(parsedRegions)) {
                const region = await Region.find({ code });
                if (!region || region.length === 0) await new Region({ name: parsedRegions[code], code, country }).save();
            };
        };
        return await Region.find({ country });
    } catch (error) {
        console.error(error);
        return [];
    };
};

async function searchCourse(id) {
    try {
        return await fetch('chclookup.randa.org', `/api/RandACRS/GetTeeByCourseID?CourseID=${id}`);
    } catch (error) {
        console.error(error);
        return false;
    };
};

async function searchCourses(parameters) {
    const { city, country, name, region } = parameters;
    let path = '/api/RandACRS/SearchCoursesAsync?';
    if (city) path += `&cityName=${encodeURIComponent(city)}`;

    // add checks in case country and region need to be converted to respective codes
    if (country) {
        const countryCode = COUNTRY_CODES.find(({ name }) => name === country)['alpha-3'];
        path += `&countryName=${encodeURIComponent(countryCode)}`;
    };

    if (name) path += `&clubName=${encodeURIComponent(name)}`;

    if (region) path += `&stateName=${encodeURIComponent(region)}`;

    return await fetch('chclookup.randa.org', path.replace('&', ''));
};

async function searchScorecards(domain, path, defaultObject = {}) {
    try {
        const course = await fetch(domain, path);
        const teeBodies = HTMLParser.parse(course).querySelectorAll('.vertical-scorecard.visible-xs > table > tbody[style]');
        const scorecard = { url: { domain, path }, tees: [] };
        for (const teeBody of teeBodies) {
            const headingMatchArray = ((teeBody.querySelector('th[data-parent]') || {}).getAttribute('data-target') || '').match(/js\-row\-collapse\-(.*)/);
            const name = headingMatchArray[1].replace('women', 'female').replace('men', 'male');
            const teeData = teeBody.querySelectorAll('tr:first-child td');
            const slopeRating = +removeWhiteSpace('', teeData[2].innerText);
            const courseRating = +removeWhiteSpace('', teeData[3].innerText);
            const holes = teeBody.querySelectorAll('tr > td > div tr:not([style])');
            const teeObject = { courseRating, holes: [], name, slopeRating };
            for (const hole of holes) {
                const holeObject = {};
                hole.querySelectorAll('td').forEach((attribute, index) => {
                    const value = attribute.innerText.toString();
                    switch (index) {
                        case 0:
                            const indexMatchArray = value.match(/Hole\s(\d{1,2})/);
                            if (!indexMatchArray) return;
                            return holeObject.index = +indexMatchArray[1];
                        case 1:
                            return holeObject.par = +value;
                        case 2:
                            const distanceArray = value.split('/');
                            holeObject.distance = {};
                            for (const distanceValue of distanceArray) {
                                const distanceMatchArray = distanceValue.match(/(\d+)(\w+)/);
                                if (!distanceMatchArray) continue;
                                const [ , distance, measureShort ] = distanceMatchArray;
                                if (measureShort === 'yd') return holeObject.distance = +distance;
                            };
                            return holeObject.distance = 0;
                        case 3:
                            return holeObject.strokeIndex = +value;
                    };
                });
                teeObject.holes.push(holeObject);
            };
            scorecard.tees.push(teeObject);
        };
        return scorecard;
    } catch (error) {
        console.error(error);
        return defaultObject;
    };
};

function removeWhiteSpace(newValue, string) {
    return string.replace(/\s/g, newValue)
};

function testMatch(a, b, type = 'exact') {
    const aToLower = a && typeof a === 'string' ? a.toLowerCase() : a;
    const bToLower = b && typeof b === 'string' ? b.toLowerCase() : a;
    switch (type) {
        case 'loose':
            return aToLower && aToLower.indexOf(bToLower) !== -1 ||
                bToLower && bToLower.indexOf(aToLower) !== -1;
        case 'exact':
        default:
            return aToLower == bToLower;
    };
};

module.exports = { createCourse, findRegions, searchCourse, searchCourses };