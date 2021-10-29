(function() {
    const showPasswordButton = document.getElementById('show-password');
    if (showPasswordButton) {
        showPasswordButton.addEventListener('click', function() {
            const passwordElement = this.parentElement.querySelector('#password');
            this.classList.toggle('btn-outline-secondary');
            this.classList.toggle('btn-secondary');
            if (this.innerText === 'Show') {
                this.innerText = 'Hide';
                passwordElement.type = 'text';
            } else if (this.innerText === 'Hide') {
                this.innerText = 'Show';
                passwordElement.type = 'password';
            };
        });
    };
})()