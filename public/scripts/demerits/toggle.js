(function() {

    'use strict';

    function disableElements(parent, selector) {
        for (const element of parent.querySelectorAll(selector)) toggleAttribute(element, 'disabled');
    };

    function toggleAttribute(element, attribute, value = true) {
        if (element.getAttribute(attribute)) return element.removeAttribute(attribute);
        element.setAttribute(attribute, value);
    };

    function toggleSection() {
        const parent = this.closest('[class~="border"]');
        const value = this.getAttribute('value');
        const checkboxes = parent.querySelectorAll('input[type="checkbox"]:not([data-type="button"])');
        const radioButtons = parent.querySelectorAll('input[type="radio"]:not([data-type="button"])');
        const paragraphs = parent.querySelectorAll('p');
        parent.classList.toggle('border-danger');
        parent.classList.toggle('bg-danger');
        parent.classList.toggle('text-white');
        this.classList.toggle('btn-danger')
        this.classList.toggle('btn-light')
        disableElements(parent, 'input:not([type="checkbox"]):not([data-type="button"])');
        disableElements(parent, 'textarea');
        disableElements(parent, 'select');
        for (const checkbox of checkboxes) {
            checkbox.nextElementSibling.classList.toggle('btn-outline-danger');
            checkbox.nextElementSibling.classList.toggle('btn-outline-light');
            toggleAttribute(checkbox, 'disabled');
        };
        for (const radioButton of radioButtons) {
            radioButton.classList.toggle('btn-light');
            radioButton.classList.toggle('btn-outline-danger');
            // toggleAttribute(radioButton, 'disabled');
        };
        for (const paragraph of paragraphs) paragraph.classList.toggle('text-muted');
        if (this.dataset.operation === 'remove') {
            this.setAttribute('data-operation', 'restore');
            this.setAttribute('value', value.replace('Remove', 'Restore'));
        } else if (this.dataset.operation === 'restore') {
            this.setAttribute('data-operation', 'remove');
            this.setAttribute('value', value.replace('Restore', 'Remove'));
        };
    };
    
    for (const toggleButton of document.querySelectorAll('[data-type="button"][data-operation]')) toggleButton.addEventListener('click', toggleSection);

})();