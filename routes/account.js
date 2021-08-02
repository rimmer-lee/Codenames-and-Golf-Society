const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('account/index', { user });
});

router.get('/:id/edit', async (req, res) => {
    
    const formatDate = require('../utilities/formatDate');
    const date = formatDate('yyyy-mm-dd');

    const user = await User.findById(req.params.id);
    
    if (!user.image) user.image = ''
    
    // user.birthday = formatDate('yyyy-mm-dd', user.birthday);

    console.log(user)

    res.render('account/edit', { date, user });
});

router.put('/:id', (req, res) => {
    
});

router.delete('/:id', (req, res) => {
    
});

module.exports = router;