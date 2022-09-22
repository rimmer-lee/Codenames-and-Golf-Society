const Demerit = require('../models/demerit');
const Drink = require('../models/drink');
const Round = require('../models/round');
const Title = require('../models/title');
const User = require('../models/user');

const { ACTIONS, NON_MEMBERS, ROUND_TYPES, TITLES } = require('../constants');
const { dates, years } = require('../utilities/seasons');

function isBetweenDates(year, value) {
    const { endDate, startDate } = dates(year);
    return value >= startDate && value <= endDate;
};

function isMember(role) {
    return !NON_MEMBERS.some(r => r === role);
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
        const { id: playerId } = req.params;
        const player = await User.findById(playerId);
        const De = await Demerit.find({ 'player': playerId }).populate('rule').populate('action.titles').sort({ 'when.date': -1, 'when.hole': -1, 'when.created': -1 });
        const Dr = await Drink.find({ 'player': playerId }).sort({ 'when.date': -1, 'when.hole': -1, 'when.created': -1 });
        const R = await Round.find({ 'scores.player': playerId }).populate('course').populate('scores.player').sort({ 'date': -1 });
        const headings = {
            demerits: {
                table: [
                    { heading: 'Date', path: 'date.date' },
                    { heading: 'Hole', path: 'hole' },
                    { heading: 'Demerits', path: 'demerits' },
                    { heading: 'Rule', path: 'rule.rule' },
                    { heading: 'Titles', path: 'titles.string' }
                ]
            },
            drinks: {
                table: [
                    { heading: 'Date', path: 'date.date' },
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
                    { heading: 'Date', path: 'date.date' },
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
                    date,
                    friendly: formattedDate.friendly,
                    weekday: date.weekday()
                },
                demerits,
                hole,
                rule: {
                    index,

                    // hard coded to first description for now
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
                    date,
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
                    const description = game.description || `${handicap ? 'Nett ' : ''}${method ? (method === 'Combined' ? `Combined Score ` : `${method} Ball `) : ''}${name}${!roundType || roundType === 'full' ? '' : ` (${roundType.capitalize()} 9)`}`;
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
                    date,
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

        res.render('players/view', { data, headings, player });
    } catch (error) {
        console.log(error);
        req.flash('error', 'Apologies, something went wrong.');
        return res.redirect('/players');
    };
};

module.exports = { show, view };