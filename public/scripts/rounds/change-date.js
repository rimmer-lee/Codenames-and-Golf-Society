document.getElementById('date').addEventListener('change', function () {
    for (const dateElement of document.querySelectorAll('[data-bs-date]')) {
        dateElement.setAttribute('data-bs-date', this.value);
    };    
})