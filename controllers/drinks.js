const Drink = require('../models/drink');
const User = require('../models/user');

const { customDate } = require('../utilities/formatDate');

async function create (req, res) {
    const date = customDate('yyyy-mm-dd');
    const users = await User.find({ 'role': { $ne: 'super' } }).sort({ 'name.friendly': 1 });
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
    const drinks = await Drink.find({ 'when.date': { $gte: startDate, $lte: endDate } }).populate('player');
    const users = await User.find({ 'role': { $ne: 'super' } });
    const players = users.map(user => ({ name: user.name.knownAs, id: String(user._id) }));
    if (!p) return res.render('demerits/drinks/edit', { data: drinks, players });
    const data = drinks.filter(({ player }) => String(player._id) === p);
    res.render('demerits/drinks/edit', { data, players });
};

async function save (req, res) {
    const { drink } = req.body;
    if (drink) {
        await Promise.all(drink.map(async d => await new Drink(d).save()));
        req.flash('success', `Drink${drink.length > 1 ? 's' : ''} saved`);
    } else req.flash('info', 'No changes made');
    res.redirect('/demerits');
};

async function update (req, res) {
    const { drink } = req.body;
    if (drink) {
        for (const id of Object.keys(drink)) {
            const submittedDrink = drink[id];
            if (/Restore/.test(submittedDrink.operation)) await Drink.findByIdAndDelete(id);
            else if (/Remove/.test(submittedDrink.operation)) {
                const existingDrink = await Drink.findById(id);
                existingDrink.player = await User.findById(submittedDrink.player);
                existingDrink.when.date = submittedDrink.when.date;
                existingDrink.value = submittedDrink.value;
                await existingDrink.save();
            };
        };
        req.flash('success', 'Drinks updated');
    } else req.flash('error', 'Something went wrong');
    res.redirect('/demerits')
};

module.exports = { create, edit, save, update };