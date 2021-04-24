(function() {
    
    'use strict';

    function setNameAttribute(element) {
        element.setAttribute('name', element.getAttribute('id'));
    };

    function updateBreakdownNames(element) {
        for (const breakdown of element.querySelectorAll('ol > .row.mx-0')) {
            if (/restore/.test(breakdown.querySelector('[data-type="button"][data-section="rule"]:not([data-operation="add"])').dataset.operation)) return;
            const textAreas = breakdown.querySelectorAll('textarea');
            const breakdowns = breakdown.querySelectorAll('ol > .row.mx-0');
            if (textAreas) for (const textArea of textAreas) setNameAttribute(textArea);
            if (breakdowns) for (const breakdown of breakdowns) updateBreakdownNames(breakdown);
        };
    };

    function updateNames() {
        updateReferences();
        for (const section of document.querySelectorAll('section')) {
            if (/remove/.test(section.querySelector('[data-type="button"][data-section="section"]').dataset.operation)) {
                section.querySelectorAll('section > [class~="border"]').forEach((group, groupIndex) => {
                    switch (groupIndex) {
                        case 0:
                            const textArea = group.querySelector('textarea');
                            if (textArea) setNameAttribute(textArea);
                            break;
                        case 1:
                            for (const description of group.querySelectorAll('[class~="row"]')) {
                                if (/remove/.test(description.querySelector('[data-type="button"][data-section="description"]:not([data-operation="add"])').dataset.operation)) {
                                    const textArea = description.querySelector('textarea');
                                    if (textArea) setNameAttribute(textArea);
                                };
                            };
                            break;
                        case 2:    
                            for (const rule of group.querySelectorAll('ol > .row.mx-0')) {
                                if (/remove/.test(rule.querySelector('[data-type="button"][data-section="rule"]:not([data-operation="add"])').dataset.operation)) {
                                    const textAreas = rule.querySelectorAll('textarea');
                                    const breakdowns = rule.querySelectorAll('ol > .row.mx-0');
                                    const numberInput = rule.querySelector('input[type="number"]');
                                    const checkboxes = rule.querySelectorAll('input[type="checkbox"]');
                                    if (textAreas) for (const textArea of textAreas) setNameAttribute(textArea);
                                    if (breakdowns) for (const breakdown of breakdowns) updateBreakdownNames(breakdown);
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

    function breakdownReference(breakdowns, reference) {
        breakdowns.forEach((breakdown, breakdownIndex) => {
            const breakdownReference = `${reference}|b${breakdownIndex}`;
            const textAreas = breakdown.querySelectorAll('textarea');
            const breakdownElements = breakdown.querySelectorAll('ol > .row.mx-0');
            if (textAreas) {
                textAreas.forEach((textArea, textAreaIndex) => {                            
                    const textAreaReference = `${breakdownReference}|d${textAreaIndex}`;                                
                    textArea.closest('li').previousElementSibling.querySelector('label').setAttribute('for', textAreaReference);
                    textArea.setAttribute('id', textAreaReference);
                });
            };
            if (breakdownElements) breakdownReference(breakdownElements, breakdownReference)
        });
    };

    document.querySelectorAll('section').forEach((section, sectionIndex) => {
        const sectionReference = `s${sectionIndex}`;
        section.querySelectorAll('section > [class~="border"]').forEach((group, groupIndex) => {
            switch (groupIndex) {
                case 0:
                    const titleReference = `${sectionReference}|t`;                        
                    group?.querySelector('label').setAttribute('for', titleReference);
                    group?.querySelector('textarea').setAttribute('id', titleReference);
                    break;
                case 1:
                    group.querySelectorAll('[class~="row"]').forEach((description, descriptionIndex) => {
                        const descriptionReference = `${sectionReference}|d${descriptionIndex}`;
                        description?.querySelector('label').setAttribute('for', descriptionReference);
                        description?.querySelector('textarea').setAttribute('id', descriptionReference);
                    });
                    break;
                case 2:
                    group.querySelectorAll('ol > .row.mx-0').forEach((rule, ruleIndex) => {
                        const ruleReference = `${sectionReference}|r${ruleIndex}`;
                        const textAreas = rule.querySelectorAll('textarea');
                        const breakdowns = rule.querySelectorAll('ol > .row.mx-0');
                        const numberInput = rule.querySelector('input[type="number"]');
                        const checkboxes = rule.querySelectorAll('input[type="checkbox"]');
                        if (textAreas) {
                            textAreas.forEach((textArea, textAreaIndex) => {                            
                                const textAreaReference = `${ruleReference}|d${textAreaIndex}`;                                
                                textArea?.previousElementSibling.setAttribute('for', textAreaReference);
                                textArea.setAttribute('id', textAreaReference);
                            });
                        };
                        if (breakdowns) breakdownReference(breakdowns, ruleReference);
                        if (numberInput) {
                            numberInput.closest('.row').querySelector('label').setAttribute('for', `${ruleReference}|v`);
                            numberInput.setAttribute('id', `${ruleReference}|v`);
                        };
                        if (checkboxes) {
                            for (const checkbox of checkboxes) {
                                const checkboxReference = `${ruleReference}|t${checkbox.dataset.method[0]}-${checkbox.getAttribute('value').replace(' ', '-').toLowerCase()}`;
                                checkbox?.nextElementSibling.setAttribute('for', checkboxReference);
                                checkbox.setAttribute('id', checkboxReference);
                            };
                        };
                    });
                    break;
                default:
                    break;
            };
        });
    });
};