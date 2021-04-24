(function() {

    'use strict';

    function toggleVisibility(element) {
        element.classList.toggle('d-none');
        toggleAttribute(element, 'visibility', 'hidden');        
    };

    function toggleParentStyles(element) {
        element.classList.toggle('border-danger');
        element.classList.toggle('bg-danger');
        element.classList.toggle('text-white');
    };

    function toggleButtonStyles(element) {
        element.classList.toggle('btn-danger')
        element.classList.toggle('btn-dark')
    };

    function toggleAttribute(element, attribute, value = true) {
        if (element.getAttribute(attribute)) return element.removeAttribute(attribute);
        element.setAttribute(attribute, value);
    };

    function updateAttributes(element) {
        
        // function updateAttribute(element) {

        //     function replaceValue(value) {
                
        //         String.prototype.toTitleCase = function () {
        //             return this.replace(/\w*/g, function(text) { return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase(); });
        //         };

        //         const actions = ['remove', 'restore'];
        //         let currentValue;
        //         for (const action of actions) if (value.toLowerCase().indexOf(action) !== -1 ) return currentValue = action;
        //         const newValue = actions[actions.indexOf(currentValue + 1) % actions.length];
            
        //         return value.toTitleCase().replace(currentValue.toTitleCase(), newValue.toTitleCase())
        //     };

        //     const operation = element.getAttribute('data-operation');
        //     const title = element.getAttribute('data-bs-original-title');
        //     const value = element.getAttribute('value');
        //     const text = element.innerText;
        //     if (operation) element.setAttribute('data-operation', replaceValue(operation).toLowerCase());
        //     if (title) element.setAttribute('data-bs-original-title', replaceValue(title));
        //     if (value) element.setAttribute('value', replaceValue(value));
        //     if (text) element.innerText = replaceValue(text);
        // };

        // updateAttribute(element);

        if (element.dataset.operation === 'remove') return restoreAttributes(element)
        if (element.dataset.operation === 'restore') return removeAttributes(element)
    };

    function restoreAttributes(element) {
        const title = element.getAttribute('data-bs-original-title');
        const value = element.getAttribute('value');
        const text = element.innerText;
        element.setAttribute('data-operation', 'restore');
        if (title) element.setAttribute('data-bs-original-title', title.replace('Remove', 'Restore'));
        if (value) element.setAttribute('value', value.replace('Remove', 'Restore'));
        if (text) element.innerText = element.innerText.replace('Remove', 'Restore');
    };

    function removeAttributes(element) {
        const title = element.getAttribute('data-bs-original-title');
        const value = element.getAttribute('value');
        const text = element.innerText;
        element.setAttribute('data-operation', 'remove');
        if (title) element.setAttribute('data-bs-original-title', title.replace('Restore', 'Remove'));
        if (value) element.setAttribute('value', value.replace('Restore', 'Remove'));
        if (text) element.innerText = element.innerText.replace('Restore', 'Remove');
    };

    function toggleSection() {
        const parent = this.closest('[class~="border"]');
        const removeDescriptions = parent.querySelectorAll('[data-type="button"][data-section="description"]:not([data-operation="add"]):not([data-operation="new"])');
        const removeRules = parent.querySelectorAll('[data-type="button"][data-section="rule"]:not([data-operation="add"]):not([data-operation="new"])');
        const addButtons = parent.querySelectorAll('[data-type="button"][data-operation="add"]');
        const newButtons = parent.querySelectorAll('[data-type="button"][data-operation="new"]');
        const textareas = parent.querySelectorAll('textarea');
        const inputs = parent.querySelectorAll('input:not([type="checkbox"])');
        const checkboxes = parent.querySelectorAll('input[type="checkbox"]');
        toggleParentStyles(parent);
        toggleButtonStyles(this);
        updateAttributes(this);
        for (const removeDescription of removeDescriptions) {
            if (removeDescription.dataset.operation === 'restore') {
                toggleParentStyles(removeDescription.closest('[class*="row"]').querySelector('textarea'));
                toggleButtonStyles(removeDescription);
                updateAttributes(removeDescription);
            };
            toggleVisibility(removeDescription);
        };
        for (const removeRule of removeRules) {
            if (removeRule.dataset.operation === 'restore') {
                toggleParentStyles(removeRule.closest('li').querySelector('textarea'));
                toggleButtonStyles(removeRule);
                updateAttributes(removeRule);
            };
            toggleVisibility(removeRule);
        };
        for (const addButton of addButtons) toggleVisibility(addButton);
        for (const newButton of newButtons) toggleVisibility(newButton.closest('[class*="border"]'));
        for (const textarea of textareas) toggleAttribute(textarea, 'disabled');
        for (const input of inputs) toggleAttribute(input, 'disabled');
        for (const checkbox of checkboxes) {
            checkbox.nextElementSibling.classList.toggle('btn-outline-danger');
            checkbox.nextElementSibling.classList.toggle('btn-outline-light');
            toggleAttribute(checkbox, 'disabled');
        };
    };

    function toggleTextarea() {
        toggleParentStyles(this.closest('[class*="row"]').querySelector('textarea'));
        toggleButtonStyles(this);
        updateAttributes(this);
    };

    const toggleSectionElements = document.querySelectorAll('[data-type="button"][data-section="section"]:not([data-operation="add"]):not([data-operation="new"])');
    const toggleOtherElements = document.querySelectorAll('[data-type="button"]:not([data-section="section"]):not([data-operation="add"]):not([data-operation="new"])');

    for (const toggleSectionElement of toggleSectionElements) toggleSectionElement.addEventListener('click', toggleSection);
    for (const toggleOtherElement of toggleOtherElements) toggleOtherElement.addEventListener('click', toggleTextarea);
    
})();