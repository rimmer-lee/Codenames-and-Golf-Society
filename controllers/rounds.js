const path = require('path');

const Course = require('../models/course');
const Demerit = require('../models/demerit');
const Round = require('../models/round');
const Rule = require('../models/rule');
const Title = require('../models/title');
const User = require('../models/user');

const { customDate } = require('../utilities/formatDate');
const sort = require('../utilities/sort');
const { GAMES, TEE_COLOURS, TITLES } = require('../constants');

async function create (req, res) {const date = customDate('yyyy-mm-dd');
    const allCourses = await Course.find();
    const allPlayers = await User.findPlayers();
    const rules = await Rule.getLatest();
    const courses = sort(allCourses, 'name').map(({ facility, id, name, randa, tees }) => ({ facility, id, name, randa, tees }));
    const players = allPlayers.map(({ handicap, id, name, role }) => {
        // is full needed?
        const { first, full, knownAs, last } = name;
        return { handicap: handicap.current, id, name: { first, full, knownAs, last }, guest: role === 'guest' };
    });
    res.render('rounds/new', { players, rules, courses, date });
};

async function remove (req, res) {
    req.flash('info', 'That feature is not available yet');
    res.redirect('/rounds');
};

async function save (req, res) {

    // used client-side also
    function getPlayerKeys(object) {
        return Object.keys(object).filter(key => /^(?:marker$|player\-)/.test(key));
    };

    try {
        const { body } = req;
        const { date } = body.round;
        const { id, tee: teeValue } = body.course;
        const courseKeys = Object.keys(body).filter(key => key !== id && /^randa\-/.test(key));
        const playerKeys = getPlayerKeys(body);
        const created = { by: await User.findById(body.marker.id) };
        let course;
        for (const key of courseKeys) {
            const { name, randa, scorecardUrl } = body[key];
            const tees = body[key].tees || {};
            const teeKeys = Object.keys(tees);
            await new Course({
                created,
                updated: [ created ],
                randa,
                scorecardUrl,
                name,
                tees: teeKeys.map(name => {
                    const tee = tees[name];
                    return {
                        name,
                        gender: tee.gender,
                        holes: Object.keys(tee).filter(key => key !== 'gender' && /\d{1,2}/.test(key)).map(index => {
                            let { distance, par, strokeIndex } = tee[index];
                            return { distance, index, par, strokeIndex };
                        })
                    };
                })
            }).save();
        };
        if (/^randa-/.test(id)) {
            const [ , randa ] = id.split('randa-');
            course = await Course.findOne({ randa });
            if (!course) {
                const { name, scorecardUrl, tees: teesObject } = body[id];
                const teeNames = Object.keys(teesObject);
                const tees = teeNames.map(name => {
                    const { gender } = teesObject[name];
                    const tee = body.course.tees[name.toLowerCase()];
                    return {
                        name: name.split(`-${gender}`)[0],
                        gender,
                        holes: tee.map((hole, i) => {
                            const { distance, par, strokeIndex } = hole;
                            return { distance, index: ++i, par, strokeIndex };
                        })
                    };
                });
                course = await new Course({ created, name, randa, scorecardUrl, tees, updated: [ created ] }).save();
            };
        } else course = await Course.findById(id);

        const tee = course.tees.find(({ gender, name }) => {
            const lowerTee = teeValue.toLowerCase();
            const [ teeName, teeGender ] = lowerTee.split('-');
            if (!teeGender) return name.toLowerCase() === teeName;
            return `${name}-${gender}`.toLowerCase() === lowerTee;
        })._id

        // if a round has already been completed on the same day and at the same course, update that round

        // capture marker, player-a, etc.
        // capturing playing group - some sort of index

        // const existingRound = await Round.findOne({ course, date, tee }) || {
        //     created,
        //     course,
        //     games: [],
        //     date,
        //     scores: [],
        //     tee
        // };


        const round = {
            created,
            course,
            games: [],
            date,
            scores: [],
            tee
        };
        round.lastModified = created;
        for (const key of playerKeys) {
            const { demerit, handicap, hole, id, team } = body[key];
            let player;
            if (/^new\-\d+/.test(id)) {
                const { name: full } = body[id];
                player = await new User({ name: { full }, handicap: { starting: handicap, current: handicap } }).save();
                body[key].id = player.id;
            } else player = await User.findById(id);
            round.scores.push({ handicap, player, shots: hole.map(Number), team });
            if (!demerit) continue;
            for (const hole of Object.keys(demerit)) {
                for (const index of Object.keys(demerit[hole])) {
                    const { rule, demerits, comments, ...titles } = demerit[hole][index];
                    const when = { date, hole: +hole.replace(/'/g, '') };
                    const d = {
                        when,
                        player,
                        rule: await Rule.findById(rule),
                        status: 'Approved',
                        history: [{ status: 'Created', updated: created }],
                        action: { demerits: +demerits || 0 },
                        comments
                    };
                    if (titles && Object.keys(titles).length > 0) {
                        d.action.titles = await Promise.all(Object.keys(titles).map(async title => {
                            const [ method, id ] = title.split('|');
                            const name = TITLES.find(TITLE => TITLE.id === id).value;
                            return await new Title({ name, method, player, when }).save();
                        }));
                    };
                    await new Demerit(d).save();
                };
            };
        };
        for (const key of Object.keys(body.game || {})) {
            const gameObject = body.game[key];
            const gamePlayerKeys = getPlayerKeys(gameObject);
            if (gamePlayerKeys.length === 0) continue;
            const { handicap, method, name } = gameObject;
            round.games.push({
                handicap: handicap && handicap === 'on',
                method,
                name,
                players: await Promise.all(gamePlayerKeys.map(async gamePlayer => {
                    const teamValue = gameObject[gamePlayer].team;
                    return {
                        player: await User.findById(body[gamePlayer].id),
                        team: teamValue === 'none' ? undefined : teamValue
                    };
                }))
            });
        };
        await new Round(round).save();
        req.session.deleteLocalStorage = ['round', 'courses', 'players'];
        return res.redirect('/rounds');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Something went wrong');
        return res.redirect('/rounds/new');
    };
};

function serviceWorker (req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'scripts', 'rounds', 'service-worker.js'));
};

