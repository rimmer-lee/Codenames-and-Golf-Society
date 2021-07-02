(function() {
    
    'use strict';

    function getOperation(element, dataSection) {
        return element.querySelector(`[data-type="button"][data-section="${dataSection}"]:not([data-operation="add"]):not([data-operation="new"])`)?.dataset?.operation;
    };

    function setNameAttribute(element) {
        element.setAttribute('name', element.getAttribute('id'));
    };

    function updateBreakdownNames(breakdowns, level) {
        const nextLevel = level++;
        for (const breakdown of breakdowns) {
            if (/restore/.test(getOperation(breakdown, 'rule'))) return;
            const textAreas = breakdown.querySelectorAll('textarea');
            const breakdownElements = breakdown.querySelectorAll(`ol[data-level="${nextLevel}"] > [class~="col-12"] > [class~="row"]`);
            if (textAreas) for (const textArea of textAreas) setNameAttribute(textArea);
            if (breakdownElements) updateBreakdownNames(breakdownElements, nextLevel);
        };
    };

    function updateNames() {
        updateReferences();
        for (const section of document.querySelectorAll('section')) {
            if (/remove/.test(getOperation(section, 'section'))) {
                section.querySelectorAll('section [class~="border"]').forEach((group, groupIndex) => {
                    switch (groupIndex) {
                        case 0:
                            const textArea = group.querySelector('textarea');
                            if (textArea) setNameAttribute(textArea);
                            break;
                        case 1:
                            for (const description of group.querySelectorAll('[class~="col-12"] > [class~="row"]')) {
                                if (/remove/.test(getOperation(description, 'description'))) {
                                    const textArea = description.querySelector('textarea');
                                    if (textArea) setNameAttribute(textArea);
                                };
                            };
                            break;
                        case 2:    
                            for (const rule of group.querySelectorAll('ol:not([data-level]) > [class~="col-12"] > [class~="row"]')) {
                                if (/remove/.test(getOperation(rule, 'rule'))) {
                                    const textAreas = rule.querySelectorAll('textarea');
                                    const breakdowns = rule.querySelectorAll('ol[data-level="1"] > [class~="col-12"] > [class~="row"]');
                                    const numberInput = rule.querySelector('input[type="number"]');
                                    const checkboxes = rule.querySelectorAll('input[type="checkbox"]');
                                    if (textAreas) for (const textArea of textAreas) setNameAttribute(textArea);
                                    if (breakdowns) updateBreakdownNames(breakdowns, 1);
                                    if (numberInput) setNameAttribute(numberInput);
                                    if (checkboxes) for (const checkbox of checkboxes) setNameAttribute(checkbox);
                                };
                            };
                            break;
                        default:
                            break;
                    };
                });
            };
        };
    };

    const forms = document.querySelectorAll('form');

    Array.from(forms).forEach(form => form.addEventListener('submit', updateNames));
    
})();

function updateReferences() {

    function breakdownReferences(breakdowns, reference, level) {
        const nextLevel = level + 1;
        breakdowns.forEach((breakdown, breakdownIndex) => {
            const breakdownReference = `${reference}|b${breakdownIndex}`;
            const textAreas = breakdown.querySelectorAll('textarea');
            const breakdownElements = breakdown.querySelectorAll(`ol[data-level="${nextLevel}"] > [class~="col-12"] > [class~="row"]`);
            textAreas?.forEach((textArea, textAreaIndex) => {
                if (textArea.closest('ol').dataset.level != level) return;
                setValues(`${breakdownReference}|d${textAreaIndex}`, textArea, textArea.previousElementSibling)
            });            
            if (breakdownElements) breakdownReferences(breakdownElements, breakdownReference, nextLevel);
        });
    };

    function setValues(id, idElement, forElement) {
        if (!id) return;
        if (idElement) idElement.setAttribute('id', id);
        if (forElement) forElement.setAttribute('for', id);
    };

    disposeTooltips();

    document.querySelectorAll('section').forEach((section, sectionIndex) => {
        const sectionReference = `s${sectionIndex}`;
        section.querySelectorAll('[class~="border"]')?.forEach((group, groupIndex) => {
            switch (groupIndex) {
                case 0:
                    setValues(`${sectionReference}|t`, group.querySelector('textarea'), group.querySelector('label'));
                    break;
                case 1:
                    group.querySelectorAll('[class~="row"]')?.forEach((description, descriptionIndex) => setValues(`${sectionReference}|d${descriptionIndex}`, description.querySelector('textarea'), description.querySelector('label')));
                    break;
                case 2:
                    group.querySelectorAll('ol:not([data-level]) > [class~="col-12"] > [class~="row"]')?.forEach((rule, ruleIndex) => {
                        const ruleReference = `${sectionReference}|r${ruleIndex}`;
                        const textAreas = rule.querySelectorAll('textarea');
                        const breakdowns = rule.querySelectorAll('ol[data-level="1"] > [class~="col-12"] > [class~="row"]');
                        const numberInput = rule.querySelector('input[type="number"]');
                        const checkboxes = rule.querySelectorAll('input[type="checkbox"]');
                        textAreas?.forEach((textArea, textAreaIndex) => {
                            if (textArea.closest('ol[data-level]')) return;
                            setValues(`${ruleReference}|d${textAreaIndex}`, textArea, textArea.previousElementSibling)
                        });
                        if (breakdowns) breakdownReferences(breakdowns, ruleReference, 1);
                        if (numberInput) setValues(`${ruleReference}|v`, numberInput, numberInput.closest('.row').querySelector('label'));
                        if (checkboxes) for (const checkbox of checkboxes) setValues(`${ruleReference}|t${checkbox.dataset.method[0]}-${checkbox.getAttribute('value').replace(' ', '-').toLowerCase()}`, checkbox, checkbox.nextElementSibling);
                    });
                    break;
                default:
                    break;
            };
        });
    });

    enableTooltips();

};