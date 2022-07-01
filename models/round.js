const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = require('./course');
const User = require('./user');

const { BREAKDOWN_OBJECT, GAMES, ROUND_TYPES } = require('../constants');

const formatDate = require('../utilities/formatDate');

// shared with public/scripts/rounds/shared-functions.js
Array.prototype.sortAlphabetically = function(property = '') {
    function getProperty(property) {
        let object = this;
        for (const p of property.split('.')) object = object[p];
        return object;
    };
    return this.sort((a, b) => {
        const upperA = getProperty.call(a, property).toUpperCase();
        const upperB = getProperty.call(b, property).toUpperCase();
        if (upperA < upperB) return -1;
        if (upperA > upperB) return 1;
        return 0;
    })
};

// shared with public/scripts/rounds/update.js
function calculateGames(gameObject = {}, course = { tees: [] }, players = [], defaultTee = { holes: [] }) {
    for (const score of gameObject.scores) {
        const handicap = Math.floor(score.handicap || 54);
        const shotsPerHole = Math.floor(handicap / 18);
        const holesWithAShot = handicap % 18;
        const { holes = [] } = course.tees && course.tees.find(({ _id}) => _id == score.tee) || defaultTee;
        for (const roundType of ROUND_TYPES) {
            const { name, start, end } = roundType;
            if (score.shots.slice(start, end).every(shot => shot !== 0)) {
                score.roundType = name;
                break;
            };
        };
        score.classes = { shots: [] };
        score.scores = {
            nett: [],
            par: { front: 0, back: 0, full: 0 },
            shots: {
                front: score.shots.slice(0, 9).reduce((sum, value) => sum += value, 0),
                back: score.shots.slice(9).reduce((sum, value) => sum += value, 0),
                full: score.shots.reduce((sum, value) => sum += value, 0)
            },
            stableford: []
        };
        for (const hole of holes) {
            const { index, par, strokeIndex } = hole;
            const shot = +score.shots[index - 1];
            if (!shot || !par) {
                score.scores.nett.push(null);
                score.classes.shots.push('');
                score.scores.stableford.push(null);
                continue;
            };
            const doubleBogey = +par + 2;
            const parScore = shot - par;
            const nettScore = shot - shotsPerHole - (holesWithAShot && strokeIndex <= holesWithAShot);
            const nettParScore = doubleBogey - nettScore;
            score.classes.shots.push(parScoreClass(parScore));
            score.scores.nett.push(nettScore > doubleBogey ? doubleBogey : nettScore);
            score.scores.stableford.push(nettParScore < 0 ? 0 : nettParScore);
            if (index < 10) score.scores.par.front += parScore;
            if (index > 9) score.scores.par.back += parScore;
            score.scores.par.full += parScore;
        };
    };
    for (const game of gameObject.games) {
        const { handicap: defaultHandicap, name, players: defaultPlayersObject } = GAMES.find(({ name }) => name === game.name);
        if (!defaultHandicap.adjustable) game.handicap = defaultHandicap.default;
        const { handicap, method, players: gamePlayers, roundType = 'full' } = game;
        game.team = gamePlayers.some(({ team }) => team && team !== 'none');
        if ((game.team ? [ ...new Set(gamePlayers.map(({ team }) => team)) ].length : gamePlayers.length) < defaultPlayersObject.minimum) continue;
        const { end, start } = ROUND_TYPES.find(({ name }) => name === roundType);
        const gameScores = (function() {
            const gameScores = gamePlayers.map(p => {
                const { player, scores, shots } = gameObject.scores.find(({ player }) => player._id.toString() === p.player._id.toString());
                const score = (function(game, handicap, scores) {
                    if (game === 'Stableford') return scores.stableford;
                    if (handicap) return scores.nett;
                    return shots;
                })(name, handicap, scores, shots).slice(start, end);
                return { id: player._id.toString(), score, team: p.team };
            });
            if (!game.team) return gameScores;
            return [ ...new Set(gameScores.map(({ team: id }) => id)) ].map(id => {
                const playerScores = gameScores.filter(score => score.team === id).map(({ score }) => score);
                const score = [];
                for (let i = start; i < end; i++) {
                    score.push((function() {
                        const holeScores = playerScores.map(playerScore => playerScore[i]).filter(score => score);
                        if (holeScores.length !== playerScores.length) return null;
                        switch (method) {
                            case 'Best':
                                return Math.min( ...holeScores );
                            case 'Combined':
                                return holeScores.reduce((sum, value) => sum += value, 0);
                            case 'Worst':
                                return Math.max( ...holeScores );
                            default:
                                return null;
                        };
                    })());
                };
                return { id, score }
            });
        })();
        game.scores = gameScores.map(({ id, score }) => {
            const points = (function() {
                if (name === 'Stroke Play' || name === 'Stableford') return score.map(s => +s || null);
                const matchPlay = name === 'Match Play';
                let skins = 0;
                return score.map((s, i) => {
                    const holeScores = gameScores.map(({ score }) => score[i]);
                    if (holeScores.some(s => !+s)) return null;
                    const minScore = Math.min( ...holeScores );
                    skins++;
                    if (holeScores.filter(score => score === minScore).length === 1) {
                        const skinsToAdd = skins;
                        skins = 0;
                        if (s === minScore) return matchPlay ? 1 : skinsToAdd;
                        if (matchPlay) return -1;
                    };
                    return 0;
                });
            })();
            return { id, points };
        });
        game.summary = (function() {
            if (name === 'Match Play') {
                const { id: idOne, points } = game.scores[0];
                const idTwo = game.scores[1].id;

                // move logic to function
                const nameOne = game.team ? `Team ${idOne.toUpperCase()}` : (players.find(player => player.id == idOne) || { name: {} }).name.knownAs || idOne;
                const nameTwo = game.team ? `Team ${idTwo.toUpperCase()}` : (players.find(player => player.id == idTwo) || { name: {} }).name.knownAs || idTwo;

                const gameComplete = !points.some(point => point === null);
                const lengthOfPoints = points.length;
                let currentScore = 0;
                for (let i = 0; i < lengthOfPoints; i++) {
                    const point = points[i];
                    const remainingHoles = lengthOfPoints - i - 1;
                    if (point === null) continue;
                    currentScore += point;
                    if (gameComplete && remainingHoles === 0) {
                        if (currentScore == 0) return 'Game halved';
                        return `${currentScore > 0 ? nameOne : nameTwo} wins`;
                    };
                    if (currentScore > 0 && currentScore > remainingHoles) return `${nameOne} wins (${currentScore} & ${remainingHoles})`;
                    if (Math.abs(currentScore) > 0 && Math.abs(currentScore) > remainingHoles) return `${nameTwo} wins (${Math.abs(currentScore)} & ${remainingHoles})`;
                };
                if (currentScore === 0) return 'All square';
                return `${currentScore > 0 ? nameOne : nameTwo} ${currentScore > 0 ? currentScore : Math.abs(currentScore)} up`;
            };
            const sortedTotals = game.scores.map(({ id, points }) => {
                const total = points.reduce((sum, value, index) => {
                    if (game.scores.some(({ points }) => points[index] === null)) return sum;
                    return sum += value;
                }, 0);
                const knownAs = game.team ? `Team ${id.toUpperCase()}` : (players.find(player => player.id == id) || { name: {} }).name.knownAs || id;
                return { id: knownAs, total };
            }).sort((a, b) => {
                if (name === 'Skins' || name === 'Stableford') return b.total - a.total;
                if (name === 'Stroke Play') return a.total - b.total;
                return a.total - b.total;
            });
            const totals = [ ...new Set(sortedTotals.map(({ total }) => total)) ];
            const leadTotal = totals[0];
            const jointLeaders = sortedTotals.filter(({ total }) => total === leadTotal);
            if (name === 'Stableford' && game.scores.length === 1) {
                const { id, total } = sortedTotals[0];
                return `${id} (${total})`;
            };
            if (jointLeaders.length === game.scores.length && name !== 'Skins') return 'All square';
            return totals.map((t, index) => {
                const equalTotals = sortedTotals.filter(sortedTotal => sortedTotal.total === t).sortAlphabetically('id');
                const string = equalTotals.filter(equalTotal => equalTotal.total === t).map(({ id, total }, i) => {
                    if (i !== equalTotals.length - 1) return id;
                    if (name === 'Skins') return `${id} (${total})`;
                    if (index === 0) return `${id} lead${equalTotals.length === 1 ? 's' : ''} (${total})`;
                    return `${id} (${Math.abs(total - leadTotal)} behind)`;
                }).join(', ');
                const lastInstance = string.lastIndexOf(', ');
                if (lastInstance === -1) return string;
                return `${string.substr(0, lastInstance)} and ${string.substr(lastInstance + 2)}`;
            }).join('; ');
        }());
    };
    return gameObject;
};

