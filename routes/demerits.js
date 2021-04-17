const express = require('express');
const router = express.Router();

const catchAsync = require('../utilities/catchAsync');
const demerits = require('../controllers/demerits');

router.route('/')
    .get(catchAsync(demerits.show))
    .post(catchAsync(demerits.save))
    .put(catchAsync(demerits.update));

router.get('/new', catchAsync(demerits.create));

router.get('/edit', catchAsync(demerits.edit));

module.exports = router;