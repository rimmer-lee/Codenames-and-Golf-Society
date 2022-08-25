const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = require('./course');
const User = require('./user');

const { BREAKDOWN_OBJECT, GAMES, ROUND_TYPES } = require('../constants');

// shared with models/round.js
function calculateGames(course = { tees: [] }, games = [], players = [], scores = [], defaultTee = { holes: [] }) {
    for (const game of games) {
        const { game: name, handicap: { multiplier, type }, method, players: gamePlayers, roundType = 'full', scoring, teams } = game;
        const GAME = GAMES.game.find(({ id }) => id === name);
        game.description = '';
        game.participants = '';
        game.scores = [];
        game.summary = '';
        if (!GAME) continue;
        const stablefordMultiplier = +(scoring === 'stableford') * -2 + 1;
        const { end, start } = ROUND_TYPES.find(({ id }) => id === roundType);
        const handicapAdjustment = (function() {
            if (GAME.handicap && type === 'competition') return Math.min(
                    ...scores.filter(({ player }) => {
                        return gamePlayers.some(({ player: p }) => {
                            return stringifyId(player) === stringifyId(p)
                        });
                    }).map(({ handicap }) => +handicap * ((end - start) || 18) / 18)
                );
            return 0;
        })();
        const gameScores = (function() {
            const gameScores = gamePlayers.map(p => {
                const { player, team } = p;
                const id = stringifyId(player);
                const scoreObject = scores.find(({ player }) => stringifyId(player) === id);

                // move to separate function for use in calculating score values???
                const score = (function() {
                    if (scoring === 'shots') return scoreObject.shots.map(shot => shot > 0 ? shot : null);
                    const { handicap: playerHandicap, shots, tee } = scoreObject;
                    const { shotsPerHole, holesWithAShot } = handicapShots(multiplier / 100 * (playerHandicap - handicapAdjustment));
                    const { holes = [] } = course.tees && course.tees.find(({ _id}) => _id == tee) || defaultTee;
                    return holes.map(({ index, par, strokeIndex }) => {
                        const shot = +shots[index - 1];
                        if (!shot || !par) return null;
                        const doubleBogey = +par + 2;
                        const nettScore = shot - shotsPerHole - (holesWithAShot && strokeIndex <= holesWithAShot);
                        if (name !== 'stableford' && scoring !== 'stableford') return nettScore > doubleBogey ? doubleBogey : nettScore;
                        const nettParScore = doubleBogey - nettScore;
                        return nettParScore < 0 ? 0 : nettParScore;
                    });
                })().slice(start, end);

                return { id, score, team };
            });
            const teamScores = gameScores.filter(({ team }) => team && team !== 'none');
            if (teamScores.length > 0 && !GAME.filters.players.for.includes('team')) return [];
            return [
                ...gameScores.filter(({ team }) => !team || team === 'none').map(({ id: i, score }) => {
                    const id = getName(i, players, teams);
                    return { id, score: score.map(score => ({ score })) };
                }),
                ...[ ...new Set(teamScores.map(({ team }) => team)) ].map(t => {
                    const playerScores = gameScores.filter(({ team }) => team === t).map(({ score }) => score);
                    const score = Array.from({ length: (end - start) }).map((_, i) => {
                        const holeScores = playerScores.map(score => score[i]).flat();
                        if (playerScores.length !== holeScores.length) return { high: null, low: null, score: null };

                        // can these be set in GAMES.method[]?
                        if (method === 'best') return { score: Math.min( ...holeScores ) };
                        if (method === 'combined') return { score: holeScores.reduce((sum, value) => sum += value, 0) };
                        if (method === 'high/low') return { high: Math.max( ...holeScores ), low: Math.min( ...holeScores ) };
                        if (method === 'worst') return { score: Math.max( ...holeScores ) };

                        return { high: null, low: null, score: null };
                    });
                    const id = getName(t, players, teams);
                    return { id, score }
                })
            ]
        })();
        if (gameScores.length < GAME.filters.players.minimum) continue;
        const properties = Object.keys(gameScores[0]?.score[0] || {});
        game.description = {
            get description() {
                const { method, round, scoring } = this;
                return `${scoring}${method}${GAME.value}${round}`;
            },
            get handicap() {
                const HANDICAP = GAMES.handicap.find(({ id }) => id === type) || {};
                const { id, value } = HANDICAP;
                if (id === 'competition') return `${value} `;
                return '';
            },
            get method() {
                const METHOD = GAMES.method.find(({ id }) => id === method) || {};
                if (!METHOD) return '';
                const { id, value } = METHOD;
                return `${value} ${id === 'combined' ? 'Score' : 'Ball'} `;
            },
            get multiplier() {
                if (multiplier == 100) return '';
                return `${Math.round(+multiplier)}% `
            },
            get round() {
                if (!roundType || roundType === 'full') return '';
                return ` (${roundType.capitalize()} 9)`;
            },
            get scoring() {
                const SCORING = GAMES.scoring.find(({ id }) => id === scoring) || {};
                const { id, value } = SCORING;
                if (id === 'shots' || GAME.id === 'stableford') return '';
                const { handicap, multiplier } = this;
                return `${multiplier ? multiplier : ''}${handicap}${multiplier ? 'Handicap ' : ''}${value} `;
            }
        }.description;
        game.participants = {
            get players() {
                return gamePlayers.map(({ player, team }) => {
                    const knownAs = getName(stringifyId(player), players, []);
                    return { knownAs, team };
                })
            },
            get participants () {
                const { players } = this;
                if (teams.length > 0) return teams.map(({ id }) => {
                    return `${players.filter(({ team }) => id === team).map(({ knownAs }) => knownAs).join(', ').replaceLastInstance()} (${getName(id, [], teams)})`;
                }).join(' vs. ');
                return `Played between ${players.map(({ knownAs }) => knownAs).join(', ').replaceLastInstance()}`;
            }
        }.participants;
        game.scores = gameScores.map(({ id, score }) => {
            const { points } = {
                get points() {
                    if (name === 'stroke-play' || name === 'stableford') return score.map(({ score }) => score);
                    let skins = 0;
                    return score.map((s, i) => {
                        const holeResults = properties.map(property => {
                            const holeSores = gameScores.map(({ score }) => score[i][property] * stablefordMultiplier);
                            if (holeSores.some(score => !+score)) return null;
                            const winningScore = Math.min( ...holeSores );
                            if (holeSores.filter(score => score === winningScore).length === 1) {
                                if (s[property] === Math.abs(winningScore)) return 1;
                                return -1;
                            };
                            return 0;
                        });
                        if (holeResults.some(result => result === null)) return null;
                        const holeResult = holeResults.reduce((sum, value) => sum += value, 0);
                        skins++;
                        if (name === 'match-play' || holeResult === 0) return holeResult;
                        const k = skins;
                        skins = 0;
                        if (holeResult > 0) return k;
                        return 0;
                    });
                }
            };
            return { id, points };
        });
        game.summary = (function() {
            const unplayedHoles = Math.max( ...game.scores.map(({ points }) => points.filter(point => point === null).length) );
            const gameComplete = unplayedHoles === 0;
            if (name === 'match-play') {
                const { id: nameOne, points } = game.scores[0];
                const nameTwo = game.scores[1].id;
                const lengthOfPoints = points.length;
                let currentScore = 0;
                for (let i = 0; i < lengthOfPoints; i++) {
                    const point = points[i];
                    const remainingHoles = lengthOfPoints - i - 1 + unplayedHoles;
                    if (point === null) continue;
                    currentScore += point;
                    if (gameComplete && remainingHoles === 0) {
                        if (currentScore == 0) return 'Game halved';
                        return `${currentScore > 0 ? nameOne : nameTwo} wins (${currentScore})`;
                    };
                    if (currentScore > 0 && currentScore > remainingHoles) return `${nameOne} wins (${currentScore} & ${remainingHoles})`;
                    if (Math.abs(currentScore) > 0 && Math.abs(currentScore) > remainingHoles) return `${nameTwo} wins (${Math.abs(currentScore)} & ${remainingHoles})`;
                };
                if (currentScore === 0) return 'All square';
                return `${currentScore > 0 ? nameOne : nameTwo} ${Math.abs(currentScore)} up`;
            };
            const sortedTotals = game.scores.map(({ id, points }) => {
                const total = points.reduce((sum, value, index) => {
                    if (game.scores.some(({ points }) => points[index] === null)) return sum;
                    return sum += value;
                }, 0);
                return { id, total };
            }).sort((a, b) => {
                if (name === 'skins' || name === 'stableford' || scoring === 'stableford') return b.total - a.total;
                return a.total - b.total;
            });
            if (name === 'skins') return sortedTotals.map(({ id, total}) => `${id} (${total})`).join('; ');
            if (name === 'stableford' && game.scores.length === 1) {
                const { id, total } = sortedTotals[0];
                return `${id} (${total})`;
            };
            const totals = [ ...new Set(sortedTotals.map(({ total }) => total)) ];
            const allSquare = totals.length === 1;
            return totals.map((t, index) => {
                const equalTotals = sortedTotals.filter(sortedTotal => sortedTotal.total === t).sortAlphabetically('id');
                const string = equalTotals.filter(equalTotal => equalTotal.total === t).map(({ id, total }, i) => {
                    if (i !== equalTotals.length - 1) return id;
                    if (index === 0) return `${id} ${allSquare ? 'tied' : `${gameComplete ? 'win' : 'lead'}${equalTotals.length === 1 ? 's' : ''}`} (${total})`;
                    return `${id} (${Math.abs(total)})`;
                }).join(', ');
                return string.replaceLastInstance();
            }).join('; ');
        }());
    };
    return games;
};

