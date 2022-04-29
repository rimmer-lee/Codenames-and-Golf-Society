const express = require('express');
const router = express.Router();

const catchAsync = require('../utilities/catchAsync');
const courses = require('../controllers/courses');

router.route('/')
    .get(catchAsync(courses.show))
    .post(catchAsync(courses.save));

router.route('/find').get(catchAsync(courses.find));

router.route('/add').get(courses.create);

router.route('/:id')
    .get(catchAsync(courses.view))
    .put(catchAsync(courses.update))

module.exports = router;