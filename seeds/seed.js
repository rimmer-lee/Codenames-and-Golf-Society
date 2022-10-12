const Charter = require('../models/charter');
const Country = require('../models/country');
const Course = require('../models/course');
const Demerit = require('../models/demerit');
const Drink = require('../models/drink');
const Region = require('../models/region');
const Round = require('../models/round');
const Rule = require('../models/rule');
const Title = require('../models/title');
const User = require('../models/user');

const { countries, courses, demerits, drinks, regions, rounds, sections, users } = require('./base');
const { createCourse } = require('../utilities/courseFunctions');

function regexName(name) {
    const [ first, last ] = name.split(' ');
    return new RegExp(`^${first}.*${last}$`, 'i');
};

async function seed() {
    const Charters = await Charter.find();
    if (Charters.length > 0) await Charter.collection.drop();
    const Countries = await Country.find();
    if (Countries.length > 0) await Country.collection.drop();
    const Courses = await Course.find();
    if (Courses.length > 0) await Course.collection.drop();
    const Demerits = await Demerit.find();
    if (Demerits.length > 0) await Demerit.collection.drop();
    const Drinks = await Drink.find();
    if (Drinks.length > 0) await Drink.collection.drop();
    const Regions = await Region.find();
    if (Regions.length > 0) await Region.collection.drop();
    const Rounds = await Round.find();
    if (Rounds.length > 0) await Round.collection.drop();
    const Rules = await Rule.find();
    if (Rules.length > 0) await Rule.collection.drop();
    const Titles = await Title.find();
    if (Titles.length > 0) await Title.collection.drop();
    const Users = await User.find();
    if (Users.length > 0) await User.collection.drop();
    await Promise.all(users.map(async user => {
        const U = await new User(user);
        await User.register(U, U.username);
    }));
    const machine = await User.findOne({ 'name.preferred': 'The Machine' });
    const created = { by: machine };
    for (const section of sections) {
        if ((section.rules || []).length > 0) section.rules = await Promise.all(section.rules.map(async rule => await new Rule(rule).save()));
    };
    await new Charter({ created: { date: new Date(2021, 0, 1), ...created }, sections, status: 'Approved' }).save();
    for (const country of countries) {
        await new Country(country).save();
    };
    for (const region of regions) {
        region.country = await Country.findOne({ name: region.country });
        await new Region(region).save();
    };
    for (const demerit of demerits) {
        demerit.player = await User.findOne({ 'name.full': { $regex: regexName(demerit.player) }});
        demerit.rule = await Rule.findOne({ 'index': demerit.rule });
        if (demerit.action && demerit.action.titles && demerit.action.titles.length > 0) demerit.action.titles = await Promise.all(demerit.action.titles.map(async ({ method, name }) => await new Title({ when: demerit.when, method, player: demerit.player, name }).save()));
        if (demerit.history && demerit.history.length > 0) for (const h of demerit.history) h.updated = created;
        await new Demerit(demerit).save();
    };
    for (const drink of drinks) {
        drink.player = await User.findOne({ 'name.full': { $regex: regexName(drink.player) }});
        await new Drink(drink).save();
    };
    for (const course of courses) {
        const courseData = await createCourse(course.randa);
        courseData.tees = courseData.tees.map(tee => {
            const { holes } = course.tees.find(({ name }) => name === tee.name);
            return { ...tee, holes };
        })
        await new Course({ ...courseData, created, updated: [ created ] }).save();
    };
    for (const round of rounds) {
        round.created = created
        round.lastModified = created
        round.course = await Course.findOne({ 'name': round.course });
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
        round.scores = await Promise.all(round.scores.map(async (score, index) => {
            score.playingGroup = { index: 1, player: (index === 0 ? 'marker' : `player-${(index - 1).toLetter()}`) };
            score.player = await User.findOne({ 'name.full': { $regex: regexName(score.player) }});
            score.tee = round.course.tees.find(({ name }) => name.toLowerCase() === round.tee.toLowerCase())._id;
            return score;
        }));
        await new Round(round).save();
    };
};

module.exports = { seed };