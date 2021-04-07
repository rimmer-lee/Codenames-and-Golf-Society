const Charter = require('../models/charter');
const Demerit = require('../models/demerit');
const Drink = require('../models/drink');
const Rule = require('../models/rule');
const Title = require('../models/title');
const User = require('../models/user');

const formatDate = require('../utilities/formatDate');

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
        players: users.map(user => ({ name: user.name.knownAs, titles: [] })),
        demerits: demeritDates.map(demeritDate => {
            const demeritsForDate = demerits.filter(({ formattedDate }) => formattedDate.friendly === demeritDate);
            return {
                date: demeritDate,
                players: users.map(user => {
                    const player = user.name.knownAs;
                    const demerits = demeritsForDate.filter(demerit => demerit.player.name.knownAs === player).reduce((accumulate, demerit) => accumulate + demerit.value, 0)
                    return { player, demerits };
                })
            };
        }),
        drinks: drinkDates.map(drinkDate => {
            const drinksForDate = drinks.filter(({ formattedDate }) => formattedDate.friendly === drinkDate);
            return {
                date: drinkDate,
                players: users.map(user => {
                    const player = user.name.knownAs;
                    const drinks = drinksForDate.filter(drink => drink.player.name.knownAs === player).reduce((accumulate, drink) => accumulate + drink.value, 0)
                    return { player, drinks };
                })
            };
        }),
    };
    for (const title of titles) {
        const t = await Title.findOne({ name: title }).sort({ date: -1 }).populate('holder');
        data.players.find(({ name }) => t.holder.name.knownAs === name).titles.push(title);
    };
    for (const player of data.players) {
        player.demerits = demerits.filter(demerit => demerit.player.name.knownAs === player.name).reduce((accumulate, drink) => accumulate + drink.value, 0);
        player.bought = drinks.filter(drink => drink.player.name.knownAs === player.name).reduce((accumulate, drink) => accumulate + drink.value, 0);
        player.owed = Math.floor(player.demerits / 5);
        player.balance = player.owed - player.bought
        if (player.demerits >= 20) player.bbq = true;
        else player.bbq = false;
    };
    res.render('demerits/index', { years, data } );
};

async function save (req, res) {
    const { demerit } = req.body;
    demerit.player = await User.findOne({ 'name.knownAs': demerit.player });
    demerit.rule = await Rule.findOne({ index: demerit.rule });
    await new Demerit(demerit).save();
    res.redirect('/demerits');
};

async function update (req, res) {
    
};

async function create (req, res) {
    const date = formatDate('yyyy-mm-dd');
    const users = await User.find().sort({ 'name.knownAs': 1 });
    const charter = await Charter.findOne().sort({ 'lastModified.date': -1 }).populate('sections.rules');
    const rules = charter.sections.find(section => section.title === 'Rules on the Course').rules;
    const players = users.map(user => user.name.knownAs);
    res.render('demerits/new', { date, players, rules });
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
    const players = users.map(user => user.name.knownAs);
    const charter = await Charter.findOne().sort({ 'lastModified.date': -1 }).populate('sections.rules');
    const rules = charter.sections.find(section => section.title === 'Rules on the Course').rules;
    if (!p) return res.render('demerits/edit', { data: demerits, players, rules });
    const data = demerits.filter(({ player }) => player.name.knownAs === p);
    res.render('demerits/edit', { data, players, rules });
};

module.exports = { create, edit, save, show, update };