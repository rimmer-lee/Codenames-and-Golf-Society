const express = require('express');
const router = express.Router();

const catchAsync = require('../utilities/catchAsync');
const rounds = require('../controllers/rounds');

router.route('/')
    .get(catchAsync(rounds.show))
    .post(catchAsync(rounds.save));

router.get('/new', catchAsync(rounds.create));

router.get('/service-worker.js', rounds.serviceWorker);

router.route('/:id')
    .get(catchAsync(rounds.view))
    .put(catchAsync(rounds.update))
    .delete(catchAsync(rounds.remove));

module.exports = router;