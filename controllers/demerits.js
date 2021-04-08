const Charter = require('../models/charter');
const Demerit = require('../models/demerit');
const Drink = require('../models/drink');
const Rule = require('../models/rule');
const Title = require('../models/title');
const User = require('../models/user');

const formatDate = require('../utilities/formatDate');

async function create (req, res) {
    const date = formatDate('yyyy-mm-dd');
    const users = await User.find().sort({ 'name.knownAs': 1 });
    const charter = await Charter.findOne().sort({ 'lastModified.date': -1 }).populate('sections.rules');
    const rules = charter.sections.find(section => section.title === 'Rules on the Course').rules;
    const players = users.map(user => ({ name: user.name.knownAs, id: user._id }));
    res.render('demerits/new', { date, players, rules });
};

async function save (req, res) {
    const { demerit } = req.body;
    demerit.player = await User.findById(demerit.player);
    demerit.rule = await Rule.findById(demerit.rule);
    await new Demerit(demerit).save();
    res.redirect('/demerits');
};

async function show (req, res) {
    // make editable based on dropdown or replicate with AJAX
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear, 11, 31);

    const allDemerits = await Demerit.find().sort({ date: 1 });
    const years = [ ...new Set(allDemerits.map(({ date }) => date.getFullYear())) ];
    const users = await User.find().sort({ 'name.knownAs': 1 });
    const demerits = await Demerit.find({ date: { $gte: startDate, $lte: endDate } }).sort({ date: 1 }).populate('player');
    const drinks = await Drink.find({ date: { $gte: startDate, $lte: endDate } }).sort({ date: 1 }).populate('player');
    const allTitles = await Title.find({ date: { $gte: startDate, $lte: endDate } });
    const titles = [ ...new Set(allTitles.map(({ name }) => name)) ];
    const demeritDates = [ ...new Set(demerits.map(({ formattedDate }) => formattedDate.friendly)) ];
    const drinkDates = [ ...new Set(drinks.map(({ formattedDate }) => formattedDate.friendly)) ];
    const data = {
        players: users.map(user => {
            return {
                id: String(user._id),
                name: user.name,
                titles: [],
                bbq: false
            };
        }),
        demerits: demeritDates.map(demeritDate => {
            const demeritsForDate = demerits.filter(({ formattedDate }) => formattedDate.friendly === demeritDate);
            return {
                date: demeritDate,
                players: users.map(({ _id }) => {
                    const player = String(_id);
                    const demerits = demeritsForDate.filter(demerit => String(demerit.player._id) === player).reduce((accumulate, demerit) => accumulate + demerit.value, 0)
                    return { player, demerits };
                })
            };
        }),
        drinks: drinkDates.map(drinkDate => {
            const drinksForDate = drinks.filter(({ formattedDate }) => formattedDate.friendly === drinkDate);
            return {
                date: drinkDate,
                players: users.map(({ _id }) => {
                    const player = String(_id);
                    const drinks = drinksForDate.filter(drink => String(drink.player._id) === player).reduce((accumulate, drink) => accumulate + drink.value, 0)
                    return { player, drinks };
                })
            };
        }),
    };    
    for (const player of data.players) {
        player.demerits = demerits.filter(demerit => String(demerit.player._id) === player.id).reduce((accumulate, drink) => accumulate + drink.value, 0);
        player.bought = drinks.filter(drink => String(drink.player._id) === player.id).reduce((accumulate, drink) => accumulate + drink.value, 0);
        player.owed = Math.floor(player.demerits / 5);
        player.balance = player.owed - player.bought
        if (player.demerits >= 20) player.bbq = true;
    };
    for (const title of titles) {
        const T = await Title.findOne({ name: title }).sort({ date: -1 }).populate('holder');
        const holder = data.players.find(({ id }) => String(T.holder._id) === id);
        if (holder) holder.titles.push(title);
    };
    res.render('demerits/index', { years, data } );
};

async function update (req, res) {
    const { demerit } = req.body;
    for (const id of Object.keys(demerit)) {
        const d = demerit[id];
        if (/Restore/.test(d.status)) await Demerit.findByIdAndDelete(id);
        else if (/Remove/.test(d.status)) {
            const D = await Demerit.findById(id);
            const dateParts = d.date.match(/(\d{4})-(\d{2})-(\d{2})/);
            D.rule = await Rule.findById(d.rule);
            D.player = await User.findById(d.player);
            D.date = new Date(dateParts[1], dateParts[2] - 1, dateParts[3]);
            D.value = d.value;
            await D.save();
        };
    };
    res.redirect('/demerits');
};

async function edit (req, res) {
    const { d, p } = req.query;
    if (!d) return res.redirect('/demerits');
    const dateParts = d.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (dateParts.length < 4) return res.redirect('/demerits');
    const startDate = new Date(dateParts[3], dateParts[2] - 1, dateParts[1]).setHours(0, 0, 0, 0);
    const endDate = new Date(dateParts[3], dateParts[2] - 1, dateParts[1]).setHours(23, 59, 59, 999);
    const demerits = await Demerit.find({ date: { $gte: startDate, $lte: endDate } }).populate('player').populate('rule');
    const users = await User.find();
    const players = users.map(user => ({ name: user.name.knownAs, id: String(user._id) }));
    const charter = await Charter.findOne().sort({ 'lastModified.date': -1 }).populate('sections.rules');
    const rules = charter.sections.find(section => section.title === 'Rules on the Course').rules;
    if (!p) return res.render('demerits/edit', { data: demerits, players, rules });
    const data = demerits.filter(({ player }) => String(player._id) === p);
    res.render('demerits/edit', { data, players, rules });
};

module.exports = { create, edit, save, show, update };