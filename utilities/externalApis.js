const { parse } = require('node-html-parser');

const Country = require('../models/country');
const Region = require('../models/region');

const fetch = require('./fetch');

async function createScorecard(courseData) {
    const BGCOLOUR = 'bgcolor';
    const CR_SLOPE = ' cr/slope';
    const Address = courseData.Address1 || '';
    const City = courseData.City || '';
    const CourseName = courseData.CourseName || '';
    const FacilityName = courseData.FacilityName || '';
    const Zip = courseData.Zip || '';
    const domain = 'mscorecard.com';
    const emptyObject = { url: { domain: undefined, path: undefined }, tees: [] };
    try {
        const document = await (async function() {
            let names = FacilityName.split(' '), document = [];
            while (document.length === 0 && names.length > 0) {
                document = parse(
                    await fetch(
                        domain,
                        `/mscorecard/courses.php?CourseName=${names.join('+')}&Country=&SubmitButton=Search`
                    )).querySelectorAll('a.no-hover');
                names = names.slice(0, names.length - 1);
            };
            return document;
        })();
        const mscorecardCourses = await Promise.all(document.map(async element => {
            const cid = element._attrs.href.match(/\?cid=(\d+)/)[1];
            const [ facility, course ] = element.querySelectorAll('div > div > div')
                .filter(div => !['flag', 'gps'].includes(div.innerText.toLowerCase()))
                .map(value => getFirstValue(value));
            const location = getFirstValue(element.querySelector('.course-location')).replace(/(?:\r|\n|\t)/gm, '').split(', ');
            const path = `/mscorecard/showcourse.php?cid=${cid}`;
            const document = parse(
                await fetch(
                    domain,
                    path
                ));
            const name = getFirstValue(document.querySelector('h1'));
            const address = document.querySelector('#content > .page-content > .row > .col-md-4').childNodes
                .map(element => element._rawText).filter(value => value);
            const postcode = (address.join(', ').match(/(\w{1,2}\d{1,2}\s?\d{1,2}\w{1,2})/) || [])[0];
            const allRows = Array.from(document.querySelectorAll('table.scorecardtable tr'));
            const headings = allRows.find(row => {
                return row.querySelectorAll('td').find(td => getFirstValue(td) === 'Hole');
            }).querySelectorAll('td').map(td => getFirstValue(td));
            const ratingRows = allRows.slice(allRows.map(({ classList: { _set } }) => [ ..._set ].join()).lastIndexOf('total') + 1);
            const holeRows = allRows.filter(row => {
                return row.classList.contains('nonfocus') &&
                    row.querySelectorAll('td').length === headings.length;
            });
            const tees = ratingRows.map(row => {
                const tds = row.querySelectorAll('td');
                const gender = refineGender(tds[0].childNodes
                    .map(element => getRawText(element, true))
                    .flat()
                    .find(value => value.indexOf(CR_SLOPE) !== -1)
                    .split(CR_SLOPE)[0]);
                const maleTee = gender === 'men';
                const parIndex = getIndex(headings, 'Par', maleTee);
                const siIndex = getIndex(headings, 'SI', maleTee);
                return tds.map(td => {
                    const colour = td.getAttribute(BGCOLOUR);
                    const rawRatings = td.childNodes
                        .map(element => getRawText(element))
                        .flat();
                    const ratings = rawRatings.some(value => !isNaN(+value)) ? rawRatings
                        .map(value => value === '-' ? 0 : value)
                        .filter(value => !isNaN(+value)) : [];
                    const teeIndex = holeRows[0].querySelectorAll('td').map(td => {
                        return td.getAttribute(BGCOLOUR);
                    }).indexOf(colour);
                    return { ratings, teeIndex };
                }).filter(({ ratings, teeIndex }) => {
                    return ratings.length > 0 && teeIndex !== -1;
                }).map(({ ratings, teeIndex }) => {
                    return {
                        gender,
                        holes: holeRows.map((row, index) => {
                            const tds = row.querySelectorAll('td');
                            return {
                                distance: getFirstValue(tds[teeIndex]),
                                index: index + 1,
                                par: getFirstValue(tds[parIndex]),
                                strokeIndex: getFirstValue(tds[siIndex])
                            };
                        }),
                        name: headings[teeIndex],
                        ratings: {
                            course: {
                                back: ratings[4],
                                front: ratings[2],
                                full: ratings[0]
                            },
                            slope: {
                                back: ratings[5],
                                front: ratings[3],
                                full: ratings[1]
                            }
                        }
                    };
                });
            }).flat();
            return { address, course, facility, location, name, path, postcode, tees };
        }));
        const mscorecardCourse = (function() {
            const matchedCourses = mscorecardCourses.filter(({ address, facility, name, postcode, tees }) => {
                return (testMatch(postcode.replaceWhiteSpace(), Zip.replaceWhiteSpace()) ||
                address.some(a => testMatch(a, Address, 'loose')) ||
                address.some(a => testMatch(a, City, 'loose'))) &&
                ((testMatch(facility, CourseName, 'loose') ||
                testMatch(name, CourseName, 'loose') ||
                testMatch(facility, FacilityName, 'loose') ||
                testMatch(name, FacilityName, 'loose')));
            });
            if (matchedCourses.length === 1) return matchedCourses[0];
            if (matchedCourses.length > 1) {
                const matchedCoursesWithTees = matchedCourses.filter(({ tees }) => tees.length > 0);
                if (matchedCoursesWithTees.length === 1) return matchedCoursesWithTees[0];
            };
            return false;
        })();
        if (!mscorecardCourse) return emptyObject;
        const { path, tees } = mscorecardCourse;
        return { url: { domain, path }, tees };
    } catch (error) {
        console.error(error);
        return emptyObject;
    };
};

