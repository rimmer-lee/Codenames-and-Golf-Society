const Charter = require('../models/charter');
const Demerit = require('../models/demerit');
const Drink = require('../models/drink');
const Rule = require('../models/rule');
const Title = require('../models/title');
const User = require('../models/user');

const formatDate = require('../utilities/formatDate');

function convertToArray(value) {
    if (!value || Array.isArray(value)) return value;
    return [value];
};

async function create (req, res) {
    const date = formatDate('yyyy-mm-dd');
    const users = await User.find().sort({ 'name.knownAs': 1 });
    const charter = await Charter.findOne().sort({ 'lastModified.date': -1 }).populate('sections.rules');
    const rules = charter.sections.find(section => section.title === 'Rules on the Course').rules;
    const players = users.map(user => ({ name: user.name.knownAs, id: user._id }));
    res.render('demerits/new', { date, players, rules });
};

async function edit (req, res) {
    const { d, p, y } = req.query;
    if (!d && !p && !y) {
        req.flash('error', 'Something went wrong');
        return res.redirect('/demerits');
    };

    // need to check for scenarios where combinations of values are available for when there are links for player name and title

    const dateParts = d.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (dateParts.length < 4) return res.redirect('/demerits');
    const startDate = new Date(dateParts[3], dateParts[2] - 1, dateParts[1]).setHours(0, 0, 0, 0);
    const endDate = new Date(dateParts[3], dateParts[2] - 1, dateParts[1]).setHours(23, 59, 59, 999);
    const demerits = await Demerit.find({ 'when.date': { $gte: startDate, $lte: endDate } }).populate('player').populate('rule').populate('action.titles');
    const users = await User.find();
    const players = users.map(user => ({ name: user.name.knownAs, id: String(user._id) }));
    const charter = await Charter.findOne().sort({ 'lastModified.date': -1 }).populate('sections.rules');
    const rules = charter.sections.find(section => section.title === 'Rules on the Course').rules;
    if (!p) return res.render('demerits/edit', { data: demerits, players, rules });
    const data = demerits.filter(({ player }) => String(player._id) === p);
    res.render('demerits/edit', { data, players, rules });
};

async function save (req, res) {
    const { demerit } = req.body;
    demerit.player = await User.findById(demerit.player);
    demerit.rule = await Rule.findById(demerit.rule);
    if (demerit.action && demerit.action.titles) {
        // demerit.action.titles = convertToArray(demerit.action.titles);
        demerit.action.titles = await Promise.all(
            convertToArray(demerit.action.titles).map(async title => {
                return await new Title({ name: title, holder: demerit.player, when: demerit.when }).save()
            }));
    };
    // approved by default for now
    demerit.status = 'Approved';
    // created by Lee by default for now
    demerit.history = [{ status: 'Created', updated: { by: await User.findOne({ 'name.knownAs' : 'Lee' }), date: Date.now() } }];
    await new Demerit(demerit).save();
    req.flash('success', 'Demerit saved');
    res.redirect('/demerits');
};

async function show (req, res) {

    // make editable based on dropdown or replicate with AJAX
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear, 11, 31);
    
    // const allDemerits = await Demerit.find().sort({ date: 1 });
    // const years = [ ...new Set(allDemerits.map(({ when }) => when.date.getFullYear())) ];
    const years = [2021]

    const users = await User.find().sort({ 'name.knownAs': 1 });
    const demerits = await Demerit.find({ 'when.date': { $gte: startDate, $lte: endDate } }).sort({ 'when.date': 1 }).populate('player');
    const drinks = await Drink.find({ date: { $gte: startDate, $lte: endDate } }).sort({ date: 1 }).populate('player');

    // const allTitles = await Title.find({ date: { $gte: startDate, $lte: endDate } });    
    // const titles = [ ...new Set(allTitles.map(({ name }) => name)) ];
    const titles = ['Karen', 'Ace', 'flag bitch']

    const demeritDates = [ ...new Set(demerits.map(({ when }) => when.formattedDate.friendly)) ];
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
            const demeritsForDate = demerits.filter(({ when }) => when.formattedDate.friendly === demeritDate);
            return {
                date: demeritDate,
                players: users.map(({ _id }) => {
                    const player = String(_id);
                    const demerits = demeritsForDate.filter(demerit => String(demerit.player._id) === player).reduce((accumulate, { action }) => accumulate + action.demerits, 0);
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
                    const drinks = drinksForDate.filter(drink => String(drink.player._id) === player).reduce((accumulate, { value }) => accumulate + value, 0)
                    return { player, drinks };
                })
            };
        }),
    };

    // need some global variables for 5 (5 demerits ===  drink) and 20 (20 demerits === BBQ)
    for (const player of data.players) {
        player.demerits = demerits.filter(demerit => String(demerit.player._id) === player.id).reduce((accumulate, { action }) => accumulate + action.demerits, 0);
        if (player.demerits < 0) player.demerits = 0;
        player.bought = drinks.filter(drink => String(drink.player._id) === player.id).reduce((accumulate, drink) => accumulate + drink.value, 0);
        player.owed = Math.floor(player.demerits / 5);
        player.balance = player.owed - player.bought
        if (player.demerits >= 20) player.bbq = true;
    };
    for (const title of titles) {
        const T = await Title.findOne({ name: title }).sort({ 'when.date': -1, 'when.hole': -1 }).populate('holder');
        if (!T) continue;
        const holder = data.players.find(({ id }) => String(T.holder._id) === id);
        if (holder) holder.titles.push(title);
    };
    res.render('demerits/index', { years, data } );
};

async function update (req, res) {
    const { demerit } = req.body;
    if (!demerit) {
        req.flash('error', 'Something went wrong');
        return res.redirect('/demerits');
    };
    for (const id of Object.keys(demerit)) {
        const d = demerit[id];
        const D = await Demerit.findById(id).populate('action.titles');
        d.action.titles = convertToArray(d.action.titles);
        if (/Restore/.test(d.operation)) {
            // corresponding titles should be deleted by demerit.post middleware
            for (const title of D.action.titles) await Title.findByIdAndDelete(title);
            await Demerit.findByIdAndDelete(id);
        } else if (/Remove/.test(d.operation)) {
            D.rule = await Rule.findById(d.rule);
            D.player = await User.findById(d.player);
            D.when = d.when;
            D.comments = d.comments;
            D.action.demerits = d.action.demerits;
            // approved and update by Lee by default for now
            D.history.push({ status: 'Approved', updated: { by: await User.findOne({ 'name.knownAs' : 'Lee' }), date: Date.now() } });
            if (d.action && d.action.titles) {
                if (D.action && D.action.titles) {
                    for (const title of D.action.titles) {
                        if (d.action.titles.some(t => t === title.name)) {
                            const T = await Title.findById(title._id);
                            T.when = d.when;
                            T.holder = D.player;
                            await T.save();
                        } else await Title.findByIdAndDelete(title._id);
                    };
                };
                for (const title of d.action.titles) {
                    if (!D.action.titles.some(T => T.name === title)) {
                        const T = await new Title({ when: d.when, holder: D.player, name: title }).save();
                        if (D.action.titles) D.action.titles.push(T);
                        else D.action.titles = [T];
                    };
                };
            };            
            await D.save();
        };
    };
    req.flash('success', 'Demerits updated');
    res.redirect('/demerits');
};

module.exports = { create, edit, save, show, update };