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
function calculateGames(course = { tees: [] }, games = [],  players = [], scores = [], defaultTee = { holes: [] }) {
    for (const game of games) {
        const { handicap: defaultHandicap, name, players: defaultPlayersObject } = GAMES.find(({ name }) => name === game.name);
        // if (!defaultHandicap.adjustable) game.handicap = defaultHandicap.default;
        const { handicap, method, players: gamePlayers, roundType = 'full', scoring } = game;
        game.scores = [];
        game.summary = '';
        game.team = gamePlayers.some(({ team }) => team && team !== 'none');
        if ((game.team ? [ ...new Set(gamePlayers.map(({ team }) => team)) ].length : gamePlayers.length) < defaultPlayersObject.minimum) continue;
        const { end, start } = ROUND_TYPES.find(({ name }) => name === roundType);
        const handicapAdjustment = (function() {
            if (handicap !== 'competition') return 0;
            return Math.min(
                ...scores.filter(({ player }) => {
                    return gamePlayers.some(gamePlayer => player._id.toString() === gamePlayer.player._id.toString());
                }).map(({ handicap }) => +handicap)
            );
        })();
        const gameScores = (function() {
            const gameScores = gamePlayers.map(p => {
                const { player, team } = p;
                const id = player._id.toString();
                const scoreObject = scores.find(({ player }) => player._id.toString() === id);

                // move to separate function for use in calculating score values???
                const score = (function() {
                    if (handicap !== 'none') {
                        const { handicap: playerHandicap, shots, tee } = scoreObject;
                        const { shotsPerHole, holesWithAShot } = handicapShots(playerHandicap - handicapAdjustment);
                        const { holes = [] } = course.tees && course.tees.find(({ _id}) => _id == tee) || defaultTee;
                        return holes.map(({ index, par, strokeIndex }) => {
                            const shot = +shots[index - 1];
                            if (!shot || !par) return null;
                            const doubleBogey = +par + 2;
                            const nettScore = shot - shotsPerHole - (holesWithAShot && strokeIndex <= holesWithAShot);
                            if (name !== 'Stableford' && scoring !== 'stableford') return nettScore > doubleBogey ? doubleBogey : nettScore;
                            const nettParScore = doubleBogey - nettScore;
                            return nettParScore < 0 ? 0 : nettParScore;
                        });
                    };
                    return scoreObject.shots;
                })().slice(start, end);

                return { id, score, team };
            });
            if (!game.team) return gameScores;
            return [ ...new Set(gameScores.map(({ team }) => team)) ].map(id => {
                const playerScores = gameScores.filter(score => score.team === id).map(({ score }) => score);
                const score = playerScores.map(scores => {
                    const holeScores = scores.filter(score => score);
                    if (scores.length !== holeScores.length) return null;
                    if (method === 'Best') return Math.min( ...holeScores );
                    if (method === 'Combined') return holeScores.reduce((sum, value) => sum += value, 0);
                    if (method === 'Worst') return Math.max( ...holeScores );
                    return null;
                });
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
                const { id, points } = game.scores[0];
                const nameOne = getName(id, players, game.team);
                const nameTwo = getName(game.scores[1].id, players, game.team);
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
                const knownAs = getName(id, players, game.team);
                return { id: knownAs, total };
            }).sort((a, b) => {
                if (name === 'Skins' || name === 'Stableford') return b.total - a.total;
                if (name === 'Stroke Play') return a.total - b.total;
                return a.total - b.total;
            });
            if (name === 'Skins') return sortedTotals.map(({ id, total}) => `${id} (${total})`).join('; ');
            if (name === 'Stableford' && game.scores.length === 1) {
                const { id, total } = sortedTotals[0];
                return `${id} (${total})`;
            };
            const totals = [ ...new Set(sortedTotals.map(({ total }) => total)) ];
            const allSquare = totals.length === 1;
            return totals.map((t, index) => {
                const equalTotals = sortedTotals.filter(sortedTotal => sortedTotal.total === t).sortAlphabetically('id');
                const string = equalTotals.filter(equalTotal => equalTotal.total === t).map(({ id, total }, i) => {
                    if (i !== equalTotals.length - 1) return id;
                    if (index === 0) return `${id} ${allSquare ? 'tied' : `lead${equalTotals.length === 1 ? 's' : ''}`} (${total})`;
                    return `${id} (${Math.abs(total)})`;
                }).join(', ');
                const lastInstance = string.lastIndexOf(', ');
                if (lastInstance === -1) return string;
                return `${string.substr(0, lastInstance)} and ${string.substr(lastInstance + 2)}`;
            }).join('; ');
        }());
    };
    return games;
};

// shared with public/scripts/rounds/update.js
function getName(id, players, teamGame) {
    if (teamGame) return `Team ${id.length === 1 ? id.toUpperCase() : id}`;
    return (players.find(player => player.id == id) || { name: {} }).name.knownAs || id;
};

// shared with public/scripts/rounds/update.js
function handicapShots(handicap = 54) {
    return {
        shotsPerHole: Math.floor(handicap / 18),
        holesWithAShot: handicap % 18
    };
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
        shots: BREAKDOWN_OBJECT
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
            // handicap: {
            //     type: String,
            //     enum: ['competition', 'none', 'standard']
            // },

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
            scoring: {
                type: String,
                enum: ['stableford', 'standard']
            },
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
    for (const score of this.scores) {
        const { shotsPerHole, holesWithAShot } = handicapShots(score.handicap);
        const { holes = [] } = course.tees && course.tees.find(({ _id}) => _id == score.tee) || tee;
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
        };
        for (const hole of holes) {
            const { index, par, strokeIndex } = hole;
            const shot = +score.shots[index - 1];
            if (!shot || !par) {
                score.scores.nett.push(null);
                score.classes.shots.push('');
                continue;
            };
            const doubleBogey = +par + 2;
            const parScore = shot - par;
            const nettScore = shot - shotsPerHole - (holesWithAShot && strokeIndex <= holesWithAShot);
            score.classes.shots.push(parScoreClass(parScore));
            score.scores.nett.push(nettScore > doubleBogey ? doubleBogey : nettScore);
            if (index < 10) score.scores.par.front += parScore;
            if (index > 9) score.scores.par.back += parScore;
            score.scores.par.full += parScore;
        };
    };
    this.games = calculateGames(course, games, players, scores, tee);
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