function getFirstValue(element) {
    const value = element.childNodes[0]._rawText;
    if (isNaN(+value)) return value;
    return +value;
};

function getIndex(array, value, firstIndex) {
    if (firstIndex) return array.indexOf(value);
    return array.lastIndexOf(value);
};

function getRawText(element, lower = false) {
    const { _rawText, childNodes, nodeType } = element;
    if (nodeType === 1) return childNodes.map(({ _rawText }) => lowerText(_rawText, lower));
    if (nodeType === 3) return lowerText(_rawText, lower);
    return '';
};

function lowerText(text, lower) {
    if (lower) return text.toLowerCase();
    return text;
};

function refineGender(gender) {

    // move these to constants.js
    const genderCollections = {
        female: [
            'female',
            'females',
            'ladies',
            'lady',
            'woman',
            'women'
        ],
        male: [
            'male',
            'males',
            'men',
            'mens'
        ]
    };

    for (const key of Object.keys(genderCollections)) {
        if (genderCollections[key].includes(gender)) return key;
    };
    return undefined;
};

function removeRAndAId(name) {
    return (name.match(/([^\(\)]*)\(\d+\)/) || Array.from({ length: 2 }, _ => name))[1];
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
    let { city, country, name, region } = parameters;
    let countryCode = '';
    let regionCode = '';
    city = city ? `&cityName=${encodeURIComponent(city)}` : '';
    name = name ? `&clubName=${encodeURIComponent(name)}` : '';
    if (country) {
        countryCode = await Country.findOne({ code: country });
        if (!countryCode) countryCode = await Country.findOne({ name: country });
    };
    if (countryCode) country = `&countryName=${encodeURIComponent(countryCode.code)}`;
    else country = '';
    if (region) {
        regionCode = await Region.findOne({ code: region });
        if (!regionCode) regionCode = await Region.findOne({ name: region });
    };
    if (regionCode) region = `&stateName=${encodeURIComponent(regionCode.code)}`;
    else region = '';
    return await fetch('chclookup.randa.org', `/api/RandACRS/SearchCoursesAsync?${city}${country}${name}${region}`.replace('&', ''));
};

function testMatch(a, b, type = 'exact') {
    const aToLower = a && typeof a === 'string' ? a.toLowerCase() : a;
    const bToLower = b && typeof b === 'string' ? b.toLowerCase() : b;
    switch (type) {
        case 'loose':
            return aToLower && aToLower.indexOf(bToLower) !== -1 ||
                bToLower && bToLower.indexOf(aToLower) !== -1;
        case 'exact':
        default:
            return aToLower == bToLower;
    };
};

module.exports = { createScorecard, removeRAndAId, searchCourse, searchCourses, testMatch };