const Demerit = require('../models/demerit');
const Drink = require('../models/drink');
const Round = require('../models/round');
const Title = require('../models/title');
const User = require('../models/user');

const { ACTIONS, ROUND_TYPES, TITLES } = require('../constants');

async function show (req, res) {
    const demerits = await Demerit.find().populate('action.titles');
    const drinks = await Drink.find();
    const players = await User.findPlayers();
    const rounds = await Round.find().populate('scores.player');
    const allTitles = await Title.find().sort({ 'when.date': -1, 'when.hole': -1, 'when.created': -1 });
    const titles = TITLES.map(({ icon, value }) => ({ icon, value }));
    const award = ACTIONS.find(({ method }) => method === 'award');
    for (const player of players) {
        const playerDemerits = demerits.filter(demerit => String(demerit.player) === player.id);
        player.demerits = playerDemerits.reduce((sum, demerit) => sum += demerit.action.demerits, 0);
        player.drinks = drinks.filter(drink => String(drink.player) === player.id).reduce((sum, drink) => sum += drink.value, 0);
        player.rounds = rounds.filter(({ scores }) => scores.some(score => score.player.id === player.id)).length;
        player.titles = [];
    };
    for (const title of titles) {
        const filterTitles = allTitles.filter(({ name }) => name === title.value);
        if (!filterTitles) continue;
        for (const filterTitle of filterTitles) {
            if (filterTitle.method === 'award') {
                if (!filterTitles.filter(({ player }) => player == filterTitle.player).find(({ method }) => method === 'revoke')) {
                    const holder = players.find(({ id }) => filterTitle.player == id);
                    if (holder) holder.titles.push({ class: award.class, icon: title.icon, title: award.title, value: title.value });
                };
                break;
            };
        };
    };
    res.render('players/index', { players });
};

async function view (req, res) {

    req.flash('info', 'Apologies, age under construction')
    return res.redirect('/rounds');

    const { id: playerId } = req.params;
    const players = await User.findPlayers();
    const player = players.find(({ id }) => id === playerId);
    const playerDemerits = await Demerit.find({ 'player': playerId }).populate('rule').populate('action.titles').sort({ 'when.date': -1, 'when.hole': -1, 'when.created': -1 });
    const playerDrinks = await Drink.find({ 'player': playerId }).sort({ 'when.date': -1, 'when.hole': -1, 'when.created': -1 });
    const playerRounds = await Round.find({ 'scores.player': playerId }).populate('course').sort({ 'date': -1 });
    const demeritsByDay = [ ...new Set(playerDemerits.map(({ when }) => when.formattedDate.friendly)) ].map(date => {
        return {
            date,
            demerits: playerDemerits.filter(({ when }) => when.formattedDate.friendly === date)
                .reduce((sum, { action }) => sum + action.demerits, 0)
        };
    });
    const drinksByDay = [ ...new Set(playerDrinks.map(({ when }) => when.formattedDate.friendly)) ].map(date => {
        return {
            date,
            drinks: playerDrinks.filter(({ when }) => when.formattedDate.friendly === date)
                .reduce((sum, { value }) => sum + value, 0)
        };
    });

    const roundData = playerRounds.map(({ id, course, formattedDate: date, scores }) => {
        const { scores: roundScore } = (scores.find(({ player }) => player.toString() === playerId) || {});
        const playingPartners = scores.filter(({ player }) => player.toString() !== playerId);
        const par = `${parScore > 0 ? '+' : ''}${parScore}`;
        return { id, course: course.name, date, par: roundScore.par.full, score, class: parClass, playingPartners };
    }).filter(({ score }) => score !== 0);

    const scores = [ ...new Set(roundData.map(({ score }) => score)) ].map(score => {
        return {
            score,
            count: roundData.filter(round => round.score === score).length
        }
    });
    const pars = [ ...new Set(roundData.map(({ par, class: spanClass }) => ({ par, spanClass }))) ].map(({ par, spanClass }) => {
        return {
            par,
            class: spanClass,
            count: roundData.filter(round => round.par === par).length
        }
    });

    const favouriteCourses = [ ...new Set(roundData.map(({ course }) => course)) ].map(course => {
        return {
            course,
            count: roundData.filter(round => round.course === course).length
        };
    }).sort((a, b) => b.count - a.count);
    const favouriteCourse = favouriteCourses.filter(({ count }) => count === favouriteCourses[0].count);

    const favouritePlayers = players.filter(({ id }) => id !== playerId).map(({ id, name }) => ({ id, name, rounds: 0 }));
    for (const round of roundData) {
        for (const playingPartner of round.playingPartners) {
            favouritePlayers.find(({ id }) => id == playingPartner.player).rounds++;
        };
    };
    // why do we need the console log?
    console.log(favouritePlayers.sort((a, b) => b.rounds - a.rounds)[0].rounds)
    const favouritePlayer = favouritePlayers.filter(({ rounds }) => rounds === favouritePlayers.sort((a, b) => b.rounds - a.rounds)[0].rounds);

    const demerits = {
        mostRecent: playerDemerits.map(({ action, when }) => {
            const { demerits, titles } = action;
            return {
                date: when.formattedDate.friendly, demerits,
                titles: titles.map(({ method, name }) => {
                    const { icon } = TITLES.find(({ value }) => value === name);
                    const action = ACTIONS.find(action => action.method === method);
                    return { name, action: action.title, icon, class: action.class };
                })
            };
        }).slice(0, 3),
        mostCommon: [ ...new Set(playerDemerits.map(({ rule }) => rule)) ].map(rule => {
            return {
                rule,
                count: playerDemerits.filter(demerit => demerit.rule === rule).length
            };
        }).sort((a, b) => b.count - a.count)[0],
        biggest: demeritsByDay.sort((a, b) => b.demerits - a.demerits)[0],
        smallest: demeritsByDay.sort((a, b) => a.demerits - b.demerits)[0]
    };
    const drinks = {
        mostRecent: playerDrinks.slice(0, 3),
        biggest: drinksByDay.sort((a, b) => b.drinks - a.drinks)[0],
        smallest: drinksByDay.sort((a, b) => a.drinks - b.drinks)[0]
    };
    const rounds = {
        mostRecent: roundData.slice(0, 3),
        best: {
            shots: scores.sort((a, b) => b.score - a.score)[0],
            par: pars.sort((a, b) => b.par - a.par)[0]
        },
        worst: {
            shots: scores.sort((a, b) => a.score - b.score)[0],
            par: pars.sort((a, b) => a.par - b.par)[0]
        },
        favourite: {
            course: {
                plural: favouriteCourse.length > 1 ? 's' : '',
                string: favouriteCourse.map(({ course }) => course).join(', ').replace(/,([^,]*)$/, ' and' + '$1'),
                count: favouriteCourse[0].count
            },
            partner: {
                plural: favouritePlayer.length > 1 ? 's' : '',
                string: favouritePlayer.map(({ name }) => name.friendly).join(', ').replace(/,([^,]*)$/, ' and' + '$1'),
                count: favouritePlayer[0].rounds
            },
            teammate: {
                plural: '',
                string: '',
                count: 0
            }
        }
    };


    // const handicapDifferentials = [];
    // const { starting } = player.handicap;
    // player.handicap.progression = [{ handicap: starting ? starting : 54.0 }];
    // for (const round of playerRounds) {
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


    res.render('players/view', { demerits, drinks, player, rounds });
};

module.exports = { show, view };