String.prototype.replaceLastInstance = function(delimiter = ', ', replacementValue = ' and ') {
    const lastInstance = this.lastIndexOf(delimiter);
    if (lastInstance === -1) return this;
    return `${this.substring(0, lastInstance)}${replacementValue}${this.substring(lastInstance + delimiter.length)}`;
};

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
        const stablefordMultiplier = +(name === 'stableford' || scoring === 'stableford') * -2 + 1;
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
                    const { holes = [] } = course.tees && course.tees.find(({ id}) => id == tee) || defaultTee;
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
                            const holeSores = gameScores.map(({ score }) => score[i][property]);
                            if (holeSores.some(score => [null, undefined].includes(score))) return null;
                            if (name === 'stroke-play' || name === 'stableford') return s[property];
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
                        return `${currentScore > 0 ? nameOne : nameTwo} wins`;
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

// shared with models/round.js
function getName(id, players, teams) {
    const team = teams.find(team => team.id === id);
    if (!team) return players.find(player => stringifyId(player) === id)?.name?.knownAs || id;
    const { id: i, name } = team;
    if (i === name.toLowerCase()) return `Team ${name}`;
    return name;
};

// shared with models/round.js
function stringifyId(player) {
    return (player._id || player.id).toString();
};

// shared with models/round.js
function handicapShots(handicap = 54) {
    const rounded = Math.floor(handicap);
    return {
        shotsPerHole: Math.floor(rounded / 18),
        holesWithAShot: rounded % 18
    };
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
            const g = round.game[index];
            const { handicap, method, game, round: roundType, scoring, team = {} } = g;
            const players = getPlayerKeys(g).map(player => {
                return {
                    player: { _id: round[player].id },
                    team: g[player].team
                };
            });
            return {
                game,
                handicap,
                index,
                method,
                players,
                roundType,
                scoring,
                teams: Object.keys(team)
                    .filter(id => players.some(({ team }) => team === id))
                    .map(id => {
                        return { id, name: team[id] };
                    })
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
        const { index, summary } = game;
        if (!summary) return;
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
        const { id, tee, tees } = round.course;
        updateSelect('course-select', id, selectCourse);
        if (tee) {
            const teeSelect = document.getElementById('tee-select');
            const chosenTee = Array.from(teeSelect.children).find(({ value }) => value === tee);
            if (chosenTee) {
                const selectedTee = teeSelect.querySelector('[selected]')
                if (selectedTee) selectedTee.removeAttribute('selected');
                chosenTee.setAttribute('selected', true);
                selectTee.call(teeSelect);
            };
        };
        for (const teeId of Object.keys(tees)) {
            const tee = tees[teeId];
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
        const gameObject = round.game[index];
        const { handicap: { multiplier, type }, method, game: name, round: roundType, scoring, team = {} } = gameObject;
        if (!name) continue;
        const game = `game-${index.replace(/'/g, '')}`;
        const selectId = `${game}|game`;
        const gamePlayers = Object.keys(gameObject).filter(key => /^(?:marker$|player\-)/.test(key));
        if (!document.getElementById(selectId)) addGame.call(document.getElementById('play-game'));
        updateSelect(selectId, name, selectGame);
        const handicapAdjustmentElement = document.getElementById(`${game}|handicap-multiplier`);
        const handicapTypeElement = document.getElementById(`${game}|handicap|type|${type}`);
        const roundElement = document.getElementById(`${game}|round|${roundType}`);
        const scoringElement = document.getElementById(`${game}|scoring|${scoring}`);
        if (roundElement) roundElement.checked = true;
        if (scoringElement) {
            scoringElement.checked = true;
            changeScoringType.call(scoringElement);
        };
        if (multiplier && handicapAdjustmentElement) {
            handicapAdjustmentElement.value = Number.parseFloat(multiplier).toFixed(2);
            updateGameOptionDescription.call(handicapAdjustmentElement);
        };
        if (handicapTypeElement) {
            handicapTypeElement.checked = true;
            updateGameOptionDescription.call(handicapTypeElement);
        };
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
        for (const key of Object.keys(team)) {
            for (const element of document.querySelectorAll(`[id^="${game}|"][id$="|team-${key}|name"]`)) {
                element.value = team[key];
            };
        };
        if (method) updateSelect(`${game}|method`, method, updateGameOptionDescription);
    };
    updateData();
});

document.getElementById('date').addEventListener('blur', updateData);