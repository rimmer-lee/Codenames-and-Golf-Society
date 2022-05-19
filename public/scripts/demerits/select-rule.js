function updateDescription() {
    const section = this.closest('[class~="border"]');
    const ruleDescription = section.querySelector('[class~="rule-description"]');
    const ruleDescriptionParent = ruleDescription.closest('[class~="col-12"]');
    const demerit = section.querySelector('[id*="demerit"][type=number]');
    const rule = rules.map(({ rules }) => rules).flat().find(({ _id }) => _id == this.value);
    for (const checkbox of section.querySelectorAll('[type="checkbox"]')) checkbox.checked = false;
    updateCloseButtons(this.closest('.modal'));
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
                section.querySelector(`[type="checkbox"][value="${title.method}|${title.title}"]`).checked = true;
            };
        };
    };
};