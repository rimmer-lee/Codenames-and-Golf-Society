const express = require('express');
const router = express.Router();

const accounts = require('../controllers/accounts');
const { isLoggedIn } = require('../middleware');
const catchAsync = require('../utilities/catchAsync');

router.route('/')
    .get(isLoggedIn, catchAsync(accounts.show))
    .put(isLoggedIn, catchAsync(accounts.update))
    .delete(isLoggedIn, catchAsync(accounts.remove));

router.get('/check-values', catchAsync(accounts.checkValues))

router.route('/change-password')
    .get(isLoggedIn, (req, res) => res.render('account/password'))
    .post(isLoggedIn, catchAsync(accounts.updatePassword));

module.exports = router;