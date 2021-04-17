const express = require('express');
const router = express.Router();

const catchAsync = require('../utilities/catchAsync');
const drinks = require('../controllers/drinks');

router.route('/')
    .post(catchAsync(drinks.save))
    .put(catchAsync(drinks.update));

router.get('/new', catchAsync(drinks.create));

router.get('/edit', catchAsync(drinks.edit));

module.exports = router;