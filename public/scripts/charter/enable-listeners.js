(function() {

    'use strict';

    const addSections = document.querySelectorAll('[data-type="button"][data-operation="add"][data-section="section"]');
    for (const addSection of addSections) addSection.addEventListener('click', addSectionFunction);

    const addDescriptions = document.querySelectorAll('[data-type="button"][data-operation="add"][data-section="description"]');
    for (const addDescription of addDescriptions) addDescription.addEventListener('click', addDescriptionFunction);

    const addRules = document.querySelectorAll('[data-type="button"][data-operation="add"][data-section="rule"]');
    for (const addRule of addRules) addRule.addEventListener('click', addRuleFunction);

    const addBreakdowns = document.querySelectorAll('[data-type="button"][data-operation="add"][data-section="breakdown"]');
    for (const addBreakdown of addBreakdowns) addBreakdown.addEventListener('click', addBreakdownFunction);

    const newDescriptions = document.querySelectorAll('[data-type="button"][data-operation="new"][data-section="description"]');
    for (const newDescription of newDescriptions) newDescription.addEventListener('click', newDescriptionFunction);

    const newRules = document.querySelectorAll('[data-type="button"][data-operation="new"][data-section="rule"]');
    for (const newRule of newRules) newRule.addEventListener('click', newRuleFunction);

    const newBreakdowns = document.querySelectorAll('[data-type="button"][data-operation="new"][data-section="breakdown"]');
    for (const newBreakdown of newBreakdowns) newBreakdown.addEventListener('click', newBreakdownFunction);

    const toggleSectionElements = document.querySelectorAll('[data-type="button"][data-section="section"]:not([data-operation="add"]):not([data-operation="new"])');
    for (const toggleSectionElement of toggleSectionElements) toggleSectionElement.addEventListener('click', toggleSection);

    const toggleDescriptionElements = document.querySelectorAll('[data-type="button"][data-section="description"]:not([data-operation="add"]):not([data-operation="new"])');
    for (const toggleDescriptionElement of toggleDescriptionElements) toggleDescriptionElement.addEventListener('click', toggleDescription);

    const toggleRuleElements = document.querySelectorAll('[data-type="button"][data-section="rule"]:not([data-operation="add"]):not([data-operation="new"])');
    for (const toggleRuleElement of toggleRuleElements) toggleRuleElement.addEventListener('click', toggleRule);

    const toggleBreakdownElements = document.querySelectorAll('[data-type="button"][data-section="breakdown"]:not([data-operation="add"]):not([data-operation="new"])');
    for (const toggleBreakdownElement of toggleBreakdownElements) toggleBreakdownElement.addEventListener('click', toggleBreakdown);

})();