function calculateTotals(id, property) {
    const inputs = Array.from(document.querySelectorAll(`input[id^="${id}|"][id$="|${property}"]`));
    const frontValue = inputs.filter(({ id }) => {
        const [ , hole ] = id.match(/.+\|(1[0-8]|[1-9])\|(.+)/);
        return hole < 10;
    }).reduce((sum, { value }) => sum += +value, 0);
    const backValue = inputs.filter(({ id }) => {
        const [ , hole ] = id.match(/.+\|(1[0-8]|[1-9])\|(.+)/);
        return hole > 9;
    }).reduce((sum, { value }) => sum += +value, 0);
    const totalValue = inputs.reduce((sum, { value }) => sum += +value, 0);
    document.getElementById(`${id}|${property}|front`).innerText = frontValue || '';
    document.getElementById(`${id}|${property}|back`).innerText = backValue || '';
    document.getElementById(`${id}|${property}|full`).innerText = totalValue || '';
};

function different() {
    for (const tee of course.tees) {
        const { colour, holes, id } = tee;
        if (document.getElementById(`${id}|colour`).value !== colour.name) return true;
        for (const hole of holes) {
            const { distance, index, par, strokeIndex } = hole;
            const distanceValue = document.getElementById(`${id}|${index}|distance`).value;
            const parValue = document.getElementById(`${id}|${index}|par`).value;
            const strokeIndexValue = document.getElementById(`${id}|${index}|strokeIndex`).value;
            if (distanceValue && +distanceValue !== distance) return true;
            if (parValue && +parValue !== par) return true;
            if (strokeIndexValue && +strokeIndexValue !== strokeIndex) return true;
        };
    };
    return false;
};

function updateButtons() {
    function updateButtonClassList(remove) {
        const undo = document.getElementById('undo');
        const save = document.getElementById('save');
        for (const button of [undo, save]) {
            if (remove) {
                button.classList.remove('d-none');
                continue;
            };
            button.classList.add('d-none');
        };
        return remove;
    };
    const differentValue = different();
    return updateButtonClassList(different());
};

function updateStrokeIndexSelects(id) {
    const selects = document.querySelectorAll(`select[id^="${id}|"][id$="|strokeIndex"]`);
    const staticSelects = Array.from(selects).map(({ id, value }) => ({ id, value: +value }));
    const selectValues = staticSelects.map(({ value }) => value).filter(value => value > 0);
    for (const select of selects) {
        while (select.children.length > 0) select.children[0].remove();
        const optionElement = { type: 'option' };
        const existingValue = staticSelects.find(({ id }) => id === select.id).value;
        select.insertBefore(createElement(optionElement), null);
        for (let strokeIndex = 1; strokeIndex < 19; strokeIndex++) {
            if (selectValues.some(value => value === strokeIndex) && strokeIndex !== existingValue) continue;
            optionElement.value = strokeIndex;
            optionElement.innerText = strokeIndex;
            select.insertBefore(createElement(optionElement), null);
        };
        Array.from(select.children).find(({ value }) => +value === existingValue).setAttribute('selected', true);
    };
};

for (const input of document.querySelectorAll('input')) {
    input.addEventListener('change', function () {
        const [ , id, property ] = this.id.match(/(.+)\|(?:1[0-8]|[1-9])\|(.+)/);
        if (!id || !property) return;
        calculateTotals(id, property);
        updateButtons();
    });
};

for (const select of document.querySelectorAll('table select')) {
    select.addEventListener('change', function () {
        const [ , id ] = this.id.match(/(.+)\|(?:1[0-8]|[1-9])\|.+/);
        if (!id) return;
        updateStrokeIndexSelects(id);
        updateButtons();
    });
};

for (const select of document.querySelectorAll('select[id$="|colour"]')) {
    select.addEventListener('change', function() {
        const [ , id ] = this.id.match(/(.+)\|colour/);
        const classesToRemove = teeColours.map(teeColour => teeColour.class.table);
        for (const element of document.querySelectorAll(`table td [id^="${id}|"]`)) {
            const tdElement = element.closest('td[class^="table"]');
            if (!tdElement) continue;
            tdElement.classList.remove(...classesToRemove);
            tdElement.classList.add(this.value);
        };
        updateButtons();
    });
};

document.getElementById('undo').addEventListener('click', function() {
    for (const tee of course.tees) {
        const { colour, holes, id } = tee;
        const teeSelectOptions = Array.from(document.getElementById(`${id}|colour`).children);
        teeSelectOptions.find(({ selected }) => selected).selected = false;
        teeSelectOptions.find(({ value }) => value === colour.name).selected = true;
        for (const hole of holes) {
            const { index } = hole;
            for (const property of ['distance', 'par', 'strokeIndex']) {
                document.getElementById(`${id}|${index}|${property}`).value = hole[property] || '';
            };
        };
        for (const property of ['distance', 'par']) calculateTotals(id, property);
    };
    updateButtons();
});

for (const tee of course.tees) {
    const { id } = tee;
    updateStrokeIndexSelects(id);
    for (const property of ['distance', 'par']) calculateTotals(id, property);
};

updateButtons();