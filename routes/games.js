const express = require('express');
const router = express.Router();

// const games = require('../controllers/games');

// router.route('/')
//     .get((req, res) => res.render('games/index'));

// router.route('/:id')
//     .get((req, res) => res.render(`games/${req.params.id}/index`));

router.get('/', (req, res) => res.render('games/index'));

router.get('/:id', (req, res) => res.render(`games/${req.params.id}/index`));

module.exports = router;