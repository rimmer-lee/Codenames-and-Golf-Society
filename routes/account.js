const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
    const users = await User.find().sort({ 'name.knownAs': 1 })
    res.render('account/index', { users });
});

router.post('/', (req, res) => {

});

router.get('/:id/edit', (req, res) => {
    
});

router.get('/:id', (req, res) => {
    
});

router.put('/:id', (req, res) => {
    
});

router.delete('/:id', (req, res) => {
    
});

module.exports = router;