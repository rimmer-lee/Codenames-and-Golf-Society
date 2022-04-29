const Demerit = require('../models/demerit');
const Drink = require('../models/drink');
const Rule = require('../models/rule');
const Title = require('../models/title');
const User = require('../models/user');

const { customDate } = require('../utilities/formatDate');

const { TITLES } = require('../constants');

function convertToArray(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return [value];
};

function titleObject(value) {
    const [ , method, title ] = value.match(/(award|revoke)\|(.+)/);
    return { method, title };
};

async function create (req, res) {
    const date = customDate('yyyy-mm-dd');
    const allPlayers = await User.findMembers();
    const rules = await Rule.getLatest();
    const players = allPlayers.map(player => ({ name: player.name.knownAs, id: player._id }));
    res.render('demerits/new', { date, players, rules });
};

async function edit (req, res) {
    const { d, p, y } = req.query;
    if (!d && !y) {
        req.flash('error', 'Something went wrong');
        return res.redirect('/demerits');
    };
    let startDate, endDate;

    // need to check for scenarios where combinations of values are available for when there are links for player name and title
    if (d) {
        const dateParts = d.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        if (dateParts.length < 4) {
            req.flash('error', 'Something went wrong');
            return res.redirect('/demerits');
        };
        startDate = new Date(dateParts[3], dateParts[2] - 1, dateParts[1]).setHours(0, 0, 0, 0);
        endDate = new Date(dateParts[3], dateParts[2] - 1, dateParts[1]).setHours(23, 59, 59, 999);
    };
    if (y) {
        if (!/\d{4}/.test(y)) {
            req.flash('error', 'Something went wrong');
            return res.redirect('/demerits');
        };
        startDate = new Date(y, 0, 1).setHours(0, 0, 0, 0);
        endDate = new Date(y, 11, 31).setHours(23, 59, 59, 999);
    }
    const demerits = await Demerit.find({ 'when.date': { $gte: startDate, $lte: endDate } }).populate('player').populate('rule').populate('action.titles');
    const allPlayers = await User.findMembers();
    const players = allPlayers.map(player => ({ name: player.name.knownAs, id: String(player._id) }));
    const rules = await Rule.getLatest();
    if (!p) return res.render('demerits/edit', { data: demerits, players, rules });
    const data = demerits.filter(({ player }) => String(player._id) === p);
    res.render('demerits/edit', { data, players, rules });
};

async function save (req, res) {
    const { demerit } = req.body;
    if (demerit) {
        await Promise.all(demerit.map(async d => {
            d.player = await User.findById(d.player);
            d.rule = await Rule.findById(d.rule);
            if (d.action && d.action.titles) {
                d.action.titles = await Promise.all(
                    convertToArray(d.action.titles).map(async demeritTitle => {
                        const { title, method } = titleObject(demeritTitle);
                        const { when, player} = d;
                        return await new Title({ name: title, when, player, method }).save();
                    }));
            };

            // approved by default for now
            d.status = 'Approved';

            // created by Lee by default for now
            d.history = [{ status: 'Created', updated: { by: d.player, date: Date.now() } }];
            await new Demerit(d).save();
        }));
        req.flash('success', `Demerit${demerit.length > 1 ? 's' : ''} saved`);
    } else req.flash('info', 'No changes made');
    res.redirect('/demerits');
};

