const express = require('express');
const router = express.Router();
const passport = require('passport');

const users = require('../controllers/users');
const catchAsync = require('../utilities/catchAsync');
const { isAdmin, isLoggedIn } = require('../middleware');

router.route('/login')
    .get((req, res) => res.render('account/login'))
    .post(passport.authenticate('local', { failureFlash: 'Invalid username or password', failureRedirect: '/login' }), users.login);

router.post('/logout', isLoggedIn, users.logout);

router.route('/register')
    .get(users.showRegistration)
    .post(catchAsync(users.register));

router.route('/users')
    .get(isLoggedIn, isAdmin, catchAsync(users.showUsers))
    .put(isLoggedIn, isAdmin, catchAsync(users.updateUsers));

router.post('/users/reset-password', isLoggedIn, isAdmin, catchAsync(users.reset));

module.exports = router;