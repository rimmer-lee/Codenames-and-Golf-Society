String.prototype.replaceLastInstance = function(delimiter = ', ', replacementValue = ' and ') {
    const lastInstance = this.lastIndexOf(delimiter);
    if (lastInstance === -1) return this;
    return `${this.substring(0, lastInstance)}${replacementValue}${this.substring(lastInstance + delimiter.length)}`;
};

// shared with models/round.js
function calculateGames(course = { tees: [] }, games = [],  players = [], scores = [], defaultTee = { holes: [] }) {
    for (const game of games) {
        const { handicap: defaultHandicap, name, players: defaultPlayersObject } = GAMES.find(({ name }) => name === game.name);
        // if (!defaultHandicap.adjustable) game.handicap = defaultHandicap.default;
        const { handicap, method, players: gamePlayers, roundType = 'full', scoring } = game;
        game.description = '';
        game.scores = [];
        game.summary = '';
        game.team = gamePlayers.some(({ team }) => team && team !== 'none');
        if ((game.team ? [ ...new Set(gamePlayers.map(({ team }) => team)) ].length : gamePlayers.length) < defaultPlayersObject.minimum) continue;
        const { end, start } = ROUND_TYPES.find(({ name }) => name === roundType);
        const handicapAdjustment = (function() {
            if (handicap === 'competition') return Math.min(
                    ...scores.filter(({ player }) => {
                        return gamePlayers.some(gamePlayer => player._id.toString() === gamePlayer.player._id.toString());
                    }).map(({ handicap }) => +handicap)
                );
            return 0;
        })();
        const gameScores = (function() {
            const gameScores = gamePlayers.map(p => {
                const { player, team } = p;
                const id = player._id.toString();
                const scoreObject = scores.find(({ player }) => player._id.toString() === id);

                // move to separate function for use in calculating score values???
                const score = (function() {
                    if (handicap === 'none') return scoreObject.shots;
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
                })().slice(start, end);

                return { id, score, team };
            });
            if (!game.team) return gameScores;
            return [ ...new Set(gameScores.map(({ team }) => team)) ].map(id => {
                const playerScores = gameScores.filter(score => score.team === id).map(({ score }) => score);
                const players = playerScores.length;
                const score = Array.from({ length: (end - start) }).map((a, i) => {
                    const holeScores = playerScores.map(score => score[i]).flat();
                    if (players !== holeScores.length) return null;
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
            const gameComplete = !game.scores.some(({ points }) => points.some(point => point === null));
            if (name === 'Match Play') {
                const { id, points } = game.scores[0];
                const nameOne = getName(id, players, game.team);
                const nameTwo = getName(game.scores[1].id, players, game.team);
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
                    if (index === 0) return `${id} ${allSquare ? 'tied' : `${gameComplete ? 'win' : 'lead'}${equalTotals.length === 1 ? 's' : ''}`} (${total})`;
                    return `${id} (${Math.abs(total)})`;
                }).join(', ');
                return string.replaceLastInstance();
            }).join('; ');
        }());
        game.description = `${handicap ? 'Nett ' : ''}${method ? (method === 'Combined' ? `Combined Score ` : `${method} Ball `) : ''}${name}${!roundType || roundType === 'full' ? '' : ` (${roundType.capitalize()} 9)`}`;
    };
    return games;
};

// shared with models/round.js
function getName(id, players, teamGame) {
    if (teamGame) return `Team ${id.length === 1 ? id.toUpperCase() : id}`;
    return (players.find(player => player.id == id) || { name: {} }).name.knownAs || id;
};

function getRound() {
    if (!window.localStorage.round) updateData();
    return JSON.parse(window.localStorage.round);
};

function getPlayerKeys(object = getRound()) {
    return Object.keys(object).filter(key => /^(?:marker$|player\-)/.test(key));
};

function getTee() {
    const { course } = getRound();
    const teeObject = { id: '', name: '', holes: [] };
    if (!course) return teeObject;
    const { id, tee, tees } = course;
    if (!tee || !tees) return teeObject;
    const chosenTee = tees[tee];
    teeObject.id = tee;
    teeObject.name = ((courses.find(course => course.id === id) || { tees: [] }).tees.find(({ id }) => id === tee) || {}).name;
    for (const index of Object.keys(chosenTee)) {
        const { distance, par, strokeIndex } = chosenTee[index];
        teeObject.holes.push({ distance, index, par, strokeIndex });
    };
    return teeObject;
};

// shared with models/round.js
function handicapShots(handicap = 54) {
    return {
        shotsPerHole: Math.floor(handicap / 18),
        holesWithAShot: handicap % 18
    };
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
    const holes = round.course && round.course.hole;
    if (!holes) return;
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
    window.localStorage.round = JSON.stringify(round);
    updateScores();
    updateGames();
};

function updateDemerits() {
    const round = getRound();
    if (!round) return;
    for (const player of getPlayerKeys(round)) {
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
    const course = courses.find(({ id }) => id === (round.course && round.course.id));
    const gamesArray = Object.keys(round.game)
        .filter(index => Object.keys(round.game[index])
        .some(key => /^(?:marker$|player\-)/.test(key)))
        .map(index => {
            const { handicap, method, name, round: roundType } = round.game[index];
            return {
                handicap: handicap && handicap === 'on' && 'standard' || 'none', // 'competition'
                index,
                method,
                name,
                players: getPlayerKeys(round.game[index]).map(player => {
                    return {
                        player: { _id: round[player].id },
                        team: round.game[index][player].team
                    };
                }),
                roundType,
                scoring: 'standard' // 'stableford'
            };
        });
    const scores = getPlayerKeys().map(key => {
        const { handicap, hole, id: _id, tee } = round[key];
        const shots = Object.keys(hole).map(h => +hole[h]);
        return { handicap, player: { _id }, shots, tee };
    });
    const tee = getTee();
    const games = calculateGames(course, gamesArray, players, scores, tee);
    for (const game of games) {
        const { handicap, index, method, name, roundType, summary } = game;
        if (!summary) return;
        // const innerText = `Game ${+index.replace(/'/g, '')}: ${handicap ? 'Nett ' : ''}${method ? (method === 'Combined ' ? `${method} Score ` : `${method} Best `) : ''}${name}${roundType ? (roundType === 'full' ? ' for 18' : ` for ${roundType.capitalize()} 9`) : ''} - ${summary}`;
        const innerText = `Game ${+index.replace(/'/g, '')} - ${summary}`;
        toggleGrandparentVisibility(gamesSummary);
        gamesSummary.insertBefore(createElement({ type: 'h5', classList: ['col', 'mb-0', 'text-center'], innerText }), null);
    };
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
    const tee = getTee().id;
    for (const player of getPlayerKeys()) {
        const { hole } = round[player] || {};
        if (!hole) continue;
        const totalElement = document.getElementById(`${player}|score`);
        let total = 0, par = 0;
        for (const index of Object.keys(hole)) {
            const score = hole[index];
            if (!score) continue;
            const scoreElement = document.getElementById(`${player}|hole-${index}`);
            if (scoreElement) scoreElement.value = score;
            total += +score;
            if (!tee) continue;
            const parValue = (document.getElementById(`${tee}-${index}|par`) || {}).value;
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
    const localPlayers = JSON.parse(window.localStorage.players || '[]');
    let playerIndex = 0;
    while (localPlayers.length > 0 && playerIndex < localPlayers.length) {
        if (players.some(({ id }) => id === localPlayers[playerIndex].id)) localPlayers.splice(playerIndex, 1);
        else {
            players.push(localPlayers[playerIndex]);
            playerIndex++;
        };
    };
    sortPlayers();
    window.localStorage.players = JSON.stringify(localPlayers);
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
        for (const teeId of Object.keys(round.course.tees)) {
            const tee = round.course.tees[teeId];
            for (const hole of Object.keys(tee)) {
                for (const property of ['distance', 'par', 'strokeIndex']) {
                    const element = document.getElementById(`${teeId}-${hole}|${property}`);
                    const value = +tee[hole][property];
                    if (element && value) element.value = value;
                };
            };
         };
    };
    if (round.round && round.round.date) document.getElementById('date').value = round.round.date;
    for (const player of playerKeys) {
        const { handicap, id } = round[player];
        if (id === 'new') continue;
        const elementId = `${player}|id`;
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