function parClass(par) {
    if (par > 0) return 'f-over';
    if (par < 0) return 'f-under';
    return 'f-level';
};

// shared with public/scripts/rounds/update.js
function parScoreClass(parScore) {
    if (parScore < -1) return 'eagle';
    if (parScore === -1) return 'birdie';
    if (parScore === 1) return 'bogey';
    if (parScore > 1) return 'double-bogey';
    return '';
};

const options = { toJSON: { virtuals: true } };

const ScoreSchema = new Schema({
    classes: { shots: [ String ] },
    handicap: Number,
    player: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    playingGroup: {
        index: Number,
        player: String
    },
    roundType: {
        enum: ROUND_TYPES.map(({ name }) => name),
        type: String
    },
    scores: {
        nett: [ Number ],
        par: BREAKDOWN_OBJECT,
        shots: BREAKDOWN_OBJECT,
        stableford: [ Number ]
    },
    shots: [ Number ],
    tee: String
}, options);

const RoundSchema = new Schema({
    course: {
        ref: 'Course',
        type: Schema.Types.ObjectId
    },
    created: {
        date: {
            default: Date.now(),
            immutable: true,
            required: true,
            type: Date
        },
        by: {
            ref: 'User',
            required: true,
            type: Schema.Types.ObjectId
        },
        comments: String
    },
    date: {
        default: Date.now(),
        required: true,
        type: Date
    },
    lastModified: {
        by: {
            ref: 'User',
            required: true,
            type: Schema.Types.ObjectId
        },
        comments: String,
        date: {
            default: Date.now(),
            required: true,
            type: Date
        }
    },
    games: [
        {

            // handicap: Boolean,
            handicap: Schema.Types.Mixed,

            method: {
                enum: [ ...new Set(GAMES.map(({ options }) => options.map(({ values }) => values)).flat(2)) ],
                type: String
            },
            name: {
                enum: GAMES.map(({ name }) => name),
                type: String
            },
            players: [
                {
                    player: {
                        ref: 'User',
                        type: Schema.Types.ObjectId
                    },
                    team: String
                }
            ],
            roundType: {
                enum: ROUND_TYPES.map(({ name }) => name),
                type: String
            },
            scores: [
                {
                    id: String,
                    points: [ Number ]
                }
            ],
            summary: String,
            team: {
                default: false,
                type: Boolean
            }
        }
    ],
    scores: [ ScoreSchema ],
    tee: String
}, options);

