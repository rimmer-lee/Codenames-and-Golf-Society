const Country = require('../models/country');
const Course = require('../models/course');
const Region = require('../models/region');
const User = require('../models/user');

const { createCourse } = require('../utilities/courseFunctions');
const { searchCourses, removeRAndAId } = require('../utilities/externalApis');

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
            const existingCourse = await Course.findOne({ randa: id });
            if (existingCourse) {
                message = 'Course already exists.';
                data = existingCourse;
            } else {
                const courseData = await createCourse(id);
                const by = marker ? await User.findById(marker) : await User.findOne({ username: 'machine' });
                const created = { by };
                const newCourse = await new Course({ ...courseData, created, updated: [ created ] }).save();
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
            data = await Region.findByCountry(country);
            if (data.length === 0) message = 'No regions retrieved.';
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
                            const { City: city, Country: code, CourseID: id, CourseName, FacilityName, State } = chunk;
                            const C = await Country.findOne({ code });
                            const R = await Region.findOne({ code: State });
                            return {
                                id,
                                city,
                                name: (function() {
                                    const name = removeRAndAId(FacilityName);
                                    if (CourseName === name) return name;
                                    return `${name} - ${CourseName}`;
                                })(),
                                country: C.name,
                                region: { code: R.code, name: R.name }
                            };
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

// https://offcourse.co/courses/scorecard/windmill-hill-golf-centre/

// https://golftraxx.com/view_scorecard.php?course_name=Windmill+Hill+Golf+Centre&zipcode=MK3%207RB&static=true