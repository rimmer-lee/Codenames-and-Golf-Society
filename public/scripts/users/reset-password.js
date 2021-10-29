(function() {
    function resetPassword() {
        const element = this;
        const id = this.id.split('|')[0];
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const response = JSON.parse(this.responseText) 
                if (response.success) {
                    element.setAttribute('disabled', true);
                    element.classList.remove('btn-success');
                    element.classList.add('btn-secondary');
                };
            };
        };
        xhttp.open('POST', '/users/reset-password', true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(`id=${id}`);
    };
    for (const reset of document.querySelectorAll('input[type="button"][id$="|reset"')) reset.addEventListener('click', resetPassword);
})();