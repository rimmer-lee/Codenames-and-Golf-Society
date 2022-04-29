const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = require('./course');

const { GAMES, ROUND_TYPES } = require('../constants');

const formatDate = require('../utilities/formatDate');
const sort = require('../utilities/sort');

const options = { toJSON: { virtuals: true } };

const scoresObject = {
    front: Number,
    back: Number,
    full: Number
};

const ScoreSchema = new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    shots: [ Number ],
    scores: {
        nett: [ Number ],
        shots: scoresObject,
        par: scoresObject
    },
    roundType: {
        type: String,
        enum: ROUND_TYPES.map(({ name }) => name)
    },

    // can use handicap object from user model
    handicap: Number

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
            scores: [
                {
                    id: String,
                    points: [ Number ],
                    team: String,
                    totals: {
                        front: Number,
                        back: Number,
                        full: Number
                    }
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
    const course = await Course.findById(this.course);
    const { holes } = course.tees.find(({ _id}) => _id == this.tee);
    for (const score of this.scores) {
        const handicap = Math.floor(score.handicap || 54);
        const shotsPerHole = Math.floor(handicap / 18);
        const holesWithAShot = handicap % 18;
        // for (const roundType of ROUND_TYPES) {
        //     const { name, start, end } = roundType;
        //     if (score.shots.slice(start, end).every(shot => shot !== 0)) {
        //         score.roundType = name;
        //         break;
        //     };
        // };
        score.scores.shots = {
            front: score.shots.reduce((sum, value, index) => index < 9 ? sum + +value : sum, 0),
            back: score.shots.reduce((sum, value, index) => index > 8 ? sum + +value : sum, 0),
            full: score.shots.reduce((sum, value) => sum += value, 0)
        };
        score.scores.par = { front: 0, back: 0, full: 0 };
        score.scores.nett = [];
        if (holes) {
            for (const hole of holes) {
                const { index, par, strokeIndex } = hole;
                const shot = score.shots[index - 1];
                if (!shot) continue;
                const parScore = shot - par;
                const nettScore = shot - shotsPerHole - (holesWithAShot && strokeIndex <= holesWithAShot);
                if (index < 10) score.scores.par.front += parScore;
                if (index > 9) score.scores.par.back += parScore;
                score.scores.par.full += parScore;
                score.scores.nett.push(nettScore > (par + 2) ? par + 2 : nettScore);
            };
        };
    };
    for (const game of this.games) {
        const gameScores = game.players.map(p => {
            const { player, scores, shots } = this.scores.find(score => score.player._id.toString() === p.player._id.toString());
            return {
                player: player._id.toString(),
                scores,
                shots,
                team: p.team
            };
        });
        const { handicap: defaultHandicap, name } = GAMES.find(({ name }) => name === game.name);
        if (!defaultHandicap.adjustable) game.handicap = defaultHandicap.default;
        // move to a function in utilities?
        const { handicap, method } = game;
        game.team = gameScores.some(({ team }) => team && team !== 'none');
        game.scores = [];
        if (game.team) {
            const teams = [ ...new Set(gameScores.map(({ team }) => team)) ].map(team => {
                const playerScores = gameScores.filter(score => score.team === team)
                    .map(({ scores, shots }) =>  handicap ? scores.nett : shots);
                const teamScore = [];
                for (let i = 0; i < 18; i++) {
                    const holeScores = [];
                    let holeScore = 0;
                    for (const playerScore of playerScores) holeScores.push(playerScore[i]);
                    switch (method) {
                        case 'Best':
                            holeScore = Math.min( ...holeScores );
                            break;
                        case 'Combined':
                            holeScore = holeScores.reduce((sum, value) => sum += value, 0);
                            break;
                        case 'Worse':
                            holeScore = Math.max( ...holeScores  );
                            break;
                    };
                    teamScore.push(holeScore);
                };
                return { team, teamScore }
            });
            for (const team of teams) {
                const { teamScore, team: id } = team;
                let points = [];
                switch (name) {
                    case 'Match Play':
                        for (let i = 0; i < 18; i++) {
                            const scores = teams.map(({ teamScore }) => teamScore[i]);
                            const minScore = Math.min( ...scores );
                            let point = 0;
                            if (scores.filter(score => score === minScore).length === 1) {
                                if ((teamScore[i]) === minScore) point = 1;
                                else point = -1;
                            };
                            points.push(point);
                        };
                        break;
                    case 'Stroke Play':
                        points = teamScore;
                        break;
                };
                game.scores.push({
                    id: id.toUpperCase(),
                    points,
                    totals: {
                        front: points.reduce((sum, value, index) => index < 9 ? sum + +value : sum, 0),
                        back: points.reduce((sum, value, index) => index > 8 ? sum + +value : sum, 0),
                        full: points.reduce((sum, value) => sum += value, 0)
                    }
                });
            };
        } else {
            for (const score of gameScores) {
                const { player: id } = score;
                let points = [];
                switch (name) {
                    case 'Match Play':
                        for (let i = 0; i < 18; i++) {
                            const scores = gameScores.map(({ scores, shots }) => handicap ? scores.nett[i] : shots[i]);
                            const minScore = Math.min( ...scores );
                            let point = 0;
                            if (scores.filter(score => score === minScore).length === 1) {
                                if ((handicap ? score.scores.nett[i] : score.shots[i]) === minScore) point = 1;
                                else point = -1;
                            };
                            points.push(point);
                        };
                        break;
                    case 'Skins':
                        let skins = 0;
                        for (let i = 0; i < 18; i++) {
                            const scores = gameScores.map(({ scores, shots }) => handicap ? scores.nett[i] : shots[i]);
                            const minScore = Math.min( ...scores );
                            let point = 0;
                            skins++;
                            if (scores.filter(score => score === minScore).length === 1) {
                                if ((handicap ? score.scores.nett[i] : score.shots[i]) === minScore) point = skins;
                                skins = 0;
                            };
                            points.push(point);
                        };
                        break;
                    case 'Stableford':
                        for (const hole of holes) {
                            const { index, par } = hole;
                            let stablefordScore = 0;
                            if (score.scores.nett[index - 1]) stablefordScore = 2 - score.scores.nett[index - 1] + par;
                            points.push(stablefordScore < 0 ? 0 : stablefordScore);
                        };
                        break;
                    case 'Stroke Play':
                        points = handicap ? score.scores.nett : score.shots;
                        break;
                };
                game.scores.push({
                    id,
                    points,
                    totals: {
                        front: points.reduce((sum, value, index) => index < 9 ? sum + +value : sum, 0),
                        back: points.reduce((sum, value, index) => index > 8 ? sum + +value : sum, 0),
                        full: points.reduce((sum, value) => sum += value, 0)
                    }
                });
            };
        };
    };
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