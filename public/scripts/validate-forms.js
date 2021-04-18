(function () {
    'use strict'
    const forms = document.querySelectorAll('form.needs-validation');
    const required = document.querySelectorAll('*:required');
    for (const r of Array.from(required)) {
        r.addEventListener('change', function() {
            this.classList.remove('is-valid', 'is-invalid');
            if (!this.value) this.classList.add('is-invalid');
            else this.classList.add('is-valid');
        });
    };
    Array.from(forms)
        .forEach(form => {
            form.addEventListener('submit', e => {
                let valid = true;
                for (const r of Array.from(required)) {
                    if (!r.value) {
                        r.classList.add('is-invalid');
                        valid = false;
                    } else r.classList.add('is-valid');
                };
                if (!valid) {
                    e.preventDefault();
                    e.stopPropagation();
                };
            }, false)
        });
})();