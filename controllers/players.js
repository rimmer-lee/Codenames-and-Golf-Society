const Demerit = require('../models/demerit');
const Drink = require('../models/drink');
const Round = require('../models/round');
const Title = require('../models/title');
const User = require('../models/user');

const { ACTIONS, NON_MEMBERS, ROUND_TYPES, TITLES } = require('../constants');
const { dates, years } = require('../utilities/seasons');

// function favouriteString(array, ascending = true) {
//     const orderedArray = array.sortBy(ascending, 'count');
//     const lead = orderedArray[0].count;
//     const favourites = orderedArray.filter(({ count }) => count === lead);
//     const string = ` - ${favourites.map(({ value }) => value).sortAlphabetically().join(', ').replaceLastInstance()} (${lead})`
//     if (favourites.length > 1) return `s${string}`;
//     return string;
// };

// function getBest(data = {}, path = '') {
//     return getData(data, path).sortBy(true, 'value')[0];
// };

// function getData(data = {}, path = '') {
//     const r = path.split('.').pop();
//     return [ ...new Set(data.filter(({ roundType }) => r === 'full' ? r === roundType : true)
//         .map(d => getProperty.call(d, path))) ]
//     .map(value => {
//         return {
//             value,
//             count: data.filter(d => getProperty.call(d, path) === value).length
//         }
//     });
// };

// function getFavourites(data = {}, path = '') {
//     const d = getData(data, path).sortBy(false, 'count');
//     const lead = d[0].count;
//     const favourites = d.filter(({ count }) => count === lead);
//     const courseString = ` - ${favourites.map(({ value }) => value).sortAlphabetically().join(', ').replaceLastInstance()} (${lead})`
//     if (favourites.length > 1) return `s${courseString}`;
//     return courseString;
// };

// shared with utilities/prototypes.js
// function getProperty(path) {
//     if (!path) return this;
//     let o = this;
//     for (const p of path.split('.')) o = o[p];
//     return o;
// };

function isBetweenDates(year, value) {
    const { endDate, startDate } = dates(year);
    return value >= startDate && value <= endDate;
};

function isMember(role) {
    return !NON_MEMBERS.some(r => r === role);
};

// function mostRecent(array = [], limit = 3) {
//     return array.slice(0, limit);
// };

// shared with models/round.js
function parClass(par) {
    if (par > 0) return 'f-over';
    if (par < 0) return 'f-under';
    return 'f-level';
};

async function show (req, res) {
    const DEMERITS = await Demerit.find().sort({ 'when.date': 1 }).populate('action.titles');
    const DRINKS = await Drink.find().sort({ 'when.date': 1 });
    const PLAYERS = await User.findPlayers();
    const ROUNDS = await Round.find().sort({ date: 1 });
    const ALL_TITLES = await Title.find().sort({ 'when.date': -1, 'when.hole': -1, 'when.created': -1 });
    const award = ACTIONS.find(({ method }) => method === 'award');
    const seasonYears = years();
    const titles = TITLES.map(({ icon, value }) => ({ icon, value }));
    const data = seasonYears.map(({ year }) => {
        const seasonDemerits = DEMERITS.filter(({ when }) => isBetweenDates(year, when.date));
        const seasonDrinks = DRINKS.filter(({ when }) => isBetweenDates(year, when.date));
        const seasonRounds = ROUNDS.filter(({ date }) => isBetweenDates(year, date));
        const seasonTitles = ALL_TITLES.filter(({ when }) => isBetweenDates(year, when.date));
        const titleHolders = titles.map(({ icon, value }) => {
            const filteredTitles = seasonTitles.filter(({ name }) => name === value);
            if (filteredTitles.length === 0) return { holder: undefined };
            for (const filteredTitle of filteredTitles) {
                if (filteredTitle.method === 'award') {
                    if (filteredTitles.some(({ method, player, when }) => method === 'revoke' &&
                        player == filteredTitle.player && when.date > filteredTitle.when.date)) continue;
                    return {
                        holder: filteredTitle.player,
                        title: { class: award.class, icon, method: award.title, value }
                    };
                };
            };
        });
        return {
            players: [ ...new Set([
                ...seasonDemerits.map(({ player }) => player.toString()),
                ...seasonDrinks.map(({ player }) => player.toString()),
                ...seasonRounds.map(({ scores }) => scores.map(({ player }) => player.toString())).flat()
            ]) ].map(playerId => {
                const { id, name, role } = PLAYERS.find(({ _id }) => _id == playerId);
                const drinks = seasonDrinks.filter(({ player }) => player == playerId).reduce((sum, { value }) => sum += value, 0);
                const infractions = seasonDemerits.filter(({ player }) => player == playerId).length;
                const playerRounds = seasonRounds.filter(({ scores }) => scores.some(({ player }) => player == playerId));
                const quorums = isMember(role) ? playerRounds.filter(({ scores }) => {
                    return scores.map(({ player }) => PLAYERS.find(({ _id }) => _id.toString() === player.toString()).role)
                        .filter(role => isMember(role)).length > 2
                }).length : 0;
                const rounds = playerRounds.length;
                const titles = titleHolders.filter(({ holder }) => holder == playerId).map(({ title: t }) => t);
                return { drinks, infractions, id, name, quorums, rounds, titles };
            }).sortAlphabetically('name.friendly'),
            year
        };
    });
    const players = data[0].players;
    res.render('players/index', { data, players, years: seasonYears });
};

