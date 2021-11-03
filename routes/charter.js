const express = require('express');
const router = express.Router();

const catchAsync = require('../utilities/catchAsync');
const charters = require('../controllers/charters');
const { isAdmin, isLoggedIn } = require('../middleware');

router.route('/')
    .get(catchAsync(charters.show))
    .post(isLoggedIn, isAdmin, catchAsync(charters.save));
    
router.get('/edit', isLoggedIn, isAdmin, catchAsync(charters.edit));

router.get('/new', isLoggedIn, isAdmin, charters.create);

module.exports = router;