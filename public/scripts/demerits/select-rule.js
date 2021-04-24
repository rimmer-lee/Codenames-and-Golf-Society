function selectRule (rules) {
    for (const rule of document.querySelectorAll('[id*=rule')) {
        rule.addEventListener('change', e => {
            const section = e.target.closest('[class~="border"]');
            const ruleDescription = section.querySelector('[id*="rule-description"]');
            const demerit = section.querySelector('[id*="demerit"]');
            const rule = rules.find(({ _id }) => _id == e.target.value);
            for (const checkbox of section.querySelectorAll('[type="checkbox"]')) checkbox.checked = false;
            if (!rule) {
                ruleDescription.parentElement.classList.add('d-none');
                ruleDescription.parentElement.setAttribute('visibility', 'hidden');
                demerit.value = 0;
                return;
            };
            ruleDescription.parentElement.classList.remove('d-none');
            ruleDescription.parentElement.removeAttribute('visibility');
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
        }, { once: false });
    };
};