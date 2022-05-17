for (const ruleSelector of document.querySelectorAll('[id$=rule')) {
    ruleSelector.addEventListener('change', updateDescription);
};

function updateDescription() {
    const [ index ] = this.id.split('|');
    const ruleDescription = this.closest('[class~="border"]').querySelector('[class~="rule-description"]');
    const ruleDescriptionParent = ruleDescription.closest('[class~="col-12"]');
    const demerit = document.getElementById(`${index}|demerit`);
    const rule = rules.map(({ rules }) => rules).flat().find(({ _id }) => _id == this.value);
    for (const checkbox of document.querySelectorAll(`[type="checkbox"][id^="${index}|"]`)) checkbox.checked = false;
    if (!rule) {
        ruleDescriptionParent.classList.add('d-none');
        ruleDescriptionParent.setAttribute('visibility', 'hidden');
        demerit.value = 0;
        return;
    };
    ruleDescriptionParent.classList.remove('d-none');
    ruleDescriptionParent.removeAttribute('visibility');
    ruleDescription.innerText = rule.description;
    if (rule.action) {
        if (rule.action.demerits) demerit.value = rule.action.demerits;
        else demerit.value = 0;
        if (rule.action.titles) {
            for (const title of rule.action.titles) {
                document.getElementById(`${index}|${title.method}|${title.title}`.toLowerCase()).checked = true;
            };
        };
    };
};