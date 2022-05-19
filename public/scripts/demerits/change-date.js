function changeDate() {
    const { id, value } = this;
    const ruleSelect = document.getElementById(`${id.split('|')[0]}|rule`);
    const { rules: r } = rules.find(({ date }) => {
        const { end, start } = date;
        return value <= end && value >= start;
    }) || rules[rules.length - 1];
    if (r.some(({ _id }) => _id === ruleSelect.value)) return;
    ruleSelect.children[0].selected = true;
    ruleSelect.classList.remove('is-valid');
    ruleSelect.classList.add('is-invalid');
    while (ruleSelect.children.length > 1) ruleSelect.children[1].remove();
    for (const rule of r) {
        const { _id, description, index } = rule;
        ruleSelect.insertBefore(createElement({
            type: 'option',
            attributes: [{ id: 'value', value: _id }],
            innerText: `${index}. ${description[0]}`
        }), null);
    };
    updateDescription.call(this);
};

for (const dateInput of document.querySelectorAll('input[type=date][id$="date"]')) {
    dateInput.addEventListener('blur', changeDate);
};