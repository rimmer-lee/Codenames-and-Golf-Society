function selectTee() {
    const colour = this.value;
    for (const boldElement of document.querySelectorAll('#tees .fw-bold')) boldElement.classList.remove('fw-bold');
    for (const boldElement of document.querySelectorAll('[id^="hole-"] table .fw-bold')) boldElement.classList.remove('fw-bold');
    for (const element of document.querySelectorAll(`input[name*="[${colour}]"]`)) element.classList.add('fw-bold');
};

document.getElementById('tee-select').addEventListener('change', selectTee);