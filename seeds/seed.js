// https://gist.github.com/marciejones/92552486b4681fe1c3a6b59a9485194a

const Charter = require('../models/charter');
const Course = require('../models/course');
const Demerit = require('../models/demerit');
const Drink = require('../models/drink');
const Round = require('../models/round');
const Rule = require('../models/rule');
const Title = require('../models/title');
const User = require('../models/user');
const { courses, demerits, drinks, rounds, sections, users } = require('./base');

async function seed() {
    const ch = await Charter.find();
    const co = await Course.find();
    const de = await Demerit.find();
    const dr = await Drink.find();
    const ro = await Round.find();
    const ru = await Rule.find();
    const t = await Title.find();
    const u = await User.find();
    if (ch.length > 0) await Charter.collection.drop();
    if (co.length > 0) await Course.collection.drop();
    if (de.length > 0) await Demerit.collection.drop();
    if (dr.length > 0) await Drink.collection.drop();
    if (ro.length > 0) await Round.collection.drop();
    if (ru.length > 0) await Rule.collection.drop();
    if (t.length > 0) await Title.collection.drop();
    if (u.length > 0) await User.collection.drop();
    await Promise.all(users.map(async user => {
        const u = await new User(user);
        await User.register(u, u.username);
        // await new User(user).save();
    }));
    const defaultUser = await User.findOne({ 'name.preferred': 'The Machine' });
    for (const section of sections) {
        if (section.rules && section.rules.length > 0) section.rules = await Promise.all(section.rules.map(async rule => await new Rule(rule).save()));
    };
    await new Charter({ created: { version: '2021.0', date: new Date(2021, 0, 1), by: defaultUser }, sections, status: 'Approved' }).save();
    for (const demerit of demerits) {
        demerit.player = await User.findOne({ 'name.first': demerit.player.split(' ')[0], 'name.last': demerit.player.split(' ')[1] });
        demerit.rule = await Rule.findOne({ 'index': demerit.rule });
        if (demerit.action && demerit.action.titles && demerit.action.titles.length > 0) demerit.action.titles = await Promise.all(demerit.action.titles.map(async ({ method, name }) => await new Title({ when: demerit.when, method, player: demerit.player, name }).save()));
        if (demerit.history && demerit.history.length > 0) for (const h of demerit.history) h.updated.by = defaultUser;
        await new Demerit(demerit).save();
    };
    for (const drink of drinks) {
        drink.player = await User.findOne({ 'name.first': drink.player.split(' ')[0], 'name.last': drink.player.split(' ')[1] });
        await new Drink(drink).save();
    };
    for (const course of courses) {
        course.created = { by: defaultUser };
        await new Course(course).save();
    };
    for (const round of rounds) {

    };
};

module.exports = { seed };