// shared with public/scripts/rounds/update.js
function getName(id, players, teams) {
    const team = teams.find(team => team.id === id);
    if (!team) return players.find(player => stringifyId(player) === id)?.name?.knownAs || id;
    const { id: i, name } = team;
    if (i === name.toLowerCase()) return `Team ${name}`;
    return name;
};

// shared with public/scripts/rounds/update.js
function handicapShots(handicap = 54) {
    const rounded = Math.floor(handicap);
    return {
        shotsPerHole: Math.floor(rounded / 18),
        holesWithAShot: rounded % 18
    };
};

// shared with controllers/players.js
function parClass(par) {
    if (par > 0) return 'f-over';
    if (par < 0) return 'f-under';
    return 'f-level';
};

function parScoreClass(parScore) {
    if (parScore < -1) return 'eagle';
    if (parScore === -1) return 'birdie';
    if (parScore === 1) return 'bogey';
    if (parScore > 1) return 'double-bogey';
    return 'par';
};

// shared with public/scripts/rounds/update.js
function stringifyId(player) {
    return (player._id || player.id).toString();
};

const options = { toJSON: { virtuals: true } };

const GameSchema = new Schema({
    description: String,
    game: {
        enum: GAMES.game.map(({ id }) => id),
        type: String
    },
    handicap: {
        multiplier: Number,
        type: {
            enum: GAMES.handicap.map(({ id }) => id),
            type: String
        }
    },
    method: {
        enum: GAMES.method.map(({ id }) => id),
        type: String
    },
    participants: String,
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
        enum: ROUND_TYPES.map(({ id }) => id),
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
        enum: GAMES.scoring.map(({ id }) => id),
        type: String
    },
    teams: [
        {
            id: String,
            name: String
        }
    ]
}, options);

