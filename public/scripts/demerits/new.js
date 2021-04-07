function ruleSelector (rules) {
    const ruleDescription = document.getElementById('rule-description');
    document.querySelector('#rule').addEventListener('change', e => {
        const rule = rules.find(({ index }) => index == e.target.value);
        if (!rule) {
            ruleDescription.parentElement.classList.add('d-none');
            ruleDescription.parentElement.setAttribute('visibility', 'hidden');
            ruleDescription.classList.remove('text-overflow')
            return;
        };
        ruleDescription.parentElement.classList.remove('d-none');
        ruleDescription.parentElement.removeAttribute('visibility');
        ruleDescription.classList.add('text-overflow')
        ruleDescription.innerText = rule.description;
    }, { once: false });
    ruleDescription.parentElement.addEventListener('click', () => ruleDescription.classList.toggle('text-overflow'))
};