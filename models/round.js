const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = require('./course');
const User = require('./user');

const { BREAKDOWN_OBJECT, GAMES, ROUND_TYPES } = require('../constants');

// shared with models/round.js
function calculateGames(tees = [], games = [], players = [], scores = [], defaultTee = { holes: [] }) {
    for (const game of games) {
        const { game: name, handicap: { multiplier, type }, method, players: gamePlayers, roundType = 'full', scoring, teams } = game;
        const GAME = GAMES.game.find(({ id }) => id === name);
        game.description = '';
        game.participants = '';
        game.scores = [];
        game.summary = '';
        if (!GAME) continue;
        const stablefordMultiplier = +([name, scoring].includes('stableford')) * -2 + 1;
        const { end, start } = ROUND_TYPES.find(({ id }) => id === roundType);
        const handicapAdjustment = (function() {
            if (type !== 'competition') return 0;
            return Math.min(
                ...scores
                    .filter(({ player }) => {
                        return gamePlayers.some(({ player: p }) => {
                            return stringifyId(player) === stringifyId(p)
                        });
                    })
                    .map(({ handicap }) => +handicap * ((end - start) || 18) / 18)
            );
        })();
        const gameScores = (function() {
            const gameScores = gamePlayers.map(p => {
                const { player, team } = p;
                const id = stringifyId(player);
                const scoreObject = scores.find(({ player }) => stringifyId(player) === id);
                const score = (function() {
                    if (name !== 'stroke-play' && scoring === 'shots') return scoreObject.shots.map(shot => shot > 0 ? shot : null);
                    const { handicap: playerHandicap, shots, tee } = scoreObject;
                    const { shotsPerHole, holesWithAShot } = handicapShots(multiplier / 100 * (playerHandicap - handicapAdjustment));
                    const { holes = [] } = tees.find(({ id }) => id == tee) || defaultTee;
                    return holes.map(({ index, par, strokeIndex }) => {
                        const shot = +shots[index - 1];
                        if (!shot || !par) return null;
                        if (name === 'stroke-play') return shot - par;
                        const nettScore = shot - shotsPerHole - (holesWithAShot && strokeIndex <= holesWithAShot);
                        if (name !== 'stableford' && scoring !== 'stableford') return nettScore;
                        const stablefordScore = +par + 2 - nettScore;
                        return stablefordScore < 0 ? 0 : stablefordScore;
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
                        const holeScores = playerScores.map(score => score[i] * stablefordMultiplier).flat();
                        if (playerScores.length !== holeScores.length) return { high: null, low: null, score: null };
                        return {
                            combined: holeScores.reduce((sum, value) => sum += value, 0),
                            high: Math.max( ...holeScores ),
                            low: Math.min( ...holeScores )
                        };
                    });
                    const id = getName(t, players, teams);
                    return { id, score }
                })
            ]
        })();
        if (gameScores.length < GAME.filters.players.minimum) continue;
        const properties = (function() {
            if (method === 'best') return ['low'];
            if (method === 'combined') return ['combined'];
            if (method === 'high/low') return ['high', 'low'];
            if (method === 'worst') return ['high'];
            return ['score'];
        })();
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
                const METHOD = GAMES.method.find(({ id }) => id === method);
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
                    let skins = 0;
                    return score.map((s, i) => {
                        const holeResults = properties.map(property => {
                            if (['stroke-play', 'stableford'].includes(name)) return s[property];
                            const holeSores = gameScores.map(({ score }) => score[i][property]);
                            if (holeSores.some(score => !score)) return null;
                            const winningScore = Math.min( ...holeSores );
                            if (holeSores.filter(score => score === winningScore).length === 1) {
                                if (s[property] === winningScore) return 1;
                                return -1;
                            };
                            return 0;
                        });
                        if (holeResults.some(result => result === null)) return null;
                        const holeResult = holeResults.reduce((sum, value) => sum += value, 0);
                        skins++;
                        if (name !== 'skins' || holeResult === 0) return holeResult;
                        const skinsWon = skins;
                        skins = 0;
                        if (holeResult > 0) return skinsWon;
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
                const score = points.reduce((sum, value) => sum += value, 0);
                if (gameComplete) {
                    if (score == 0) return 'Game halved';
                    return `${score > 0 ? nameOne : nameTwo} wins`;
                };
                if (score === 0) return 'All square';
                if (score > 0 && score > unplayedHoles) return `${nameOne} wins (${score} & ${unplayedHoles})`;
                if (Math.abs(score) > 0 && Math.abs(score) > unplayedHoles) return `${nameTwo} wins (${Math.abs(score)} & ${unplayedHoles})`;
                return `${score > 0 ? nameOne : nameTwo} ${Math.abs(score)} up`;
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
            if (game.scores.length === 1) {
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
                    return `${id} (${total})`;
                }).join(', ');
                return string.replaceLastInstance();
            }).join('; ');
        }());
    };
    return games;
};

