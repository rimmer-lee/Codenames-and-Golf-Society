(function() {
    const showPasswordCheckbox = document.getElementById('show-password');
    if (showPasswordCheckbox) {
        showPasswordCheckbox.addEventListener('change', function() {
            const passwordElement = this.closest('form').querySelector('#password');
            const labelElement = this.parentElement.querySelector('label[for="show-password"]');
            this.classList.toggle('btn-outline-secondary');
            this.classList.toggle('btn-secondary');
            if (this.checked) {
                labelElement.innerText = 'Hide';
                passwordElement.type = 'text';
            } else {
                labelElement.innerText = 'Show';
                passwordElement.type = 'password';
            };
        });
    };
})()