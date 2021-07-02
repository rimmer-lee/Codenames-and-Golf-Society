const express = require('express');
const router = express.Router();

const catchAsync = require('../utilities/catchAsync');
const charters = require('../controllers/charters');

router.route('/')
    .get(catchAsync(charters.show))
    .post(catchAsync(charters.save));

router.get('/edit', catchAsync(charters.edit));

module.exports = router;