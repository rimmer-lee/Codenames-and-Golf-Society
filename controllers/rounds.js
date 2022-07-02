const path = require('path');

const Course = require('../models/course');
const Demerit = require('../models/demerit');
const Round = require('../models/round');
const Rule = require('../models/rule');
const Title = require('../models/title');
const User = require('../models/user');

const { customDate } = require('../utilities/formatDate');
const sort = require('../utilities/sort');

const { TITLES } = require('../constants');

// used client-side also
function getPlayerKeys(object) {
    return Object.keys(object).filter(key => /^(?:marker$|player\-)/.test(key));
};

async function create (req, res) {const date = customDate('yyyy-mm-dd');
    const allCourses = await Course.find();
    const allPlayers = await User.findPlayers();
    const rules = await Rule.getAll();
    const courses = sort(allCourses, 'name').map(({ facility, id, name, randa, tees }) => ({ facility, id, name, randa, tees }));
    const players = allPlayers.map(player => {
        const { handicap, id, name, role } = player.toJSON();
            const { initials, knownAs } = name;
            return { handicap: handicap.current, id, name: { initials, knownAs }, guest: role === 'guest' };
    });
    res.render('rounds/new', { players, rules, courses, date });
};

async function remove (req, res) {

    req.flash('info', 'That feature is not available yet');
    res.redirect('/rounds');

};

async function save (req, res) {
    try {
        const { body } = req;
        const { date } = body.round;
        const { id: courseId, tee, tees } = body.course;
        const playerKeys = getPlayerKeys(body);
        const created = { by: await User.findById(body.marker.id) };
        const course = await Course.findById(courseId);
        for (const teeId of Object.keys(tees)) {
            const holes = tees[teeId];
            course.tees.find(({ id }) => id === teeId).holes = Object.keys(holes).map(hole => {
                const {distance, par, strokeIndex } = holes[hole];
                return { distance: +distance, index: ++hole, par: +par, strokeIndex: +strokeIndex };
            });
        };
        await course.save();

        // const round = await Round.findOne({ course, date }) ||
        //     { created, course, games: [], date, scores: [] };
        const round = await Round.findOne({ course, date, tee }) ||
            { created, course, games: [], date, scores: [], tee };

        const index = Math.max( 0, ...round.scores.map(({ playingGroup }) => playingGroup.index) ) + 1;
        round.lastModified = created;
        for (const key of playerKeys) {

            // const { demerit, handicap, hole, id, tee } = body[key];
            const { demerit, handicap, hole, id } = body[key];

            const shots = hole.map(Number);
            const existingScoreIndex = round.scores.findIndex(({ player }) => player == id);
            if (existingScoreIndex !== -1) {
                const { player, playingGroup } = round.scores[existingScoreIndex];

                round.scores.splice(existingScoreIndex, 1, { handicap, player, playingGroup, shots, tee });
                // round.scores.splice(existingScoreIndex, 1, { handicap, player, playingGroup, shots });

            } else {
                const player = await (async function(id) {
                    if (/^new\-\d+/.test(id)) {
                        const { name: full } = body[id];
                        const player = await new User({ name: { full }, handicap: { starting: handicap, current: handicap } }).save();
                        body[key].id = player.id;
                        return player;
                    };
                    return await User.findById(id);
                })(id);

                round.scores.push({ handicap, player, playingGroup: { index, player: key }, shots, tee });
                // round.scores.push({ handicap, player, playingGroup: { index, player: key }, shots });

            };
            if (!demerit) continue;
            for (const hole of Object.keys(demerit)) {
                for (const index of Object.keys(demerit[hole])) {
                    const { rule, demerits, comments, ...titles } = demerit[hole][index];
                    const when = { date, hole: +hole.replace(/'/g, '') };
                    const d = {
                        action: { demerits: +demerits || 0 },
                        comments,
                        history: [{ status: 'Created', updated: created }],
                        player,
                        rule: await Rule.findById(rule),
                        status: 'Approved',
                        when
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
            const { handicap, method, name, round: roundType } = gameObject;
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
                })),
                roundType
            });
        };
        if (round._id) await round.save();
        else await new Round(round).save();
        req.session.deleteLocalStorage = ['round', 'players'];
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

    console.log(JSON.parse(Object.keys(req.body)[0]).a)
    res.json({ success: true, message: req.params.id });

};

async function view (req, res) {
    const courses = await Course.find();
    const players = await User.findPlayers();
    const round = await Round.findById(req.params.id).populate('scores.player').populate('course');
    const { course, formattedDate: date, games: G, id, scores: S, tee: T } = round.toJSON();
    const currentDate = customDate('yyyy-mm-dd');
    const games = G.map(({ handicap, method, name, players, roundType, summary }, index) => {
        const teams = [ ...new Set(players.map(({ team }) => team).filter(team => team)) ];
        return {
            handicap,
            index: ++index,
            method,
            name,
            players: players.map(({ player }) => S.find(score => score.player._id.toString() === player.toString())),
            roundType: roundType.capitalize(),
            summary,
            teams
        };
    });
    const tee = course.tees.find(({ _id }) => _id == T);
    const scores = S.map(({ classes, handicap = 54, player, playingGroup: pg, scores, shots }, scoreIndex) => {
        const playingGroup = (function(playingGroup, playerIndex) {
            const { index, player: p } = playingGroup || { index: 0 };
            const player = (function(player, playerIndex) {
                if (player === 'marker' || playerIndex === 0) return player;
                return `player ${player && player.split('-')[1] || String.fromCharCode(96 + playerIndex)}`;
            })(p, playerIndex);
            return { index, player };
        })(pg, scoreIndex);
        return { classes, handicap, player, playingGroup, scores, shots };
    });
    const playingGroups = [ ...new Set(scores.map(({ playingGroup}) => playingGroup.index)) ].map(playingGroupIndex => {
        return scores.filter(({ playingGroup}) => playingGroup.index === playingGroupIndex);
    });
    res.render('rounds/edit', { course, courses, currentDate, date, games, id, players, playingGroups, tee });
};

module.exports = { create, remove, save, serviceWorker, show, update, view };