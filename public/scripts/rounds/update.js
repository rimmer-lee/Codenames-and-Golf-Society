// shared with models/round.js
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

function getRound() {
    if (!window.localStorage.getItem('round')) updateData();
    return JSON.parse(window.localStorage.getItem('round'));
};

function getPlayerKeys(object = getRound()) {
    return Object.keys(object).filter(key => /^(?:marker$|player\-)/.test(key));
};

function getTee() {
    const { course } = getRound();
    const teeObject = { name: '', holes: [] };
    if (!course || course.id === 'new') return teeObject;
    const { tee, tees } = course;
    const lowerTee = tee.toLowerCase();
    const chosenTee = tees[lowerTee];
    teeObject.name = lowerTee;
    for (const index of Object.keys(chosenTee)) {
        const { distance, par, strokeIndex } = chosenTee[index];
        teeObject.holes.push({ distance, index, par, strokeIndex });
    };
    return teeObject;
};

// shared with models/round.js
function parScoreClass(parScore) {
    if (parScore < -1) return 'eagle';
    if (parScore === -1) return 'birdie';
    if (parScore === 1) return 'bogey';
    if (parScore > 1) return 'double-bogey';
    return '';
};

function sortCourses() {
    const courseSelect = document.getElementById('course-select');
    const { value: selectedValue } = courseSelect.querySelector('[selected]');
    const courseOptions = Array.from(courseSelect.children).filter(({ value }) => !/(?:new|select\scourse)/i.test(value));
    for (const courseOption of courseOptions) courseOption.remove();
    courses = courses.sortAlphabetically('name');
    for (const course of courses) {
        courseSelect.insertBefore(
            createOption(course.name, [{ id: 'value', value: course.id || `randa-${course.randa}` }]),
            courseSelect.querySelector('[value="new"]')
        );
    };
    (courseSelect.querySelector(`[value="${selectedValue}"]`) || courseSelect.children[0]).setAttribute('selected', true);
};

function sortPlayers() {
    players = players.sortAlphabetically('name.knownAs');
};

function updateCourse() {
    const round = getRound();
    if (!/^randa-/.test(((round || {}).course || {}).id)) return;
    if (!round.course.hole) return;
    const holes = round.course.hole;
    for (const index of Object.keys(holes)) {
        const hole = holes[index];
        for (const teeName of Object.keys(hole)) {
            const tee = hole[teeName];
            for (const property of Object.keys(tee)) {
                const element = document.querySelector(`[name="[course][tees][${teeName}][${index}][${property}]"]`);
                if (element) element.value = tee[property];
            };
        };
    };
};

