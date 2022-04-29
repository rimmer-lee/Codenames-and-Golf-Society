function selectTee() {
    const tee = this.value.toLowerCase();
    for (const boldElement of document.querySelectorAll('#tees .fw-bold')) boldElement.classList.remove('fw-bold');
    for (const boldElement of document.querySelectorAll('[id^="hole-"] table .fw-bold')) boldElement.classList.remove('fw-bold');
    for (const element of document.querySelectorAll(`[id^="${tee}|"]`)) element.classList.add('fw-bold');
    updateScores();
};

document.getElementById('tee-select').addEventListener('change', selectTee);