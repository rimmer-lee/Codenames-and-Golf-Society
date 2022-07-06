const Course = require('../models/course');
const Region = require('../models/region');
const Round = require('../models/round');
const User = require('../models/user');

const { COUNTRY_CODES } = require('../constants');

const { createCourse, findRegions, searchCourses } = require('../utilities/externalApis');

async function create (req, res) {
    res.send('here')
};

async function find (req, res) {
    const { city, country, id, marker, name, region } = req.query;
    let message = '';
    let success = false;
    let data = {};
    let response;
    if (id) {
        try {
            const existingCourse = await Course.findOne({ 'randa': data.randa });
            if (existingCourse) {
                message = 'Course already exists.';
                data = existingCourse;
            } else {
                const courseData = await createCourse(id);
                const by = marker ? await User.findById(marker) : await User.findOne({ 'username': 'machine' });
                const createdObject = { by };
                courseData.created = createdObject;
                courseData.updated = [ createdObject ];
                const newCourse = await new Course(courseData).save();
                if (newCourse) {
                    const { facility, id: courseId, name, randa, tees } = newCourse;
                    data = { facility, id: courseId, name, randa, tees };
                    message = 'Successfully retrieved course.';
                    success = true;
                } else message = 'Unable to retrieve course.';
            };
        } catch (error) {
            data = undefined;
            message = 'Unable to retrieve course.';
            success = false;
            console.error(error);
        };
    } else {
        if (country && !region && !city && !name) {
            data = await findRegions(country);
            if (!data) message = 'Unable to retrieve regions.';
            else if (data.length === 0) message = 'No regions retrieved.';
            else {
                success = true;
                message = 'Successfully retrieved regions.';
            };
        } else if (name || (country && region && city)) {
            const courses = await Course.find();
            data = await searchCourses({ city, country, name, region });
            try {
                data = await Promise.all(
                    JSON.parse(data)
                        .filter(({ CourseID }) => !courses.some(({ randa }) => randa === CourseID))
                        .map(async chunk => {
                            const { CourseID: id, CourseName, City: city, Country, FacilityName } = chunk;
                            let country = '';
                            let name = FacilityName.split(' (')[0];
                            let regions = [];
                            let region = '';
                            if (Country) {
                                country = COUNTRY_CODES.find(country => country['alpha-3'] === Country);
                                if (country) {
                                    country = country.name
                                    regions = await Region.find({ country });
                                    if (!regions || regions.length === 0) regions = await findRegions(country);
                                } else country = undefined;
                            };
                            if (regions) {
                                region = regions.find(({ code }) => code === chunk.State);
                                if (region) {
                                    const { code, name } = region;
                                    region = { code, name };
                                } else region = undefined;
                            };
                            if (CourseName !== name) name += ` - ${CourseName}`;
                            return { id, city, name, country, region };
                        })
                    );
            } catch (error) {
                data = undefined;
                console.log(error);
            };
            if (!data) message = 'Unable to retrieve courses.';
            else if (data.length === 0) message = 'No courses retrieved.';
            else {
                success = true;
                message = 'Successfully retrieved courses.';
            };
        };
    };
    response = { data, message, success };
    res.json(response);
};

async function save (req, res) {
    res.send(req.body)
};

async function show (req, res) {
    const allCourses = await Course.find({}, '_id name tees');
    const courses = allCourses.sortAlphabetically('name');
    res.render('courses/index', { courses });
};

async function update (req, res) {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        const rounds = await Round.find({ 'course': id });
        for (const tee of course.tees) {
            const { colour, hole } = req.body[tee.id];
            const { distance, par, strokeIndex } = hole;
            tee.colour = colour;
            for (const hole of tee.holes) {
                const index = hole.index - 1;
                hole.distance = distance[index];
                hole.par = par[index];
                hole.strokeIndex = strokeIndex[index];
            };
        };
        await course.save();
        for (const round of rounds) await round.save();
    } catch (error) {
        console.log(error);
        req.flash('error', 'Course not updated');
    };
    req.flash('success', 'Course updated');
    res.redirect(`/rounds/courses/${id}`);
};

async function view (req, res) {
    try {
        const course = await Course.findById(req.params.id, 'id name tees');
        return res.render('courses/edit', { course });
    } catch (error) {
        console.log(error);
        req.flash('error', 'Course not found');
        return res.redirect('/rounds/courses');
    };
};

module.exports = { create, find, save, show, update, view };

// scorecard and map options

// https://www.mscorecard.com/mscorecard/showcourse.php?cid=1145444320154

// https://offcourse.co/courses/scorecard/windmill-hill-golf-centre/

// https://courses.swingu.com/courses/United-Kingdom/England/Milton-Keynes/Windmill-Hill-Golf-Centre/34866
// https://courses.swingu.com/api/swingbyswing/-/v1/courses?name=windmill+hill&to=30&from=0
// https://courses.swingu.com/api/swingbyswing/-/v1/courses?city=windmill+hill&to=30&from=0
// `https://courses.swingu.com/courses/${country}/%{stateOrProvince)}/%{city}/%{name}/%{courseId}`.replace(/\s/g, '-')

// https://golftraxx.com/view_scorecard.php?course_name=Windmill+Hill+Golf+Centre&zipcode=MK3%207RB&static=true