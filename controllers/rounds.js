const path = require('path');

const Country = require('../models/country');
const Course = require('../models/course');
const Demerit = require('../models/demerit');
const Round = require('../models/round');
const Rule = require('../models/rule');
const Title = require('../models/title');
const User = require('../models/user');

const { TITLES } = require('../constants');

// used client-side also
function getPlayerKeys(object) {
    return Object.keys(object).filter(key => /^(?:marker$|player\-)/.test(key));
};

async function create (req, res) {
    const date = new Date().custom('yyyy-mm-dd');
    const allCourses = await Course.find();
    const allPlayers = await User.findPlayers();
    const countries = await Country.find();
    const rules = await Rule.getAll();
    const courses = allCourses.sortAlphabetically('name')
        .map(({ facility, id, name, randa, tees }) => ({ facility, id, name, randa, tees }));
    const players = allPlayers.map(player => {
        const { handicap, id, name, role } = player.toJSON();
            const { initials, knownAs } = name;
            return { handicap: handicap.trending.playing, id, name: { initials, knownAs }, guest: role === 'guest' };
    });
    res.render('rounds/new', { countries, players, rules, courses, date });
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
                const { distance, par, strokeIndex } = holes[hole];
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

            const existingScoreIndex = round.scores.findIndex(({ player }) => player == id);
            const existingScore = round.scores[existingScoreIndex] || { shots: [] };
            const shots = hole.map(Number).map((shot, index) => (shot || existingScore?.shots && existingScore?.shots[index] || 0));
            const player = await (async function(id) {
                if (existingScoreIndex !== -1) return existingScore.player;
                if (/^new\-\d+/.test(id)) {
                    const { name: full } = body[id];
                    const player = await new User({ name: { full }, handicap: { starting: handicap, current: handicap } }).save();
                    body[key].id = player.id;
                    return player;
                };
                return await User.findById(id);
            })(id);
            if (existingScoreIndex !== -1) {
                const { playingGroup } = existingScore;
                round.scores.splice(existingScoreIndex, 1, { handicap, player, playingGroup, shots, tee });
            } else round.scores.push({ handicap, player, playingGroup: { index, player: key }, shots, tee });
            if (!demerit) continue;
            for (const holeIndex of Object.keys(demerit)) {
                for (const index of Object.keys(demerit[holeIndex])) {
                    const { rule: r, demerits, comments, ...titles } = demerit[holeIndex][index];
                    const hole = +holeIndex.replace(/'/g, '');
                    const rule = await Rule.findById(r);
                    const when = { date, hole };
                    await new Demerit({
                        action: {
                            demerits: +demerits || 0,
                            titles: titles && Object.keys(titles).length > 0 && await Promise.all(Object.keys(titles).map(async title => {
                                const [ method, id ] = title.split('|');
                                const name = TITLES.find(TITLE => TITLE.id === id).value;
                                return await new Title({ name, method, player, when }).save();
                            }))
                        },
                        comments,
                        history: [{ status: 'Created', updated: created }],
                        player,
                        rule,
                        status: 'Approved',
                        when
                    }).save();
                };
            };
        };
        for (const key of Object.keys(body.game || {})) {
            const gameObject = body.game[key];
            const gamePlayerKeys = getPlayerKeys(gameObject);
            if (gamePlayerKeys.length === 0) continue;
            const { handicap = {}, method, game, round: roundType, scoring, team = {} } = gameObject;
            const { multiplier = 100, type = 'standard' } = handicap;
            const players = await Promise.all(gamePlayerKeys.map(async gamePlayer => {
                const teamValue = gameObject[gamePlayer].team;
                return {
                    player: await User.findById(body[gamePlayer].id),
                    team: teamValue === 'none' ? undefined : teamValue
                };
            }));
            round.games.push({
                game,
                handicap: { multiplier: +multiplier, type },
                method,
                players,
                roundType,
                scoring,
                teams: players.map(({ team }) => team).filter(team => team).map(id => {
                    const value = gameObject.team[id];
                    const name = value instanceof Array ? value[0] : value;
                    return { id, name };
                })
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
    const currentDate = new Date().custom('yyyy-mm-dd');
    const scores = S.map(({ classes, handicap = 54, player, playingGroup: pg, scores, shots, tee }, index) => {
        const playingGroup = pg || { index: 1, player: (index === 0 ? 'marker' : `player-${(index - 1).toLetter()}`) };
        return { classes, handicap, player, playingGroup, scores, shots, tee };
    });
    const playingGroups = [ ...new Set(scores.map(({ playingGroup}) => playingGroup.index)) ].map(playingGroupIndex => {
        return scores.filter(({ playingGroup}) => playingGroup.index === playingGroupIndex);
    });
    const games = G.map(({ description, game, handicap, method, participants, players: p, roundType, scoring, summary }, index) => {
        const players = p.map(({ player, team }) => {
            return {
                score: S.find(score => score.player._id.toString() === player.toString()),
                team
            };
        });
        const playingGroup = playingGroups.find(playingGroup => {
            return playingGroup.some(({ player }) => {
                return players.some(({ score }) => score.player._id == player._id);
            });
        });
        return {
            description,
            game,
            handicap,
            index: ++index,
            method,
            participants,
            players,
            playingGroup,
            roundType,
            scoring,
            summary
        };
    });
    const tee = course.tees.find(({ _id }) => {
        return _id == T ||
        _id == scores[0].tee;
    });
    res.render('rounds/edit', { course, courses, currentDate, date, games, id, players, playingGroups, tee });
};

module.exports = { create, remove, save, serviceWorker, show, update, view };