const express = require('express');
const router = express.Router();

const catchAsync = require('../utilities/catchAsync');
const players = require('../controllers/players');

router.get('/', catchAsync(players.show));
router.get('/:id', catchAsync(players.view));

module.exports = router;