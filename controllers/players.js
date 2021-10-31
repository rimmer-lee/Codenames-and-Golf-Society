const demerit = require('../models/demerit');
const Demerit = require('../models/demerit');
const Drink = require('../models/drink');
const Round = require('../models/round');
const User = require('../models/user');

async function show (req, res) {
    const demerits = await Demerit.find();
    const drinks = await Drink.find();
    const players = await User.find({ role: { $ne: 'super' }, status: 'active' });
    const rounds = await Round.find().populate('scores.player');
    for (const player of players) {
        player.rounds = rounds.filter(({ scores }) => scores.some(score => score.player.id === player.id)).length;
        player.drinks = drinks.filter(drink => String(drink.player) === player.id).length;
        player.demerits = demerits.filter(demerit => String(demerit.player) === player.id).length;
    };
    res.render('players/index', { players });
};

async function view (req, res) {    
    const { id } = req.params;
    const demerits = await Demerit.find({ 'player': id }).populate('action.titles');
    const drinks = await Drink.find({ 'player': id });
    const player = await User.findById(id);
    const rounds = await Round.find({ 'scores.player': id }).populate('scores.player').populate('course');
    const demeritDates = [ ...new Set(demerits.map(({ when }) => when.formattedDate.friendly)) ];
    const drinkDates = [ ...new Set(drinks.map(({ when }) => when.formattedDate.friendly)) ];
    player.demerits = demeritDates.map(date => {
        const demeritsForDate = demerits.filter(({ when }) => when.formattedDate.friendly === date);
        const titles = [];
        for (const demeritForDate of demeritsForDate) {
            for (const title of demeritForDate.action.titles) {
                const { method, name } = title;
                titles.push({ method, name })
            };
        };
        return {
            date,
            demerits: demeritsForDate.reduce((accumulate, { action }) => accumulate + action.demerits, 0),
            titles
        };
    });
    player.drinks = drinkDates.map(date => {
        const drinksForDate = drinks.filter(({ when }) => when.formattedDate.friendly === date);
        return {
            date,
            drinks: drinksForDate.reduce((accumulate, { value }) => accumulate + value, 0)
        };
    });
    res.render('players/view', { player, rounds });
}; 

module.exports = { show, view };