RoundSchema.pre('validate', async function(next) {
    this.lastModified.date = Date.now();
    next();
});

RoundSchema.pre('save', async function(next) {
    const { course: courseId, games, scores, tee: teeId } = this;
    const players = await User.find();
    const course = await Course.findById(courseId);
    const tee = course.tees.find(({ _id}) => _id == teeId);
    const gamesObject = calculateGames({ games, scores }, course, players, tee);
    this.games = gamesObject.games;
    this.scores = gamesObject.scores;
    next();
});

// RoundSchema.post('save', async function(next) {
//     for (const score of this.scores) {
//         const playerId = score.player;
//         const player = await Player.findById(playerId);
//         only do this for rounds including and after this round
//         const rounds = await Rounds.find({ 'scores.player': playerId }).populate('course').sort({ 'date': -1 });
//         const handicapDifferentials = [];
//         const { starting } = player.handicap;
//         player.handicap.progression = [{ handicap: starting ? starting : 54.0 }];
//         for (const round of rounds) {
//             const { course, date, scores, tee } = round;
//             const { holes, ratings } = course.tees.find(({ colour, name }) => colour.toLowerCase() === tee.toLowerCase() || name.toLowerCase() === tee.toLowerCase());
//             const { roundType, shots } = scores.find(({ player }) => player === playerId);
//             const adjustedShots = []
//             let roundHandicap = player.handicap.progression[player.handicap.progression.length - 1].handicap;
//             if (roundType === 'practice') continue;
//             else if (roundType !== 'full') roundHandicap = roundHandicap / 2;
//             const { start, end } = ROUND_TYPES.find(({ name }) => name === roundType);
//             const holesPlayed = end - start;
//             roundHandicap = Math.floor(roundHandicap);
//             holes.forEach((hole, holeIndex) => {
//                 if (holeIndex < start || holeIndex > end) return;
//                 const { par, strokeIndex } = hole;
//                 const handicapShots = Math.floor(roundHandicap / holesPlayed, 0) + +(strokeIndex < roundHandicap % holesPlayed);
//                 const shot = shots[holeIndex];
//                 const maxScore = par + handicapShots + 2;
//                 adjustedShots.push(shot > maxScore ? maxScore : shot);
//             });
//             handicapDifferentials.push(Math.round(10 * (adjustedShots.reduce((sum, value) => sum += value, 0) - ratings.course[roundType]) * 113 / ratings.slope[roundType]) / 10);

