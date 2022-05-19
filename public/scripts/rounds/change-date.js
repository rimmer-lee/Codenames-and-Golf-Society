const dateElement = document.getElementById('date');

// dateElement.addEventListener('change', function () {
//     for (const dateElement of document.querySelectorAll('[data-bs-date]')) {
//         dateElement.setAttribute('data-bs-date', this.value);
//     };
// });

dateElement.addEventListener('focus', function() {
    if (document.querySelector('select[id^="demerit"][id*="rule"]').length === 0) return;
    this.parentElement.querySelector('.feedback').classList.remove('d-none');
});

dateElement.addEventListener('blur', function() {
    const { parentElement, value } = this;
    const ruleSelects = Array.from(document.querySelectorAll('select[id^="demerit-"][id*="rule"]'));
    const { rules: currentRules } = rules.find(({ date }) => {
        const { end, start } = date;
        return value <= end && value >= start;
    }) || rules[rules.length - 1];
    parentElement.querySelector('.feedback').classList.add('d-none');
    if (ruleSelects.length === 0 || ruleSelects.some(({ value }) => currentRules.some(({ _id }) => _id === value))) return;
    for (const ruleSelect of ruleSelects) removeDemerit.call(ruleSelect);
    updateData();
});