async function show (req, res) {

    // make editable based on dropdown or replicate with AJAX
    const currentYear = new Date().getFullYear();
    const startDate = new Date (2021, 0, 1); // new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear, 11, 31);

    // const allDemerits = await Demerit.find().sort({ date: 1 });
    // const years = [ ...new Set(allDemerits.map(({ when }) => when.date.getFullYear())) ];
    const years = [2021]

    const allPlayers = await User.findMembers();

    const demerits = await Demerit.find({ 'when.date': { $gte: startDate, $lte: endDate } }).sort({ 'when.date': 1 }).populate('player');
    const drinks = await Drink.find({ 'when.date': { $gte: startDate, $lte: endDate } }).sort({ date: 1 }).populate('player');

    const allTitles = await Title.find({ 'when.date': { $gte: startDate, $lte: endDate } }).sort({ 'when.date': -1, 'when.hole': -1, 'when.created': -1 });
    const titles = TITLES.map(({ value }) => value);
    const demeritDates = [ ...new Set(demerits.map(({ when }) => when.formattedDate.friendly)) ];
    const drinkDates = [ ...new Set(drinks.map(({ when }) => when.formattedDate.friendly)) ];
    const data = {
        players: allPlayers.map(player => {
            return {
                id: String(player._id),
                name: player.name,
                titles: [],
                bbq: false
            };
        }),
        demerits: demeritDates.map(demeritDate => {
            const demeritsForDate = demerits.filter(({ when }) => when.formattedDate.friendly === demeritDate);
            return {
                date: demeritDate,
                players: allPlayers.map(({ _id }) => {
                    const player = String(_id);
                    const demerits = demeritsForDate.filter(demerit => String(demerit.player._id) === player).reduce((accumulate, { action }) => accumulate + action.demerits, 0);
                    return { player, demerits };
                })
            };
        }),
        drinks: drinkDates.map(drinkDate => {
            const drinksForDate = drinks.filter(({ when }) => when.formattedDate.friendly === drinkDate);
            return {
                date: drinkDate,
                players: allPlayers.map(({ _id }) => {
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
        const filterTitles = allTitles.filter(({ name }) => name === title);
        if (!filterTitles) continue;
        for (const filterTitle of filterTitles) {
            if (filterTitle.method === 'award') {
                if (!filterTitles.filter(({ player }) => player == filterTitle.player).find(({ method }) => method === 'revoke')) {
                    const holder = data.players.find(({ id }) => filterTitle.player == id);
                    if (holder) holder.titles.push(title);
                };
                break;
            };
        };
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
        const submittedDemerit = demerit[id];
        const existingDemerit = await Demerit.findById(id).populate('action.titles');
        if (/Restore/.test(submittedDemerit.operation)) await Demerit.findByIdAndDelete(id);
        else if (/Remove/.test(submittedDemerit.operation)) {
            existingDemerit.rule = await Rule.findById(submittedDemerit.rule);
            existingDemerit.player = await User.findById(submittedDemerit.player);
            existingDemerit.when.date = submittedDemerit.when.date;
            if (existingDemerit.when.hole) delete existingDemerit.when.hole;
            if (submittedDemerit.when.hole && submittedDemerit.when.hole !== '') existingDemerit.when.hole = submittedDemerit.when.hole;
            existingDemerit.when.updated = Date.now();
            if (existingDemerit.comments) delete existingDemerit.comments;
            if (submittedDemerit.comments && submittedDemerit.comments !== '') existingDemerit.comments = submittedDemerit.comments;
            existingDemerit.action.demerits = submittedDemerit.action.demerits;

            // approved and update by Lee by default for now
            existingDemerit.history.push({ status: 'Approved', updated: { by: await User.findOne({ 'role' : 'super' }), date: Date.now() } });

            if (submittedDemerit.action && submittedDemerit.action.titles) {
                submittedDemerit.action.titles = convertToArray(submittedDemerit.action.titles).map(title => titleObject(title));
                if (existingDemerit.action) {
                    for (const existingDemeritTitle of existingDemerit.action.titles) {
                        const foundSubmittedTitle = submittedDemerit.action.titles.find(title => title.title === existingDemeritTitle.name && title.method === existingDemeritTitle.method);
                        if (foundSubmittedTitle) {
                            const foundExistingTitle = await Title.findById(existingDemeritTitle._id);
                            foundExistingTitle.when.date = submittedDemerit.when.date;
                            foundExistingTitle.when.updated = Date.now();
                            foundExistingTitle.method = foundSubmittedTitle.method;
                            foundExistingTitle.player = submittedDemerit.player;
                            await foundExistingTitle.save();
                        } else await Title.findByIdAndDelete(existingDemeritTitle._id);
                    };
                };
                for (const submittedDemeritTitle of submittedDemerit.action.titles) {
                    if (!existingDemerit.action.titles.some(title => title.name === submittedDemeritTitle.title && title.method === submittedDemeritTitle.method)) {
                        const foundExistingTitle = await new Title({
                            when: existingDemerit.when,
                            name: submittedDemeritTitle.title,
                            method: submittedDemeritTitle.method,
                            player: existingDemerit.player
                        }).save();
                        if (existingDemerit.action.titles && existingDemerit.action.titles.length > 0) existingDemerit.action.titles.push(foundExistingTitle);
                        else existingDemerit.action.titles = [foundExistingTitle];
                    };
                };
            } else if (!submittedDemerit.action && !submittedDemerit.action.titles && existingDemerit.action && existingDemerit.action.titles) {
                existingDemerit.action.titles = await Promise.all(convertToArray(existingDemerit.action.titles).map(async title => await Title.findByIdAndDelete(title._id)));
            };
            await existingDemerit.save();
        };
    };
    req.flash('success', 'Demerits updated');
    res.redirect('/demerits');
};

module.exports = { create, edit, save, show, update };