function updateData() {
    // https://stackoverflow.com/questions/5484673/javascript-how-to-dynamically-create-nested-objects-using-object-names-given-by
    // cleaner solution - https://stackoverflow.com/questions/7640727/javascript-nested-objects-from-string
    function createNestedObject (base, element) {
        const pathArray = element.name.slice(0, -1).replace(/\[/g, '').split(']');
        const value = element.value;
        const lastValue = pathArray.pop();
        for (let i = 0; i < pathArray.length; i++) base = base[pathArray[i]] = base[pathArray[i]] || {};
        base = base[lastValue] = value;
        return base;
    };

    const round = {};
    for (const select of document.querySelectorAll('form select')) {
        const option = select.selectedOptions[0];
        if (option && !(/^select\s/i).test(option.innerText)) createNestedObject(round, select);
    };
    for (const input of document.querySelectorAll('form input:not([type="button"]):not([type="submit"]):not(.update-data-ignore)')) {
        if ((input.type === 'radio' || input.type === 'checkbox') && !input.checked) continue;
        createNestedObject(round, input);
    };
    window.localStorage.setItem('round', JSON.stringify(round));
    updateScores();
    updateGames();
};

function updateDemerits() {
    const round = getRound();
    if (!round) return;
    for (const player of getPlayerKeys()) {
        const demerits = round[player].demerit;
        if (!demerits) continue;
        for (const hole of Object.keys(demerits)) {
            const refinedHole = hole.replace(/'/g, '');
            const modal = document.getElementById(`demerit|${player}|${refinedHole}`);
            if (!modal) continue;
            updateDemeritButtons(player, refinedHole);
            Object.keys(demerits[hole]).forEach((demerit, index) => {
                addDemerit.call(modal);
                const rule = demerits[hole][demerit].rule;
                if (!rule) return;
                const select = document.getElementById(`demerit-${player}-${refinedHole}-rule-${index + 1}`);
                select.querySelector('[selected]').removeAttribute('selected');
                Array.from(select.children).find(option => option.value === rule).setAttribute('selected', true);
                updateDescription.call(select);
            });
        };
    };
};

function updateGames() {
    const round = getRound();
    if (!round) return;
    const gamesSummary = document.getElementById('games-summary');
    while (gamesSummary.children.length > 0) gamesSummary.children[0].remove();
    toggleGrandparentVisibility(gamesSummary, false);
    if (!round.game) return;
    const gameKeys = Object.keys(round.game).filter(index => Object.keys(round.game[index]).some(key => /^(?:marker$|player\-)/.test(key)));
    const course = courses.find(({ id }) => id === (round.course && round.course.id));
    const tee = getTee();
    const gamesObject = calculateGames({
        games: gameKeys.map(index => {
                const { handicap, method, name, round: roundType } = round.game[index];
                return {
                    handicap: handicap && handicap === 'on',
                    method,
                    name,
                    players: getPlayerKeys(round.game[index]).map(player => {
                        return {
                            player: { _id: round[player].id },
                            team: round.game[index][player].team
                        };
                    }),
                    roundType
                };
            }),
        scores: getPlayerKeys().map(key => {
                const { handicap, hole, id: _id } = round[key];
                const shots = Object.keys(hole).map(h => +hole[h]);
                return { handicap, player: { _id }, shots };
            })
    }, course, players, tee);
    gameKeys.forEach((gameKey, index) => {
        const { handicap, method, name, roundType, summary } = gamesObject.games[index];
        if (!summary) return;
        // const innerText = `Game ${gameKey.replace(/'/g, '')}: ${handicap ? 'Nett ' : ''}${method ? (method === 'Combined ' ? `${method} Score ` : `${method} Best `) : ''}${name}${roundType ? (roundType === 'full' ? ' for 18' : ` for ${roundType.capitalize()} 9`) : ''} - ${summary}`;
        const innerText = `Game ${gameKey.replace(/'/g, '')} - ${summary}`;
        toggleGrandparentVisibility(gamesSummary)
        gamesSummary.insertBefore(createElement({ type: 'h5', classList: ['col', 'mb-0'], innerText }), null);
    });
};

function updateParElement(player, par) {
    const parElement = document.getElementById(`${player}|par`);
    if (!parElement) return;
    parElement.innerText = par;
    parElement.classList.remove('f-over', 'f-under', 'f-level');
    if (par > 0) parElement.classList.add('f-over');
    else if (par < 0) parElement.classList.add('f-under');
    else parElement.classList.add('f-level');
};

function updateScores() {
    const round = getRound();
    if (!round) return;
    const teeName = getTee().name.toLowerCase();
    for (const player of getPlayerKeys()) {
        const { hole } = round[player] || {};
        if (!hole) continue;
        const totalElement = document.getElementById(`${player}|score`);
        let total = 0, par = 0;
        for (const index of Object.keys(hole)) {
            const score = hole[index];
            if (!score) continue;
            const scoreElement = document.querySelector(`[name="[${player}][hole][${index}]"]`);
            if (scoreElement) scoreElement.value = score;
            total += +score;
            if (!teeName) continue;
            const parValue = (document.getElementById(`${teeName}-${index}|par`) || {}).value;
            if (parValue) par += +score - +parValue;
        };
        if (totalElement) totalElement.innerText = total;
        updateParElement(player, par);
    };
};

document.addEventListener('DOMContentLoaded', function () {
    function updateSelect(id, value, callback) {
        const element = document.querySelector(`[id="${id}"]`);
        const chosenElement = Array.from(element.children).find(child => child.value === value);
        if (!chosenElement) return;
        const selectedElement = element.querySelector('[selected]');
        if (selectedElement) selectedElement.removeAttribute('selected');
        chosenElement.setAttribute('selected', true);
        if (callback) callback.call(element);
        if (element.hasAttribute('required')) validation.call(element);
    };
    const round = getRound();
    const playerKeys = getPlayerKeys(round);
    const gameIndexes = Object.keys(round.game || {});
    const localPlayers = JSON.parse(window.localStorage.getItem('players')) || [];
    let playerIndex = 0;
    while (localPlayers.length > 0 && playerIndex < localPlayers.length) {
        if (players.some(({ id }) => id === localPlayers[playerIndex].id)) localPlayers.splice(playerIndex, 1);
        else {
            players.push(localPlayers[playerIndex]);
            playerIndex++;
        };
    };
    sortPlayers();
    window.localStorage.setItem('players', JSON.stringify(localPlayers));
    if (round.course && round.course.id && !/^new/.test(round.course.id)) {
        updateSelect('course-select', round.course.id, selectCourse);
        if (round.course.tee) {
            const teeSelect = document.getElementById('tee-select');
            const chosenTee = Array.from(teeSelect.children).find(({ value }) => value === round.course.tee);
            if (chosenTee) {
                const selectedTee = teeSelect.querySelector('[selected]')
                if (selectedTee) selectedTee.removeAttribute('selected');
                chosenTee.setAttribute('selected', true);
                selectTee.call(teeSelect);
            };
        };
        for (const teeName of Object.keys(round.course.tees)) {
            const tee = round.course.tees[teeName];
            for (const hole of Object.keys(tee)) {
                for (const property of ['distance', 'par', 'strokeIndex']) {
                    const element = document.getElementById(`${teeName}-${hole}|${property}`);
                    if (element) element.value = tee[hole][property];
                };
            };
         };
    };
    if (round.round && round.round.date) document.getElementById('date').value = round.round.date;
    for (const player of playerKeys) {
        if (round[player].id === 'new') continue;
        const elementId = `${player}|id`;
        const { handicap, id } = round[player];
        if (!document.getElementById(elementId)) addPlayer.call(document.getElementById('add-player'));
        updateSelect(elementId, id, selectPlayer);
        if (handicap) document.getElementById(`${player}|handicap`).value = +handicap;
    };
    for (index of gameIndexes) {
        const game = `game-${index.replace(/'/g, '')}`;
        const selectId = `${game}|select`;
        if (!document.getElementById(selectId)) addGame.call(document.getElementById('play-game'));
        const gameObject = round.game[index];
        const { handicap, method, name, round: roundType } = gameObject;
        const gamePlayers = Object.keys(gameObject).filter(key => /^(?:marker$|player\-)/.test(key));
        const handicapElement = document.getElementById(`${game}|handicap`);
        const roundElement = document.getElementById(`${game}|round|${roundType}`);
        updateSelect(selectId, name, selectGame);
        if (handicapElement) handicapElement.checked = !!(handicap && handicap === 'on');
        if (roundElement) roundElement.checked = true;
        for (const gamePlayer of gamePlayers) {
            const playerParticipationElement = document.getElementById(`${game}|${gamePlayer}|participation`);
            if (!playerParticipationElement) continue;
            playerParticipationElement.checked = true;
            changeParticipation.call(playerParticipationElement);
        };
        for (const gamePlayer of gamePlayers) {
            const { team } = gameObject[gamePlayer];
            const playerTeamElement = document.getElementById(`${game}|${gamePlayer}|team-${team}`);
            if (!playerTeamElement) continue;
            playerTeamElement.checked = true;
            changeTeam.call(playerTeamElement);
        };
        if (method) updateSelect(`${game}|method`, method);
    };
    updateCourse();
    updateData();
});

document.getElementById('date').addEventListener('blur', updateData);