const ScoreSchema = new Schema({
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
        enum: ROUND_TYPES.map(({ id }) => id),
        type: String
    },
    scores: {
        nett: [ Number ],
        par: {
            back: Number,
            front: Number,
            full: Number,
            shots: [ Number ]
        },
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
    games: [ GameSchema ],
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
            const { id, start, end } = roundType;
            if (score.shots.slice(start, end).every(shot => shot !== 0)) {
                score.roundType = id;
                break;
            };
        };
        score.scores = {
            nett: [],
            par: { front: 0, back: 0, full: 0, shots: [] },
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
                score.scores.par.shots.push(null);
                continue;
            };
            const doubleBogey = +par + 2;
            const parScore = shot - par;
            const nettScore = shot - shotsPerHole - (holesWithAShot && strokeIndex <= holesWithAShot);
            score.scores.par.shots.push(parScore);
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
        datePicker: date.custom('yyyy-mm-dd'),
        friendly: date.custom('dd/mm/yyyy'),
        full: date.full()
    };
});

ScoreSchema.virtual('classes').get(function () {
    const { par } = this.scores;
    const classesObject = {};
    for (const key of Object.keys(par)) {
        const value = par[key] || 0;
        classesObject[key] = value instanceof Array ? value.map(v => parScoreClass(v)) : parClass(value);
    };
    return { par: classesObject };
});

module.exports = mongoose.model('Round', RoundSchema);