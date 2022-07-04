const Charter = require('../models/charter');
const Course = require('../models/course');
const Demerit = require('../models/demerit');
const Drink = require('../models/drink');
const Region = require('../models/region');
const Round = require('../models/round');
const Rule = require('../models/rule');
const Title = require('../models/title');
const User = require('../models/user');

const { courses, demerits, drinks, rounds, sections, users } = require('./base');

function regexName(name) {
    const [ first, last ] = name.split(' ');
    return new RegExp(`^${first}.*${last}$`, 'i');
};

async function seed() {
    const ch = await Charter.find();
    if (ch.length > 0) await Charter.collection.drop();
    const co = await Course.find();
    if (co.length > 0) await Course.collection.drop();
    const de = await Demerit.find();
    if (de.length > 0) await Demerit.collection.drop();
    const dr = await Drink.find();
    if (dr.length > 0) await Drink.collection.drop();
    const re = await Region.find();
    if (re.length > 0) await Region.collection.drop();
    const ro = await Round.find();
    if (ro.length > 0) await Round.collection.drop();
    const ru = await Rule.find();
    if (ru.length > 0) await Rule.collection.drop();
    const t = await Title.find();
    if (t.length > 0) await Title.collection.drop();
    const u = await User.find();
    if (u.length > 0) await User.collection.drop();
    await Promise.all(users.map(async user => {
        const u = await new User(user);
        await User.register(u, u.username);
    }));
    const defaultUser = await User.findOne({ 'name.preferred': 'The Machine' });
    for (const section of sections) {
        if ((section.rules || []).length > 0) section.rules = await Promise.all(section.rules.map(async rule => await new Rule(rule).save()));
    };
    await new Charter({ created: { date: new Date(2021, 0, 1), by: defaultUser }, sections, status: 'Approved' }).save();
    for (const demerit of demerits) {
        demerit.player = await User.findOne({ 'name.full': { $regex: regexName(demerit.player) }});
        demerit.rule = await Rule.findOne({ 'index': demerit.rule });
        if (demerit.action && demerit.action.titles && demerit.action.titles.length > 0) demerit.action.titles = await Promise.all(demerit.action.titles.map(async ({ method, name }) => await new Title({ when: demerit.when, method, player: demerit.player, name }).save()));
        if (demerit.history && demerit.history.length > 0) for (const h of demerit.history) h.updated.by = defaultUser;
        await new Demerit(demerit).save();
    };
    for (const drink of drinks) {
        drink.player = await User.findOne({ 'name.full': { $regex: regexName(drink.player) }});
        await new Drink(drink).save();
    };
    for (const course of courses) {
        course.created = { by: defaultUser };
        await new Course(course).save();
    };
    for (const round of rounds) {
        round.created = { by: defaultUser };
        round.lastModified = { by: defaultUser };
        round.course = await Course.findOne({ 'name': round.course });
        round.tee = round.course.tees.find(({ name }) => name.toLowerCase() === round.tee.toLowerCase())._id;
        round.games = await Promise.all(round.games.map(async game => {
            const { handicap, method, name, players } = game;
            return {
                handicap,
                method,
                name,
                players: await Promise.all(players.map(async p => {
                    const { player, team } = p;
                    return {
                        player: await User.findOne({ 'name.full': { $regex: regexName(player) }}),
                        team
                    }
                }))
            };
        }));
        for (const score of round.scores) score.player = await User.findOne({ 'name.full': { $regex: regexName(score.player) }});
        await new Round(round).save();
    };
};

module.exports = { seed };