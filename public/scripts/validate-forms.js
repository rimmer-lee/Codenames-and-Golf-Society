(function () {
    'use strict';
    for (const required of Array.from(document.querySelectorAll('*:required'))) {
        required.addEventListener('change', validation);
    };
    for (const form of document.querySelectorAll('form.needs-validation')) {
        form.addEventListener('submit', e => {
            let valid = true;
            for (const required of Array.from(document.querySelectorAll('*:required'))) {
                if (!required.value) {
                    required.classList.add('is-invalid');
                    valid = false;
                } else required.classList.add('is-valid');
            };
            if (!valid) {
                e.preventDefault();
                e.stopPropagation();
            };
        }, false)
    };
})();

function validation() {
    this.classList.remove('is-valid', 'is-invalid');
    if (!this.value) this.classList.add('is-invalid');
    else this.classList.add('is-valid');
};