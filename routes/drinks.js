const express = require('express');
const router = express.Router();

const Drink = require('../models/drink');
const User = require('../models/user');

const formatDate = require('../utilities/formatDate');

const drinks = require('../controllers/drinks');

router.route('/')
    .post(drinks.save)
    .put(drinks.update);

router.get('/new', async (req, res) => {
    const date = formatDate('yyyy-mm-dd');
    const users = await User.find().sort({ 'name.knownAs': 1 });
    const players = users.map(user => user.name.knownAs);
    res.render('demerits/drinks/new', { date, players });
});

router.get('/edit', async (req, res) => {
    if (!d) return res.redirect('/demerits');
    const dateParts = d.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (dateParts.length < 4) return res.redirect('/demerits');
    const startDate = new Date(dateParts[3], dateParts[2] - 1, dateParts[1]).setHours(0, 0, 0, 0);
    const endDate = new Date(dateParts[3], dateParts[2] - 1, dateParts[1]).setHours(23, 59, 59, 999);
    const drinks = await Drink.find({ date: { $gte: startDate, $lte: endDate } }).populate('player');
    const users = await User.find();
    const players = users.map(user => user.name.knownAs);
    if (!p) return res.render('demerits/drinks/edit', { data: drinks, players });
    const data = demerits.filter(({ player }) => player.name.knownAs === p);
    res.render('demerits/drinks/edit', { data, players });
});

module.exports = router;