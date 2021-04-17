const express = require('express');
const router = express.Router();

const catchAsync = require('../utilities/catchAsync');
const users = require('../controllers/users');

router.route('/')
    .get(users.show)
    .post(catchAsync(users.save))
    .put(catchAsync(users.update));

router.get('/edit/:id', catchAsync(users.edit));

router.get('/new', catchAsync(users.create));

module.exports = router;