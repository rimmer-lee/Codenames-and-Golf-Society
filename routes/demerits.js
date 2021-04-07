const express = require('express');
const router = express.Router();

const demerits = require('../controllers/demerits');

router.route('/')
    .get(demerits.show)
    .post(demerits.save)
    .put(demerits.update)

router.get('/new', demerits.create);

router.get('/edit', demerits.edit);

module.exports = router;