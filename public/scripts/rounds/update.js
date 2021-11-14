function changeScores() {
    const player = this.id.split('|')[0];
    const holes = JSON.parse(window.localStorage.getItem('round'))[player].hole;
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

function getTee() {
    const courseId = document.getElementById('course-select').value;
    const course = courses.find(({ _id }) => _id == courseId);
    if (!course) return undefined;
    const teeSelect = document.getElementById('tee-select');    
    const teeOption = teeSelect.selectedOptions[0];
    return teeOption ? course.tees.find(({ colour }) => colour === teeOption.value) : undefined;
};

function updateData() {
    updateScores();

    // https://stackoverflow.com/questions/5484673/javascript-how-to-dynamically-create-nested-objects-using-object-names-given-by
    // cleaner solution - https://stackoverflow.com/questions/7640727/javascript-nested-objects-from-string
    function createNestedObject (base, element) {
        const pathArray = element.name.slice(0, -1).replace(/\[/g, '').split(']');
        const value = element.value;
        const lastName = pathArray.pop();
        for (let i = 0; i < pathArray.length; i++) base = base[pathArray[i]] = base[pathArray[i]] || {};
        base = base[lastName] = value;
        return base;
    };
    
    const round = {};
    for (const select of document.querySelectorAll('form select')) {
        const option = select.selectedOptions[0];
        if (option && !(/^select\s/i).test(option.innerText)) createNestedObject(round, select);
    };
    for (const input of document.querySelectorAll('form input:not([type="radio"]):not([type="submit"])')) {
        createNestedObject(round, input)
    };
    for (const radio of document.querySelectorAll('form input[type="radio"]')) {
        if (radio.checked) createNestedObject(round, radio);
    };
    window.localStorage.setItem('round', JSON.stringify(round));
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
    const round = JSON.parse(window.localStorage.getItem('round'));
    if (!round) return;
    const tee = getTee();
    for (const player of ['marker', 'player-a', 'player-b', 'player-c']) {
        const currentPlayer = round[player];
        if (!currentPlayer || !currentPlayer.hole) continue;
        const totalElement = document.getElementById(`${player}|score`);
        let total = 0, par = 0;
        for (let i = 1; i < 19; i++) {
            const score = currentPlayer.hole[i];
            const scoreElement = document.querySelector(`[name="[${player}][hole][${i}]"]`);
            if (score) {
                total += +score;
                if (tee) par += +score - tee.holes[i - 1].par;
                if (scoreElement) scoreElement.value = score;
            };
        };
        if (totalElement) totalElement.innerText = total;
        updateParElement(player, par);
    };

    // need to handle demerits
};

document.addEventListener('DOMContentLoaded', function () {
    function updateSelect(id, property, callback) {
        const element = document.querySelector(`[id="${id}"]`);
        const selectedElement = element.querySelector('[selected]');
        if (selectedElement) selectedElement.removeAttribute('selected');
        Array.from(element.children).find(({ value }) => value === round[property].id).setAttribute('selected', true);
        if (callback) callback.call(element);
        if (element.hasAttribute('required')) validation.call(element);
    };
    let round = JSON.parse(window.localStorage.getItem('round'));
    if (!round) {
        updateData();
        round = JSON.parse(window.localStorage.getItem('round'));
    };
    if (round.course && round.course.id) {
        updateSelect('course-select', 'course', selectCourse);
        if (round.course.tee) {
            const teeSelect = document.getElementById('tee-select');
            const selectedTee = teeSelect.querySelector('[selected]')
            if (selectedTee) selectedTee.removeAttribute('selected');
            Array.from(teeSelect.children).find(({ value }) => value === round.course.tee).setAttribute('selected', true);
            selectTee.call(teeSelect);
        };
    };
    if (round.round && round.round.date) document.getElementById('date').value = round.round.date;
    for (const player of ['marker', 'player-a', 'player-b', 'player-c']) {
        if (round[player]) updateSelect(`${player}|id`, player, selectPlayer);
    };
    updateScores();
});

for (const select of document.querySelectorAll('form select')) select.addEventListener('input', updateData);
document.getElementById('date').addEventListener('input', updateData);
document.getElementById('date').addEventListener('blur', updateData);