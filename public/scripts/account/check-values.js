function checkValue() {
    const element = this;
    const { id, value, parentElement } = element;
    const feedback = parentElement.querySelector('.invalid-feedback > *');
    element.classList.remove('is-valid', 'is-invalid');
    if (value === user[id]) {
        element.removeEventListener('change', validation);
        return;
    };
    const xhttp = new XMLHttpRequest();
    element.setAttribute('required', true);
    element.addEventListener('change', validation);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const response = JSON.parse(this.responseText);
            if (!response.success) {
                element.classList.add('is-invalid');
                feedback.innerText = response.message;
            };
        };
    };
    xhttp.open('GET', `/account/check-values?${id}=${value}`, true);
    xhttp.send();

};

document.getElementById('username').addEventListener('change', checkValue);
document.getElementById('email').addEventListener('change', checkValue);