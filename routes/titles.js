const express = require('express');
const router = express.Router();

router.route('/')
    .post('/', async (req, res) => {
        res.send('POST /')
    })
    .put('/', async (req, res) => {
        res.send('PUT /')
    });

router.get('/new', async (req, res) => {
    res.send('/demerits/titles/new')
});

router.get('/edit', async (req, res) => {
    res.send('/demerits/titles/edit')
});

module.exports = router;