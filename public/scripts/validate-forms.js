(function () {
    'use strict';

    for (const required of Array.from(document.querySelectorAll('*:required'))) {
        required.addEventListener('change', validation);
        required.addEventListener('blur', validation);
    };

    for (const form of document.querySelectorAll('form.needs-validation')) {
        form.addEventListener('submit', e => {
            function invalid (element) {
                if (element.id === 'password') element.closest('.input-group').querySelector('.invalid-feedback').classList.add('d-block');
                element.classList.add('is-invalid');
                valid = false;
            };
            let valid = true;
            for (const required of Array.from(form.querySelectorAll('*:required'))) {
                if (!required.value) invalid(required);
                else required.classList.add('is-valid');
            };
            const passwordCheck = form.querySelector('#password-check');
            if (passwordCheck) {
                if (!passwordCheck.value) {
                    form.querySelector('.password-check-invalid-feedback').innerText = 'Please confirm your password.';
                    invalid(passwordCheck);
                } else if (passwordCheck.value !== form.querySelector('#new-password').value) {
                    form.querySelector('.password-check-invalid-feedback').innerText = 'Please ensure passwords match';
                    invalid(passwordCheck);
                } else passwordCheck.classList.add('is-valid');
            };
            if (!valid) {
                e.preventDefault();
                e.stopPropagation();
            };
        }, false);
    };

})();

function validation() {
    this.classList.remove('is-valid', 'is-invalid');
    if (this.id === 'password') this.closest('.input-group').querySelector('.invalid-feedback').classList.remove('d-block')
    if (!this.value) {
        this.classList.add('is-invalid');
        switch (this.id) {
            case 'password':
                this.closest('.input-group').querySelector('.invalid-feedback').classList.add('d-block');
                break;
            case 'new-password':
                this.closest('form').querySelector('#password-check').classList.remove('is-valid', 'is-invalid');
                break;
            case 'password-check':
                this.closest('form').querySelector('.password-check-invalid-feedback').innerText = 'Please confirm your password.';
                break;
        };
    } else if (this.id === 'password-check' && this.value !== this.closest('form').querySelector('#new-password').value) {
        this.classList.add('is-invalid');
        this.closest('form').querySelector('.password-check-invalid-feedback').innerText = 'Please ensure passwords match';
    } else {
        if (this.id === 'new-password' && this.closest('form').querySelector('#password-check').value) {
            if (this.value !== this.closest('form').querySelector('#password-check').value) {
                this.closest('form').querySelector('#password-check').classList.add('is-invalid');
                this.closest('form').querySelector('.password-check-invalid-feedback').innerText = 'Please ensure passwords match';
            } else this.closest('form').querySelector('#password-check').classList.add('is-valid');
        };
        this.classList.add('is-valid');
    };
};