async function view (req, res) {
    try {

        // req.flash('info', 'Apologies, page under construction')
        // return res.redirect('/players');

        const { id: playerId } = req.params;
        const player = await User.findById(playerId);
        const De = await Demerit.find({ 'player': playerId }).populate('rule').populate('action.titles').sort({ 'when.date': -1, 'when.hole': -1, 'when.created': -1 });
        const Dr = await Drink.find({ 'player': playerId }).sort({ 'when.date': -1, 'when.hole': -1, 'when.created': -1 });
        const R = await Round.find({ 'scores.player': playerId }).populate('course').populate('scores.player').sort({ 'date': -1 });
        const headings = {
            demerits: {
                table: [
                    { heading: 'Date', path: 'date.friendly' },
                    { heading: 'Hole', path: 'hole' },
                    { heading: 'Demerits', path: 'demerits' },
                    { heading: 'Rule', path: 'rule.rule' },
                    { heading: 'Titles', path: 'titles.string' }
                ]
            },
            drinks: {
                table: [
                    { heading: 'Date', path: 'date.friendly' },
                    { heading: 'Drinks', path: 'drinks' }
                ]
            },
            rounds: {
                performance: [
                    { heading: 'Eagles (or better)', value: 'eagle' },
                    { heading: 'Birdies', value: 'birdie' },
                    { heading: 'Pars', value: 'par' },
                    { heading: 'Bogeys', value: 'bogey' },
                    { heading: 'Double Bogeys (or worse)', value: 'double-bogey' }
                ],
                table: [
                    { heading: 'Date', path: 'date.friendly' },
                    { heading: 'Course', path: 'course.name' },
                    { heading: 'Shots', path: 'shots' },
                    { heading: 'Par', path: 'par.score' },
                    { heading: 'Eagles (or Better)', path: 'performance.eagle' },
                    { heading: 'Birdies', path: 'performance.birdie' },
                    { heading: 'Pars', path: 'performance.par' },
                    { heading: 'Bogeys', path: 'performance.bogey' },
                    { heading: 'Double Bogeys (or Worse)', path: 'performance.double-bogey' },
                    { heading: 'Players', path: 'players.string' },
                    { heading: 'Games', path: 'games.string' }
                ]
            }
        };
        const PARS = headings.rounds.performance.map(({ value }) => value);
        const demeritData = De.map(({ action, rule, when }) => {
            const { date, formattedDate, hole = 0 } = when.toJSON();
            const { demerits, titles: t } = action;
            const { description, index } = rule;
            const titles = t.map(({ name, method }) => {
                const { class: c, title: action } = ACTIONS.find(({ method: m }) => m === method);
                const { icon } = TITLES.find(({ value }) => value === name);
                return { action, class: c, name, icon };
            })
            return {
                date: {
                    friendly: formattedDate.friendly,
                    weekday: date.weekday()
                },
                demerits,
                hole,
                rule: {
                    index,

                    // hard code first description for now
                    rule: `${index}. ${encodeURI(description[0].replace(/'/g, '`'))}`

                },
                titles: {
                    titles,
                    string: titles.map(({ action, name }) => (`${action} ${name}`)).join(', ')
                }
            };
        });
        const drinkData = Dr.map(({ value: drinks, when}) => {
            const { date, formattedDate } = when;
            return {
                date: {
                    friendly: formattedDate.friendly,
                    weekday: date.weekday()
                },
                drinks
            };
        });
        const roundData = R.map(({ course, date, formattedDate, _id, games: g, scores }) => {
            const { friendly } = formattedDate;
            const games = g.filter(({ players }) => players.some(({ player }) => player.toString() === playerId)).map(game => {
                    const { handicap, method, name, roundType, summary } = game;
                    const description = `${handicap ? 'Nett ' : ''}${method ? (method === 'Combined' ? `Combined Score ` : `${method} Ball `) : ''}${name}${!roundType || roundType === 'full' ? '' : ` (${roundType.capitalize()} 9)`}`;
                    return { description, name, summary };
                }).sortAlphabetically('description');
            const players = scores.filter(({ player }) => player._id.toString() !== playerId).map(({ player }) => {
                const { id, name } = player;
                const { initials, knownAs } = name;
                return { id, initials, knownAs };
            });
            const score = scores.find(({ player }) => player._id.toString() === playerId);
            const performance = (function() {
                const performance = score.classes.par.shots.reduce((all, value) => {
                    if (value in all) all[value]++;
                    else all[value] = 1;
                    return all;
                }, {});
                for (const par of PARS) {
                    if (!performance[par]) performance[par] = 0;
                };
                return performance;
            })();
            return {
                _id,
                course: {
                    id: course.id,
                    name: course.name
                },
                date: {
                    friendly,
                    weekday: date.weekday()
                },
                games: {
                    games,
                    string: games.map(({ description }) => description).sortAlphabetically().join(', ')
                },
                handicap: score.handicap,
                par: {
                    class: score.classes.full,
                    score: score.scores.par.full
                },
                performance,
                players: {
                    players,
                    string: players.map(({ knownAs }) => knownAs).sortAlphabetically().join(', ')
                },
                playingGroup: score.playingGroup,
                round: score.roundType,
                shots: score.scores.shots.full
            };
        });
        const performance = (function() {
            const performance = {};
            for (const par of PARS) performance[par] = 0;
            for (const round of roundData) {
                for (const par of PARS) performance[par] += round.performance[par];
            };
            return performance;
        })();
        const data = {
            demerits: {
                all: demeritData,
                filters: []
            },
            drinks: {
                all: drinkData,
                filters: []
            },
            rounds: {
                all: roundData,
                filters: [],
                performance
            }
        };
        for (const key of Object.keys(data)) data[key].active = data[key].all.length > 0;

        // create some ranking rather than hard code this
        for (const key of ['rounds', 'demerits', 'drinks']) {
            const { active } = data[key];
            if (active) {
                data[key].selected = active;
                break;
            };
        };

        // const handicapDifferentials = [];
        // const { starting } = player.handicap;
        // player.handicap.progression = [{ handicap: starting ? starting : 54.0 }];
        // for (const round of R) {
        //     const { course, date, scores, tee } = round;
        //     const { holes, ratings } = course.tees.find(({ _id }) => _id.toString() === tee);
        //     const { roundType, shots } = scores.find(({ player }) => player == playerId);
        //     const adjustedShots = []
        //     let roundHandicap = player.handicap.progression[player.handicap.progression.length - 1].handicap;
        //     if (roundType === 'practice') continue;
        //     if (roundType !== 'full') roundHandicap = roundHandicap / 2;
        //     const { start, end } = ROUND_TYPES.find(({ name }) => name === roundType);
        //     const holesPlayed = end - start;
        //     let adjustment = 0;
        //     let differentials;
        //     roundHandicap = Math.floor(roundHandicap);
        //     holes.forEach((hole, holeIndex) => {
        //         if (holeIndex < start || holeIndex > end) return;
        //         const { par, strokeIndex } = hole;
        //         const handicapShots = Math.floor(roundHandicap / holesPlayed, 0) + +(strokeIndex < roundHandicap % holesPlayed);
        //         const shot = shots[holeIndex];
        //         const maxScore = par + handicapShots + 2;
        //         adjustedShots.push(shot > maxScore ? maxScore : shot);
        //     });
        //     handicapDifferentials.push(Math.round(10 * (adjustedShots.reduce((sum, value) => sum += value, 0) - ratings.course[roundType]) * 113 / ratings.slope[roundType]) / 10);

        //     // need to handle plus handicaps i.e. really good golfers

        //     if (handicapDifferentials.length < 3) continue;
        //     else if (handicapDifferentials.length < 6) differentials = 1;
        //     else if (handicapDifferentials.length < 9) differentials = 2;
        //     else if (handicapDifferentials.length < 12) differentials = 3;
        //     else if (handicapDifferentials.length < 15) differentials = 4;
        //     else if (handicapDifferentials.length < 17) differentials = 5;
        //     else if (handicapDifferentials.length < 19) differentials = 6;
        //     else if (handicapDifferentials.length < 20) differentials = 7;
        //     else differentials = 8;
        //     if ([4, 6].indexOf(handicapDifferentials.length) !== -1) adjustment = 1;
        //     else if (handicapDifferentials.length === 3) adjustment = 2;
        //     const handicap = handicapDifferentials.sort((a, b) => a - b).slice(0, differentials).reduce((sum, value) => sum += value, 0) / differentials - adjustment;
        //     player.handicap.progression.push({ date, handicap });
        // };
        // console.log(handicapDifferentials)
        // console.log(player.handicap)


        res.render('players/view', { data, headings, player });
    } catch (error) {
        console.log(error);
        req.flash('error', 'Apologies, something went wrong.');
        return res.redirect('/players');
    };
};

module.exports = { show, view };