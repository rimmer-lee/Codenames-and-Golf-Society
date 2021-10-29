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
    const roundDates = [ ...new Set(rounds.map(({ formattedDate }) => formattedDate.friendly)) ];
    
    // player.demerits = demeritDates.map(date => {
    //     const demeritsForDate = demerits.filter(({ when }) => when.formattedDate.friendly === date);
    //     return {
    //         date,
    //         demerits: demeritsForDate.reduce((accumulate, { action }) => accumulate + action.demerits, 0),
    //         titles: demeritsForDate.map(({ action }) => [ ...action.titles ]).map(title => ({ method: title.method, name: title.name }))
    //     };
    // });

    // // .titles.map(title => ({ method: title.method, name: title.name }))
    // for (const demerit of player.demerits) {
    //     for (const title of demerit.titles) console.log(title)
    // }

    player.drinks = drinkDates.map(date => {
        const drinksForDate = drinks.filter(({ when }) => when.formattedDate.friendly === date);
        return {
            date,
            drinks: drinksForDate.reduce((accumulate, { value }) => accumulate + value, 0)
        };
    }),
    // player.rounds = roundDates.map(date => {
    //     const roundsForDate = rounds.filter(({ formattedDate }) => formattedDate.friendly === date);
    //     return {
    //         date,
    //         players: users.map(({ _id }) => {
    //             const player = String(_id);
    //             const drinks = drinksForDate.filter(drink => String(drink.player._id) === player).reduce((accumulate, { value }) => accumulate + value, 0)
    //             return { player, drinks };
    //         })
    //     };
    // })

    res.render('players/view', { player, rounds });
}; 

module.exports = { show, view };