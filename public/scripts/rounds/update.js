function changeScores() {
    const player = this.id.split('|')[0];
    const holes = getRound()[player].hole;
    const tee = getTee();
    let total = 0, par = 0;
    for (const key of Object.keys(holes)) {
        const score = holes[key];
        total += +score;
        if (score > 0 && tee) par += +score - tee.holes[+key - 1].par;
    };
    document.getElementById(`${player}|score`).innerText = total;
    updateParElement(player, par);
};

function getRound() {
    return JSON.parse(window.localStorage.getItem('round'));
};

function getPlayerKeys() {
    return Object.keys(getRound()).filter(key => /^(?:marker$|player\-)/.test(key));
};

function getTee() {
    const courseId = document.getElementById('course-select').value;
    const course = courses.find(({ id, randa }) => id == courseId || `randa-${randa}` === courseId);
    if (!course) return undefined;
    const teeSelect = document.getElementById('tee-select');
    const teeOption = teeSelect.selectedOptions[0];
    return teeOption ? course.tees.find(({ name }) => name === teeOption.value) : undefined;
};

function sortCourses() {
    const courseSelect = document.getElementById('course-select');
    const { value: selectedValue } = courseSelect.querySelector('[selected]');
    const courseOptions = Array.from(courseSelect.children).filter(({ value }) => !/(?:new|select\scourse)/i.test(value));
    for (const courseOption of courseOptions) courseOption.remove();
    courses = courses.sort((a, b) => {
        const upperA = a.name.toUpperCase();
        const upperB = b.name.toUpperCase();
        if (upperA < upperB) return -1;
        if (upperA > upperB) return 1;
        return 0;
    });
    for (const course of courses) {
        courseSelect.insertBefore(
            createOption(course.name, [{ id: 'value', value: course.id || `randa-${course.randa}` }]),
            courseSelect.querySelector('[value="new"]')
        );
    };
    (courseSelect.querySelector(`[value="${selectedValue}"]`) || courseSelect.children[0]).setAttribute('selected', true);
};

function sortPlayers() {
    players = players.sort((a, b) => {
        const upperA = a.name.knownAs.toUpperCase();
        const upperB = b.name.knownAs.toUpperCase();
        if (upperA < upperB) return -1;
        if (upperA > upperB) return 1;
        return 0;
    });
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
    const tee = getTee();
    for (const player of getPlayerKeys()) {
        const currentPlayer = round[player];
        if (!currentPlayer || !currentPlayer.hole) continue;
        const totalElement = document.getElementById(`${player}|score`);
        let total = 0, par = 0;
        for (const index of Object.keys(currentPlayer.hole)) {
            const score = currentPlayer.hole[index];
            if (!score) continue;
            const scoreElement = document.querySelector(`[name="[${player}][hole][${index}]"]`);
            const parElement = document.getElementById(`${tee.name.toLowerCase()}-${index}|par`);
            total += +score;
            if (parElement) par += +score - +parElement.value;
            if (scoreElement) scoreElement.value = score;
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
    if (!window.localStorage.getItem('round')) updateData();
    const courseSelect = document.getElementById('course-select');
    const round = getRound();
    const playerKeys = getPlayerKeys();
    const gameIndexes = Object.keys(round.game || {});
    const localCourses = JSON.parse(window.localStorage.getItem('courses')) || [];
    const localPlayers = JSON.parse(window.localStorage.getItem('players')) || [];
    let courseIndex = 0;
    let playerIndex = 0;
    while (localCourses.length > 0 && courseIndex < localCourses.length) {
        if (courses.some(({ randa }) => randa == localCourses[courseIndex].randa)) localCourses.splice(courseIndex, 1);
        else {
            const course = localCourses[courseIndex];
            courseSelect.insertBefore(
                createOption(course.name, [{ id: 'value', value: `randa-${course.randa}` }]),
                courseSelect.querySelector('[value="new"]'));
            courses.push(course);
            courseIndex++;
        };
    };
    sortCourses();
    window.localStorage.setItem('courses', JSON.stringify(localCourses));
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
        const handicapElement = document.getElementById(`${game}|handicap`);
        const gameObject = round.game[index];
        const { handicap, method, name } = gameObject;
        const gamePlayers = Object.keys(gameObject).filter(key => /^(?:marker$|player\-)/.test(key));
        updateSelect(selectId, name, selectGame);
        if (handicapElement) handicapElement.checked = !!(handicap && handicap === 'on');
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

// for (const select of document.querySelectorAll('form select')) select.addEventListener('input', updateData);
// document.getElementById('date').addEventListener('input', updateData);
document.getElementById('date').addEventListener('blur', updateData);