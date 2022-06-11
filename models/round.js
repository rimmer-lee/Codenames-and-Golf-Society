const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = require('./course');
const User = require('./user');

const { GAMES, ROUND_TYPES } = require('../constants');

const formatDate = require('../utilities/formatDate');
// const sort = require('../utilities/sort');

// shared with public/scripts/rounds/update.js
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

function calculateGames(gameObject = {}, holes = [], players = []) {
    for (const score of gameObject.scores) {
        const handicap = Math.floor(score.handicap || 54);
        const shotsPerHole = Math.floor(handicap / 18);
        const holesWithAShot = handicap % 18;
        for (const roundType of ROUND_TYPES) {
            const { name, start, end } = roundType;
            if (score.shots.slice(start, end).every(shot => shot !== 0)) {
                score.roundType = name;
                break;
            };
        };
        score.scores = {
            nett: [],
            par: { front: 0, back: 0, full: 0 },
            shots: {
                front: score.shots.reduce((sum, value, index) => index < 9 ? sum + +value : sum, 0),
                back: score.shots.reduce((sum, value, index) => index > 8 ? sum + +value : sum, 0),
                full: score.shots.reduce((sum, value) => sum += value, 0)
            }
        };
        for (const hole of holes) {
            const { index, par, strokeIndex } = hole;
            const shot = +score.shots[index - 1];
            if (!shot) {
                score.scores.nett.push(null);
                continue;
            };
            const parScore = shot - par;
            const nettScore = shot ? (shot - shotsPerHole - (holesWithAShot && strokeIndex <= holesWithAShot)) : 0;
            if (index < 10) score.scores.par.front += parScore;
            if (index > 9) score.scores.par.back += parScore;
            score.scores.par.full += parScore;
            score.scores.nett.push(nettScore > (par + 2) ? par + 2 : nettScore);
        };
    };
    for (const game of gameObject.games) {
        const { handicap: defaultHandicap, name, players: defaultPlayersObject } = GAMES.find(({ name }) => name === game.name);
        if (!defaultHandicap.adjustable) game.handicap = defaultHandicap.default;
        const { handicap, method, players: gamePlayers, roundType } = game;
        game.team = gamePlayers.some(({ team }) => team && team !== 'none');
        if ((game.team ? [ ...new Set(gamePlayers.map(({ team }) => team)) ].length : gamePlayers.length) < defaultPlayersObject.minimum) continue;
        const { end, start } = ROUND_TYPES.find(({ name }) => name === roundType);
        const gameScores = (function() {
            const gameScores = gamePlayers.map(p => {
                const { player, scores, shots } = gameObject.scores.find(({ player }) => player._id.toString() === p.player._id.toString());
                return {
                    id: player._id.toString(),
                    score: (handicap ? scores.nett : shots).slice(start, end),
                    team: p.team
                };
            });
            if (!game.team) return gameScores;
            return [ ...new Set(gameScores.map(({ team: id }) => id)) ].map(id => {
                const playerScores = gameScores.filter(score => score.team === id).map(({ score }) => score);
                const score = [];
                for (let i = start; i < end; i++) {
                    score.push((function() {
                        const holeScores = playerScores.map(playerScore => playerScore[i]).filter(score => score);
                        if (holeScores.length === 0) return null;
                        switch (method) {
                            case 'Best':
                                return Math.min( ...holeScores );
                            case 'Combined':
                                return holeScores.reduce((sum, value) => sum += value, 0);
                            case 'Worse':
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
                if (name === 'Stroke Play') return score.map(s => s || null);
                if (name === 'Stableford') {
                    return score.map((s, i) => {
                        if (s === null) return null;
                        const { par } = holes[i + start];
                        const doubleBogey = 2 + +par;
                        if (s > doubleBogey) return 0;
                        return doubleBogey - s;
                    });
                };
                const matchPlay = name === 'Match Play';
                let skins = 0;
                return score.map((s, i) => {
                    const holeScores = gameScores.map(({ score }) => score[i])
                    const scores = holeScores.filter(score => score);
                    if (holeScores.length !== scores.length) return null;
                    const minScore = Math.min( ...scores );
                    skins++;
                    if (scores.filter(score => score === minScore).length === 1) {
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
                const nameOne = game.team ? `Team ${idOne.toUpperCase()}` : (players.find(player => player.id == idOne) || { name: {} }).name.knownAs || idOne;
                const nameTwo = game.team ? `Team ${idTwo.toUpperCase()}` : (players.find(player => player.id == idTwo) || { name: {} }).name.knownAs || idTwo;
                const lengthOfPoints = points.length;
                const holesToPlay = points.filter(point => point === null).length;
                let currentScore = 0;
                for (let i = 0; i < lengthOfPoints; i++) {
                    const point = points[i];
                    const remainingHoles = lengthOfPoints + holesToPlay - i - 1;
                    currentScore += point;
                    if (remainingHoles === 0) {
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


const options = { toJSON: { virtuals: true } };

const scoresObject = {
    front: Number,
    back: Number,
    full: Number
};

const ScoreSchema = new Schema({

    // can use handicap object from user model
    handicap: Number,

    player: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    playingGroup: {
        index: Number,
        player: String
    },
    roundType: {
        type: String,
        enum: ROUND_TYPES.map(({ name }) => name)
    },
    scores: {
        nett: [ Number ],
        shots: scoresObject,
        par: scoresObject
    },
    shots: [ Number ]
}, options);

const RoundSchema = new Schema({
    created: {
        date: {
            type: Date,
            default: Date.now(),
            required: true,
            immutable: true
        },
        by: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comments: String
    },
    lastModified: {
        date: {
            type: Date,
            default: Date.now(),
            required: true
        },
        by: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comments: String
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    tee: String,
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    games: [
        {
            handicap: Boolean,
            method: {
                type: String,
                enum: [ ...new Set(GAMES.map(({ options }) => options.map(({ values }) => values)).flat(2)) ]
            },
            name: {
                type: String,
                enum: GAMES.map(({ name }) => name)
            },
            players: [
                {
                    player: {
                        type: Schema.Types.ObjectId,
                        ref: 'User'
                    },
                    team: String
                }
            ],
            roundType: {
                type: String,
                enum: ROUND_TYPES.map(({ name }) => name)
            },
            scores: [
                {
                    id: String,
                    points: [ Number ],
                    team: String
                }
            ],
            summary: String,
            team: {
                type: Boolean,
                default: false
            }
        }
    ],
    scores: [ ScoreSchema ]
}, options);

RoundSchema.virtual('formattedDate').get(function () {
    const { date } = this;
    return {
        datePicker: formatDate.customDate('yyyy-mm-dd', date),
        friendly: formatDate.customDate('dd/mm/yyyy', date),
        full: formatDate.fullDate(date)
    };
});

ScoreSchema.virtual('parClass').get(function () {
    const { par = 0 } = this;
    if (par > 0) return 'f-over';
    if (par < 0) return 'f-under';
    return 'f-level';
});

RoundSchema.pre('save', async function(next) {
    const players = await User.find();
    const { course: courseId, games, scores, tee } = this;
    const course = await Course.findById(courseId);
    const { holes } = course.tees.find(({ _id}) => _id == tee);
    const gamesObject = calculateGames({ games, scores }, holes, players);
    this.games = gamesObject.games;
    this.scores = gamesObject.scores;
    this.lastModified.date = Date.now();
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

module.exports = mongoose.model('Round', RoundSchema);