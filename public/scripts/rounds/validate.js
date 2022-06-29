function addInput(form, name, value) {
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
                addInput(form, `[${player.id}][${property}]`, player[property].full || player[property]);
            };
        };
    }, { once: true });
};