async function show (req, res) {
    const rounds = await Round.find().sort({ 'date': -1 }).populate('scores.player').populate('course');
    const localStorage = req.session.deleteLocalStorage || [];
    delete req.session.localStorage;
    res.render('rounds/index', { rounds, localStorage });
};

async function update (req, res) {

    // will need to save course as well

    console.log(JSON.parse(Object.keys(req.body)[0]).a)
    res.json({ success: true, message: req.params.id });
};

async function view (req, res) {

    // concatenate tee name and tee gender when there are multiple tees with the same name
    // needs a whole lot of tidying

    const courses = await Course.find();
    const round = await Round.findById(req.params.id).populate('scores.player').populate('course');
    const date = customDate('yyyy-mm-dd');
    const { course, games, scores } = round;
    const players = await User.findPlayers();

    const tees = course.tees.map(({ _id, colour, distance, gender, holes, measure, name, par, ratings }) => {
        let long = name;
        let short = name;
        if (/\s/.test(name)) short = short.split(' ');
        else short = short.split('/');
        short = short.map(name => {
            if (/\D/.test(name)) {
                for (const letter of name) {
                    if (/\w/.test(letter)) return letter.toUpperCase();
                };
            };
            return name;
        }).join('');
        if (gender && course.tees.filter(tee => tee.name === name).length > 1) {
            long += ` (${gender[0].toUpperCase()}${gender.substr(1).toLowerCase()})`;
            short += ` (${gender[0].toUpperCase()})`;
        };
        return {
            _id,
            colour,
            distance,
            gender,
            holes,
            measure,
            name: { long, name, short },
            par,
            ratings
        };
    });

    // move into round object
    const tee = tees.find(({ _id }) => _id == round.tee);

    // why does this not work?
    // round.tee = tees.find(({ _id }) => _id == round.tee);

    const tableClass = ((TEE_COLOURS.find(({ colour }) => colour === tee.name.name.toLowerCase()) || {}).class || {}).table || '';

    for (const game of games) {
        for (const score of game.scores) {
            if (!game.team) score.name = players.find(({ id }) => id.toString() === score.id).toJSON().name;
        };
    };

    res.render('rounds/edit', { courses, date, round, tee, tees, tableClass, players, scores });
};

module.exports = { create, remove, save, serviceWorker, show, update, view };