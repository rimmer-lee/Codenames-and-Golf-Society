(function () {
    'use strict';

    const passwordCheckElement = document.getElementById('password-check');
    if (passwordCheckElement) {
        passwordCheckElement.addEventListener('change', function() {
            const formElement = this.closest('form');
            const invalidFeedbackElement = formElement.querySelector('.password-check-invalid-feedback');
            const passwordElement = formElement.querySelector('#password');
            this.classList.remove('is-valid', 'is-invalid');
            if (!this.value) {
                this.classList.add('is-invalid');
                invalidFeedbackElement.innerText = 'Please confirm your password.';
            } else if (this.value !== passwordElement.value) {
                this.classList.add('is-invalid');
                invalidFeedbackElement.innerText = 'Please ensure passwords match';
            } else this.classList.add('is-valid');
        });
    };

    for (const required of Array.from(document.querySelectorAll('*:required'))) required.addEventListener('change', validation);

    for (const form of document.querySelectorAll('form.needs-validation')) {
        form.addEventListener('submit', e => {
            let valid = true;
            for (const required of Array.from(form.querySelectorAll('*:required'))) {
                if (!required.value) {
                    required.classList.add('is-invalid');
                    valid = false;
                } else required.classList.add('is-valid');
            };
            if (e.target.querySelector('#password').required) {
                const passwordCheck = form.querySelector('#password-check');
                if (passwordCheck) {
                    if (!passwordCheck.value) {
                        passwordCheck.classList.add('is-invalid')
                        valid = false;
                    } else if (passwordCheck.value !== form.getElementById('password').value) {
                        passwordCheck.classList.add('is-invalid')
                        valid = false;
                    } else passwordCheck.classList.add('is-valid');
                };
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
    if (!this.value) this.classList.add('is-invalid');
    else this.classList.add('is-valid');
};