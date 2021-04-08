const express = require('express');
const router = express.Router();

const drinks = require('../controllers/drinks');

router.route('/')
    .post(drinks.save)
    .put(drinks.update);

router.get('/new', drinks.create);

router.get('/edit', drinks.edit);

module.exports = router;