function addInput(name, value) {
    form.appendChild(createElement({
        type: 'input',
        classList: ['d-none', 'update-data-ignore'],
        attributes: [
            { id: 'visibility', value: 'hidden' },
            { id: 'name', value: name },
            { id: 'value', value }
        ]
    }));
};
function invalid (element) {
    element.classList.add('is-invalid');
    return false;
};

function resetValidation() {
    this.classList.remove('is-valid', 'is-invalid');
};

function validation() {
    resetValidation.call(this);
    if (this.value && !/select/i.test(this.value)) {
        this.classList.add('is-valid');
        return true;
    };
    this.classList.add('is-invalid');
    return false;
};

for (const required of document.querySelectorAll('*:required')) {
    required.addEventListener('change', validation);
    required.addEventListener('blur', validation);
};

for (const form of document.querySelectorAll('form.needs-validation')) {
    form.addEventListener('submit', e => {
        const invalidElements = [];
        let valid = true;
        for (const required of form.querySelectorAll('*:required')) {
            if (required.value && !/(?:select|new)/i.test(required.value)) {
                required.classList.add('is-valid');
                continue;
            };
            invalidElements.push(required);
            valid = invalid(required);
        };
        if (!valid) {
            e.preventDefault();
            e.stopPropagation();
            return;
        };
        for (const player of JSON.parse(window.localStorage.getItem('players')) || []) {
            for (const property of ['name', 'handicap']) {
                addInput(`[${player.id}][${property}]`, player[property].full || player[property]);
            };
        };
        for (const course of JSON.parse(window.localStorage.getItem('courses')) || []) {
            for (const property of ['name', 'randa']) addInput(`[randa-${course.randa}][${property}]`, course[property]);
            for (const property of ['domain', 'path']) addInput(`[randa-${course.randa}][scorecardUrl][${property}]`, course.scorecardUrl[property]);
            for (const tee of course.tees) {
                const teeName = `${tee.name}${course.tees.filter(({ name }) => name === tee.name).length > 1 ? `-${tee.gender}` : ''}`;
                addInput(`[randa-${course.randa}][tees][${teeName}][gender]`, tee.gender);
                for (const hole of tee.holes) {
                    for (const property of ['distance', 'par', 'strokeIndex']) {
                        addInput(`[randa-${course.randa}][tees][${teeName}][${+hole.index}][${property}]`, hole[property]);
                    };
                };
            };
        };
    }, { once: true });
};