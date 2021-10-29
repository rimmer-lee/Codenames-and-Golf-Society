function resetValidation() {
    this.classList.remove('is-valid', 'is-invalid');
};

function validation() {
    resetValidation.call(this);
    if (this.value && !/select/i.test(this.value)) return this.classList.add('is-valid');
    if (!this.value || /select/i.test(this.value)) return this.classList.add('is-invalid');
};

for (const required of document.querySelectorAll('*:required')) {
    required.addEventListener('change', validation);
    required.addEventListener('blur', validation);
};

for (const form of document.querySelectorAll('form.needs-validation')) {
    form.addEventListener('submit', e => {
        function invalid (element) {
            element.classList.add('is-invalid');
            valid = false;
        };
        let valid = true;
        for (const required of form.querySelectorAll('*:required')) {
            if (required.value && !/select/i.test(required.value)) required.classList.add('is-valid');
            if (!required.value || /select/i.test(required.value)) invalid(required);
        };
        if (!valid) {
            e.preventDefault();
            e.stopPropagation();
        } // else window.localStorage.removeItem('round');
    }, false);
};