const Drink = require('../models/drink');
const User = require('../models/user');

const formatDate = require('../utilities/formatDate');

async function create (req, res) {
    const date = formatDate('yyyy-mm-dd');
    const users = await User.find().sort({ 'name.knownAs': 1 });
    const players = users.map(user => ({ name: user.name.knownAs, id: String(user._id) }));
    res.render('demerits/drinks/new', { date, players });
};

async function edit (req, res) {
    const { d, p } = req.query;
    if (!d) return res.redirect('/demerits');
    const dateParts = d.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (dateParts.length < 4) return res.redirect('/demerits');
    const startDate = new Date(dateParts[3], dateParts[2] - 1, dateParts[1]).setHours(0, 0, 0, 0);
    const endDate = new Date(dateParts[3], dateParts[2] - 1, dateParts[1]).setHours(23, 59, 59, 999);
    const drinks = await Drink.find({ date: { $gte: startDate, $lte: endDate } }).populate('player');
    const users = await User.find();
    const players = users.map(user => ({ name: user.name.knownAs, id: String(user._id) }));
    if (!p) return res.render('demerits/drinks/edit', { data: drinks, players });
    const data = drinks.filter(({ player }) => String(player._id) === p);
    res.render('demerits/drinks/edit', { data, players });
};

async function save (req, res) {
    const { drink } = req.body;
    if (!drink) req.flash('error', 'Something went wrong');
    else {
        drink.player = await User.findById(drink.player);
        await new Drink(drink).save();
        req.flash('success', 'Drink saved');
    };
    res.redirect('/demerits');
};

async function update (req, res) {
    const { drink } = req.body;
    if (!drink) {
        req.flash('error', 'Something went wrong');
        return res.redirect('/demerits');
    };
    for (const id of Object.keys(drink)) {
        const d = drink[id];
        if (/Restore/.test(d.operation)) await Drink.findByIdAndDelete(id);
        else if (/Remove/.test(d.operation)) {
            const D = await Drink.findById(id);
            D.player = await User.findById(d.player);
            D.date = d.date
            D.value = d.value;
            await D.save();
        };
    };
    req.flash('success', 'Drinks updated');
    res.redirect('/demerits')
};

module.exports = { create, edit, save, update };