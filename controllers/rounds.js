const path = require('path');

const Course = require('../models/course');
const Demerit = require('../models/demerit');
const Round = require('../models/round');
const Rule = require('../models/rule');
const Title = require('../models/title');
const User = require('../models/user');

const { customDate } = require('../utilities/formatDate');
const sort = require('../utilities/sort');
const { TEE_COLOURS, TITLES } = require('../constants');

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
        const { id: courseId, tee: teeValue } = body.course;
        const courseKeys = Object.keys(body).filter(key => key !== courseId && /^randa\-/.test(key));
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
                tees: teeKeys.map(teeKey => {
                    const tee = tees[teeKey];
                    const { gender } = tee;
                    return {
                        name: teeKey.split(`-${gender}`)[0],
                        gender,
                        holes: Object.keys(tee).filter(key => key !== 'gender' && /\d{1,2}/.test(key)).map(index => {
                            const { distance, par, strokeIndex } = tee[index];
                            return { distance, index, par, strokeIndex };
                        })
                    };
                })
            }).save();
        };

        // const course = (async function(courseId) {
        //     if (/^randa-/.test(courseId)) {
        //         const [ , randa ] = courseId.split('randa-');
        //         const C = await Course.findOne({ randa });
        //         if (!C) {
        //             const { name, scorecardUrl, tees: teesObject } = body[courseId];
        //             const teeNames = Object.keys(teesObject);
        //             const tees = teeNames.map(teeName => {
        //                 const tee = body.course.tees[teeName.toLowerCase()];
        //                 const { gender } = teesObject[teeName];
        //                 return {
        //                     name: teeName.split(`-${gender}`)[0],
        //                     gender,
        //                     holes: tee.map((hole, i) => {
        //                         const { distance, par, strokeIndex } = hole;
        //                         return { distance, index: ++i, par, strokeIndex };
        //                     })
        //                 };
        //             });
        //             return await new Course({ created, name, randa, scorecardUrl, tees, updated: [ created ] }).save();
        //         };
        //         return C;
        //     };
        //     return await Course.findById(courseId);
        // })(courseId);

        if (/^randa-/.test(courseId)) {
            const [ , randa ] = courseId.split('randa-');
            course = await Course.findOne({ randa });
            if (!course) {
                const { name, scorecardUrl, tees: teesObject } = body[courseId];
                const teeNames = Object.keys(teesObject);
                const tees = teeNames.map(teeName => {
                    const tee = body.course.tees[teeName.toLowerCase()];
                    const { gender } = teesObject[teeName];
                    return {
                        name: teeName.split(`-${gender}`)[0],
                        gender,
                        holes: tee.map((hole, i) => {
                            const { distance, par, strokeIndex } = hole;
                            return { distance, index: ++i, par, strokeIndex };
                        })
                    };
                });
                course = await new Course({ created, name, randa, scorecardUrl, tees, updated: [ created ] }).save();
            };
        } else course = await Course.findById(courseId);

        const tee = course.tees.find(({ gender, name }) => {
            const lowerTee = teeValue.toLowerCase();
            const [ teeName, teeGender ] = lowerTee.split('-');
            if (!teeGender) return name.toLowerCase() === teeName;
            return `${name}-${gender}`.toLowerCase() === lowerTee;
        })._id

        // if a round has already been completed on the same day and at the same course, update that round

        // capture marker, player-a, etc.
        // capturing playing group - some sort of index

        // const round = await Round.findOne({ course, date, tee }) || {
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
        const index = Math.max( 0, ...round.scores.map(({ playingGroup }) => playingGroup.index) ) + 1;
        round.lastModified = created;
        for (const key of playerKeys) {
            const { demerit, handicap, hole, id, team } = body[key];

            // const player = (async function(id) {
            //     if (/^new\-\d+/.test(id)) {
            //         const { name: full } = body[id];
            //         const player = await new User({ name: { full }, handicap: { starting: handicap, current: handicap } }).save();
            //         body[key].id = player.id;
            //         return player;
            //     };
            //     return await User.findById(id);
            // })(id);

            let player;
            if (/^new\-\d+/.test(id)) {
                const { name: full } = body[id];
                player = await new User({ name: { full }, handicap: { starting: handicap, current: handicap } }).save();
                body[key].id = player.id;
            } else player = await User.findById(id);

            // update index
            round.scores.push({ handicap, player, playingGroup: { index: 0, player: key }, shots: hole.map(Number), team });

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
    const courses = await Course.find();
    const players = await User.findPlayers();
    const round = await Round.findById(req.params.id).populate('scores.player').populate('course');
    const loggedIn = !!req.user;
    const { course, formattedDate: date, games: G, id, scores: S, tee: T } = round;
    const currentDate = customDate('yyyy-mm-dd');
    const games = G.map(({ handicap, method, name, players, roundType, summary }, index) => {
        const teams = [ ...new Set(players.map(({ team }) => team).filter(team => team)) ];
        return {
            handicap,
            index: index + 1,
            method,
            name,
            players: players.map(({ player }) => S.find(score => score.player._id.toString() === player.toString())),
            roundType: roundType.capitalize(),
            summary,
            teams
        };
    });

    // can we reduce duplication between scores and playingGroups?
    const scores = S.map(({ handicap = 54, player, playingGroup: pg, scores, shots }, scoreIndex) => {
        const playingGroup = (function(playingGroup, playerIndex) {
            const { index, player: p } = playingGroup || { index: 0 };
            const player = (function(player, playerIndex) {
                if (player === 'marker' || playerIndex === 0) return player;
                return `player ${player && player.split('-')[1] || String.fromCharCode(96 + playerIndex)}`;
            })(p, playerIndex);
            return { index, player };
        })(pg, scoreIndex);
        return { handicap, player, playingGroup, scores, shots }
    });
    const playingGroups = [ ...new Set(scores.map(({ playingGroup}) => playingGroup.index)) ].map(playingGroupIndex => {
        return scores.filter(({ playingGroup}) => playingGroup.index === playingGroupIndex)
            .map(({ handicap, player, playingGroup, scores, shots }) => ({ handicap, player, playingGroup, scores, shots }));
    });

    // move to Course model as virtual?
    const tees = course.tees.map(({ _id, colour, distance, gender, holes, measure, name, par, ratings }) => {
        let long = short = name;
        if (/\s/.test(name)) short = short.split(' ');
        else short = short.split('/');
        short = short.map(name => {
            if (!/\D/.test(name)) return name;
            for (const letter of name) {
                if (/\w/.test(letter)) return letter.toUpperCase();
            };
        }).join('');
        if (gender && course.tees.filter(tee => tee.name === name).length > 1) {
            long += ` (${gender[0].toUpperCase()}${gender.substr(1).toLowerCase()})`;
            short += ` (${gender[0].toUpperCase()})`;
        };
        return {
            _id,
            colour: (TEE_COLOURS.find(teeColour => teeColour.colour === colour) || { class: { table: '' } }).class.table,
            distance,
            gender,
            holes,
            measure,
            name: { long, name, short },
            par,
            ratings
        };
    });

    const tee = tees.find(({ _id }) => _id == T);

    // move Round model
    // can then be used to calculate number of birdies, bogeys, etc. for each player
    for (const score of scores) {
        score.class = score.shots.map((shot, i) => {
            if (!shot) return '';
            const { par } = tee.holes.find(({ index }) => index === (i + 1)) || { par: undefined };
            if (!par) return '';
            const parScore = shot - par;
            if (parScore < -1) return 'eagle';
            if (parScore === -1) return 'birdie';
            if (parScore === 1) return 'bogey';
            if (parScore > 1) return 'double-bogey';
            return '';
        });
        score.scores.par.class = (function(par) {
            if (par > 0) return 'f-over';
            if (par < 0) return 'f-under';
            return 'f-level';
        })(score.scores.par.full);
    };

    tee.class = (TEE_COLOURS.find(({ colour }) => colour === tee.colour) || { class: { table: '' } }).class.table;
    res.render('rounds/edit', { course, courses, currentDate, date, loggedIn, games, id, players, playingGroups, scores, tee, tees });
};

module.exports = { create, remove, save, serviceWorker, show, update, view };