//             // need to handle plus handicaps i.e. really good golfers

//             let adjustment = 0;
//             let differentials;
//             if (handicapDifferentials.length < 3) continue;
//             else if (handicapDifferentials.length < 6) differentials = 1;
//             else if (handicapDifferentials.length < 9) differentials = 2;
//             else if (handicapDifferentials.length < 12) differentials = 3;
//             else if (handicapDifferentials.length < 15) differentials = 4;
//             else if (handicapDifferentials.length < 17) differentials = 5;
//             else if (handicapDifferentials.length < 19) differentials = 6;
//             else if (handicapDifferentials.length < 20) differentials = 7;
//             else differentials = 8;
//             if ([4, 6].indexOf(handicapDifferentials.length) !== -1) adjustment = 1;
//             else if (handicapDifferentials.length === 3) adjustment = 2;
//             const handicap = handicapDifferentials.sort((a, b) => a - b).slice(0, differentials).reduce((sum, value) => sum += value, 0) / differentials - adjustment;
//             player.handicap.progression.push({ date, handicap });
//         };
//         player.save();

//     };
//     next();
// });

RoundSchema.virtual('formattedDate').get(function () {
    const { date } = this;
    return {
        datePicker: formatDate.customDate('yyyy-mm-dd', date),
        friendly: formatDate.customDate('dd/mm/yyyy', date),
        full: formatDate.fullDate(date)
    };
});

ScoreSchema.virtual('classes.par').get(function () {
    const { par } = this.scores;
    const classesObject = {};
    for (const key of Object.keys(par)) {
        const value = par[key] || 0;
        classesObject[key] = parClass(value);
    };
    return classesObject;
});

module.exports = mongoose.model('Round', RoundSchema);