async function calculateHandicaps(dateFrom, playerId) {
    const player = await User.findById(playerId);
    const rounds = await Round.find({ 'date': { $gte: dateFrom }, 'scores.player': playerId }).populate('course').sort('date');
    player.handicap = {
        handicaps: player.handicap.handicaps.filter(({ date }) => !date || date < dateFrom),
        scoreDifferentials: player.handicap.scoreDifferentials.filter(({ date }) => !date || date < dateFrom)
    };
    if (player.handicap.handicaps.length === 0) player.handicap.handicaps = [{ value: 54.0 }]
    for (const round of rounds) {

        // still getting tee for historical purposes
        const { course, date, scores, tee: roundTee } = round;

        const { roundType, shots, tee: scoreTee } = scores.find(({ player }) => player.toString() === playerId.toString());
        if (roundType === 'practice') continue;

        // remove 9 holes by default
        if (roundType !== 'full') continue;

        const tee = scoreTee || roundTee;
        const handicap = player.handicap.current;
        const roundAdjustedHandicap = handicap / (1 + +(roundType !== 'full'))
        const { holes, ratings } = course.tees.find(({ id }) => tee.toString() === id.toString());
        if (!ratings.course[roundType] || !ratings.slope[roundType]) continue;
        const { holesWithAShot, shotsPerHole } = handicapShots(roundAdjustedHandicap);
        const { end, start } = ROUND_TYPES.find(({ id }) => id === roundType);
        const adjustedGrossScore = holes
            .slice(start, end)
            .sort((a, b) => a.strokeIndex - b.strokeIndex)
            .map(({ index, par }, strokeIndex) => {
                const shot = shots[index - 1];
                const nettDoubleBogey = par + 2 + shotsPerHole + +((strokeIndex + 1) < holesWithAShot);
                return shot > nettDoubleBogey ? nettDoubleBogey : shot;
            })
            .reduce((sum, value) => sum += value, 0);
        const assumedGrossScore = holes
            .slice((start + 9) % 18, end % 18 + 9)
            .sort((a, b) => a.strokeIndex - b.strokeIndex)
            .map(({ par }, strokeIndex) => (par + shotsPerHole + +((strokeIndex + 10) < holesWithAShot)))
            .reduce((sum, value) => sum += value, 0);
        const assumedScoreDifferential = roundType === 'full' ? 0 : assumedGrossScore + 1 - ratings.course[['back', 'front'].find(value => value !== roundType)];
        const scoreDifferential = +(((adjustedGrossScore - ratings.course[roundType]) * 113 / ratings.slope[roundType] + assumedScoreDifferential).toFixed(1));
        player.handicap.scoreDifferentials.push({ date, value: scoreDifferential });

        // 5.9: Submission of an Exceptional Score
        if (handicap < 54) {
            const difference = handicap - scoreDifferential;
            if (difference >= 7) {
                player.handicap.scoreDifferentials = player.handicap.scoreDifferentials
                    .sort((a, b) => a.date - b.date)
                    .slice(0, 20)
                    .map(differential => {
                        const value = 1 + +(difference >= 10);
                        differential.exceptions.push({ date, value });
                        differential.value = differential.value - value;
                        return differential;
                    });
            };
        };

        const newHandicap = (function() {
            const { scoreDifferentials } = player.handicap;
            const sortedScoreDifferentials = scoreDifferentials
                .sort((a, b) => b.date - a.date)
                .slice(0, 20)
                .map(({ value }) => value)
                .sort((a, b) => a - b);
            const differentials = sortedScoreDifferentials.length;
            const adjustment = differentials === 3 ? 2 : ([4, 6].indexOf(differentials) !== -1 ? 1 : 0);
            if (differentials < 3) return 54;
            if (differentials < 6) return Math.min(sortedScoreDifferentials.slice(0, 1)) - adjustment;
            const length = (function() {
                if (differentials < 9) return 2;
                if (differentials < 12) return 3;
                if (differentials < 15) return 4;
                if (differentials < 17) return 5;
                if (differentials < 19) return 6;
                if (differentials < 20) return 7;
                return 8;
            })();
            const handicap = sortedScoreDifferentials.slice(0, length).reduce((sum, value) => sum += +value, 0) / length - adjustment;

            // 5.8: Limit on Upward Movement of a Handicap Index
            const acceptableScores = scoreDifferentials.filter(({ date }) => date >= (dateFrom - 365));
            if (acceptableScores.length < 20) return handicap;
            const lowHandicapIndex = Math.min( ...acceptableScores.map(({ value }) => value) );
            const difference = handicap - lowHandicapIndex;
            if (difference <= 3) return handicap;
            return handicap + (difference >= 10 ? 5 : difference * 0.5);

        })().singleDecimal();
        if (newHandicap !== handicap) player.handicap.handicaps.push({ date, value: newHandicap });
    };
    await player.save();
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
    if (par == 0) return 'f-level';
    return null;
};

function parScoreClass(parScore) {
    if (parScore < -1) return 'eagle';
    if (parScore === -1) return 'birdie';
    if (parScore === 1) return 'bogey';
    if (parScore > 1) return 'double-bogey';
    if (parScore === 0) return 'par';
    return null;
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
    const players = await User.findPlayers();
    const { tees = [] } = await Course.findById(courseId);
    const tee = tees.find(({ _id}) => _id == teeId);
    for (const score of this.scores) {
        const { shotsPerHole, holesWithAShot } = handicapShots(score.handicap);
        const { holes = [] } = tees && tees.find(({ _id}) => _id == score.tee) || tee;
        score.roundType === score.roundType || 'practice';
        for (const roundType of ROUND_TYPES) {
            const { id, start, end } = roundType;
            if (score.shots.slice(start, end).every(shot => shot !== 0)) {
                score.roundType = id;
                break;
            };
        };
        score.scores = {
            nett: [],
            par: { front: null, back: null, full: null, shots: [] },
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
    this.games = calculateGames(tees, games, players, scores, tee);
    next();
});

RoundSchema.post('save', async function(document) {
    const { date, scores } = document;
    for (const score of scores) {
        await calculateHandicaps(date, stringifyId(score.player));
    };
});

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
        const value = par[key];
        classesObject[key] = value instanceof Array ? value.map(v => parScoreClass(v)) : parClass(value);
    };
    return { par: classesObject };
});

const Round = mongoose.model('Round', RoundSchema);

module.exports = Round;