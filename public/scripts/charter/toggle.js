updateReferences();

function toggleClasses(element, classes) {
    for (const c of classes) element.classList.toggle(c);
};

function toggleVisibility(element) {
    element.classList.toggle('d-none');
    toggleAttribute(element, 'visibility', 'hidden');
};

function toggleParentStyles(element) {
    toggleClasses(element, ['border-danger', 'bg-danger', 'text-white'])
};

function toggleSectionButtonStyles(element) {
    toggleClasses(element, ['btn-danger', 'btn-light']);
};

function toggleTextareaButtonStyles(element) {
    const elementClasses = [
        'btn-danger',
        'btn-light',
        'border',
        'border-danger',
        'border-1',
        'plus'
    ];
    toggleClasses(element, elementClasses);
    toggleClasses(element.querySelector('[class*="btn-close"]'), ['btn-close-white', 'btn-close-black']);
};

function toggleAttribute(element, attribute, value = true) {
    if (element.getAttribute(attribute)) return element.removeAttribute(attribute);
    element.setAttribute(attribute, value);
};

function updateAttributes(element) {
    const values = { 'restore': ['Restore', 'Remove'], 'remove': ['Remove', 'Restore'] }[element.dataset.operation];
    if (!values) return;
    const title = element.getAttribute('data-bs-original-title');
    const value = element.getAttribute('value');
    const text = element.innerText;
    element.setAttribute('data-operation', values[1].toLowerCase());
    element.querySelector('[aria-label]')?.setAttribute('aria-label', values[1].toLowerCase());
    if (title) element.setAttribute('data-bs-original-title', title.replace(values[0], values[1]));
    if (value) element.setAttribute('value', value.replace(values[0], values[1]));
    if (text) element.innerText = element.innerText.replace(values[0], values[1]);
};

function toggleSection() {
    const parent = this.closest('[class~="border"]');
    const textareas = parent.querySelectorAll('textarea');
    if (!Array.from(textareas).some(textarea => textarea.value !== '')) {
        disposeTooltips();
        parent.closest('form > [class~="col-12"]').remove();
        enableTooltips();
        return;
    };
    const descriptionButtons = parent.querySelectorAll('[data-type="button"][data-section="description"]:not([data-operation="add"]):not([data-operation="new"])');
    const ruleButtons = parent.querySelectorAll('[data-type="button"][data-section="rule"]:not([data-operation="add"]):not([data-operation="new"])');
    const otherAddButtons = parent.querySelectorAll('[data-type="button"][data-operation="add"]:not([data-section="breakdown"])');
    const addBreakdownButtons = parent.querySelectorAll('[data-type="button"][data-section="breakdown"][data-operation="add"]');    
    const inputs = parent.querySelectorAll('input:not([type="checkbox"])');
    const checkboxes = parent.querySelectorAll('input[type="checkbox"]');    
    this.classList.toggle('fw-bold');
    toggleParentStyles(parent);
    toggleSectionButtonStyles(this);
    updateAttributes(this);
    for (const descriptionButton of descriptionButtons) {
        if (descriptionButton.dataset.operation === 'restore') {
            const textarea = descriptionButton.closest('[class*="row"]').querySelector('textarea');
            toggleParentStyles(textarea);
            toggleAttribute(textarea, 'disabled');
            toggleTextareaButtonStyles(descriptionButton);
            updateAttributes(descriptionButton);
        };
        toggleVisibility(descriptionButton.closest('[class~="flex-column"]'));
    };
    for (const ruleButton of ruleButtons) {
        if (ruleButton.dataset.operation === 'restore') {
            const textareas = ruleButton.closest('li').querySelectorAll('textarea');
            const column = ruleButton.closest('ol > [class~="col-12"]');
            const listItem = column.querySelector('li');
            const labels = column.querySelectorAll('[class~="col-form-label"]');
            const otherBreakdownButtons = column.querySelectorAll('[data-type="button"][data-section="breakdown"]:not([data-operation="add"])');
            const inputs = column.querySelectorAll('input:not([type="checkbox"])');
            const checkboxes = column.querySelectorAll('input[type="checkbox"]');
            const addBreakdowns = column.querySelectorAll('[data-type="button"][data-section="breakdown"][data-operation="add"]');
            listItem.classList.toggle('text-muted');
            for (const textarea of textareas) {
                toggleParentStyles(textarea);
                toggleAttribute(textarea, 'disabled');
            };    
            toggleTextareaButtonStyles(ruleButton);
            updateAttributes(ruleButton);
            for (const label of labels) label.classList.toggle('text-muted');
            for (const otherBreakdownButton of otherBreakdownButtons) {
                toggleVisibility(otherBreakdownButton);
                if (otherBreakdownButton.dataset.operation === 'remove') otherBreakdownButton.parentElement.classList.toggle('small-width');
            };
            for (const input of inputs) {
                toggleParentStyles(input);
                toggleAttribute(input, 'disabled');
            };
            for (const checkbox of checkboxes) {
                const label = checkbox.nextElementSibling;
                label.classList.toggle('btn-outline-danger');
                label.classList.toggle('btn-outline-light');
                toggleParentStyles(label);
                toggleAttribute(checkbox, 'disabled');
            };
            for (const addBreakdown of addBreakdowns) toggleVisibility(addBreakdown.closest('[class~="col-12"]'));

        };
        toggleVisibility(ruleButton.closest('[class~="flex-column"]'));

    };
    for (const otherAddButton of otherAddButtons) toggleVisibility(otherAddButton.closest('[class*="border"]').parentElement);
    for (const addBreakdownButton of addBreakdownButtons) toggleVisibility(addBreakdownButton.closest('[class~="col-12"]'));
    for (const textarea of textareas) toggleAttribute(textarea, 'disabled');
    for (const input of inputs) toggleAttribute(input, 'disabled');
    for (const checkbox of checkboxes) {
        checkbox.nextElementSibling.classList.toggle('btn-outline-danger');
        checkbox.nextElementSibling.classList.toggle('btn-outline-light');
        toggleAttribute(checkbox, 'disabled');
    };
};

function toggleDescription() {
    if (this.getAttribute('disabled')) return;
    const column = this.closest('[class*="col-12"]');
    const textarea = column.querySelector('textarea');
    if (textarea.value == '') {
        disposeTooltips();
        const parent = this.closest('[class~="border"]');
        column.remove();
        if (parent.childElementCount === 0) return addSectionRowFunction(parent, 'Description');
        const title = parent.children[0].children[0].children[0].children[0];        
        title.classList.remove('d-none');
        title.removeAttribute('visibility');
        enableTooltips();
        return;
    };
    toggleParentStyles(textarea);
    toggleAttribute(textarea, 'disabled');
    toggleTextareaButtonStyles(this);
    updateAttributes(this);
};

function toggleRule() {
    if (this.getAttribute('disabled')) return;
    const column = this.closest('ol > [class~="col-12"]');
    const textareas = column.querySelectorAll('textarea');
    if (!Array.from(textareas).some(textarea => textarea.value !== '')) {
        disposeTooltips();
        const list = this.closest('ol');
        column.remove();
        if (list.childElementCount === 0) return addSectionRowFunction(list, 'Rule');
        const firstRow = list.children[0].children[0];
        const border = firstRow.children[0];
        const title = firstRow.children[1].children[0].children[0].children[0];
        border.classList.add('d-none');
        border.setAttribute('visibility', 'hidden');
        title.classList.remove('d-none');
        title.removeAttribute('visibility');
        enableTooltips();
        return;
    };
    const listItem = column.querySelector('li');
    const labels = column.querySelectorAll('[class~="col-form-label"]');
    const otherBreakdownButtons = column.querySelectorAll('[data-type="button"][data-section="breakdown"]:not([data-operation="add"])');
    const inputs = column.querySelectorAll('input:not([type="checkbox"])');
    const checkboxes = column.querySelectorAll('input[type="checkbox"]');
    const addBreakdownButtons = column.querySelectorAll('[data-type="button"][data-section="breakdown"][data-operation="add"]');
    listItem.classList.toggle('text-muted');
    for (const textarea of textareas) {
        toggleParentStyles(textarea);
        toggleAttribute(textarea, 'disabled');
    };    
    toggleTextareaButtonStyles(this);
    updateAttributes(this);
    for (const label of labels) label.classList.toggle('text-muted');
    for (const otherBreakdownButton of otherBreakdownButtons) {
        toggleVisibility(otherBreakdownButton);
        if (otherBreakdownButton.dataset.operation === 'remove') otherBreakdownButton.parentElement.classList.toggle('small-width');
    };
    for (const input of inputs) {
        toggleParentStyles(input);
        toggleAttribute(input, 'disabled');
    };
    for (const checkbox of checkboxes) {
        const label = checkbox.nextElementSibling;
        label.classList.toggle('btn-outline-danger');
        label.classList.toggle('btn-outline-light');
        toggleParentStyles(label);
        toggleAttribute(checkbox, 'disabled');
    };
    for (const addBreakdownButton of addBreakdownButtons) toggleVisibility(addBreakdownButton.closest('[class~="col-12"]'));
};

function toggleBreakdown() {
    if (this.getAttribute('disabled')) return;
    const column = this.closest('ol > [class~="col-12"]');
    const textareas = column.querySelectorAll('textarea');
    if (!Array.from(textareas).some(textarea => textarea.value !== '')) {
        disposeTooltips();
        const list = this.closest('ol');
        column.remove();
        if (list.childElementCount === 0) {
            const parentColumn = list.closest('ol > [class~="col-12"] > [class~="row"]');
            list.parentElement.remove();
            parentColumn.insertBefore(createElement(breakdownButtonColumnElement()), parentColumn.querySelector('input[type="number"]')?.closest('ol > [class~="col-12"] > [class~="row"] > [class~="col-12"]'));
            return;
        };
        const border = list.children[0].children[0].children[0];
        border.classList.add('d-none');
        border.setAttribute('visibility', 'hidden');
        enableTooltips();
        return;
    };
    const listItem = column.querySelector('li');
    const labels = column.querySelectorAll('[class~="col-form-label"]');
    const addBreakdownButtons = column.querySelectorAll('[data-type="button"][data-section="breakdown"][data-operation="add"]');
    const columnList = column.querySelector('ol');
    listItem.classList.toggle('text-muted');
    for (const textarea of textareas) {
        toggleParentStyles(textarea);
        toggleAttribute(textarea, 'disabled');
    };    
    toggleTextareaButtonStyles(this);
    updateAttributes(this);
    for (const label of labels) label.classList.toggle('text-muted');
    for (const addBreakdownButton of addBreakdownButtons) toggleVisibility(addBreakdownButton.closest('[class~="col-12"]'));
    if (!columnList) return
    const otherBreakdownButtons = columnList.querySelectorAll('[data-type="button"][data-section="breakdown"]:not([data-operation="add"])');
    for (const otherBreakdownButton of otherBreakdownButtons) {
        toggleVisibility(otherBreakdownButton);
        if (otherBreakdownButton.dataset.operation === 'remove') otherBreakdownButton.parentElement.classList.toggle('small-width');
    };
};

function createElement(options) {
    const newElement = document.createElement(options.type || 'div');
    options.classList && newElement.classList.add( ...options.classList );
    if (options.attributes) for (const attribute of options.attributes) newElement.setAttribute(attribute.id, attribute.value);
    if (options.innerText) newElement.innerText = options.innerText;
    options.addEventListener && newElement.addEventListener(options.addEventListener.type || 'click', options.addEventListener.listener, options.addEventListener.options)
    if (options.children) for (const child of options.children) newElement.appendChild(createElement(child));
    return newElement;
};

function focusElement(element) {
    element.focus();
    element.select();
};

function addSectionRowFunction(parent, section) {
    const newElement = createElement(addRowElement(section));
    parent.insertBefore(newElement, null);
    updateReferences();
};

function newElementFunction(parentElement, nextElement, newElementFunction, options = {}) {
    const newElement = createElement(newElementFunction(options));
    parentElement.insertBefore(newElement, nextElement);
    focusElement(newElement.querySelector('textarea'));
    updateReferences();
};

function newDescriptionFunction() {
    const parentElement = this.closest('[class*="border"]');
    const nextElement = this.closest('[class*="border"] > [class*="col-12"]').nextElementSibling;
    newElementFunction(parentElement, nextElement, descriptionElement);
};

function newRuleFunction() {
    const parentRow = this.closest('ol');
    const nextElement = this.closest('ol > [class*="col-12"]').nextElementSibling;
    newElementFunction(parentRow, nextElement, ruleElement);
};

function newBreakdownFunction() {
    const parentRow = this.closest('ol');
    const nextElement = this.closest('ol > [class*="col-12"]').nextElementSibling;
    newElementFunction(parentRow, nextElement, breakdownElement, { addButton: breakdownLevel(parentRow) < 3 });
};

function addElementFunction(parentElement, oldElement, newElementFunction, options = { firstElement: true}) {
    const newElement = createElement(newElementFunction(options));
    parentElement.insertBefore(newElement, null);
    focusElement(newElement.querySelector('textarea'));
    oldElement.remove();
    updateReferences();
};

function addDescriptionFunction() {
    const border = this.closest('[class~="border"]');
    const column = this.closest('.col-12');    
    addElementFunction(border, column, descriptionElement);
};

function addRuleFunction() {
    const list = this.closest('ol');
    const column = this.closest('.col-12');
    addElementFunction(list, column, ruleElement);
};

function addBreakdownFunction() {
    const parentRow = this.closest('ol > .col-12 > .row.gy-2').querySelector('li > .row.gy-2');
    const column = this.closest('.col-12');
    addElementFunction(parentRow, column, addBreakdownElement, { level: breakdownLevel(parentRow) });
};

function addSectionFunction() {
    const form = this.closest('form');
    const buttonParent = this.closest('form > .col-12');
    const newElement = createElement(sectionElement());
    form.insertBefore(newElement, buttonParent);
    focusElement(newElement.querySelector('textarea'));
};

function breakdownLevel(element) {
    let count = 0;
    do {
        element = element.parentElement;
        element.tagName === 'OL' && count++;
    } while (!element.classList.contains('border'));
    return count;
};

function breakdownButtonColumnElement() {
    return {
        classList: ['col-12'],
        children: [
            {
                classList: ['row'],
                children: [
                    {
                        classList: ['col', 'd-flex', 'justify-content-end'],
                        children: [
                            {
                                classList: ['d-flex', 'align-items-center', 'col-form-label', 'px-2', 'btn', 'btn-success'],
                                attributes: [
                                    { id: 'data-type', value: 'button' },
                                    { id: 'data-operation', value: 'add' },
                                    { id: 'data-section', value: 'breakdown' }
                                ],
                                children: [
                                    {
                                        type: 'i',
                                        classList: ['bi', 'bi-arrow-return-right'],
                                        attributes: [{ id: 'aria-label', value: 'Breakdown' }]
                                    },
                                    { classList: ['ps-2'], innerText: 'Breakdown' }
                                ],
                                addEventListener: { listener: addBreakdownFunction }
                            },
                            { classList: ['col', 'small-width'] }
                        ]
                    }
                ]
            }
        ]
    };
};

function buttonElement (operation, section) {
    const buttonClass = operation === 'New' ? 'btn-success' : 'btn-danger';
    const button = {
        children: [
            {
                classList: ['col', 'btn', buttonClass, 'p-1'],
                attributes: [
                    { id: 'data-type', value: 'button' },
                    { id: 'data-operation', value: operation.toLowerCase() },
                    { id: 'data-section', value: section.toLowerCase() },
                    { id: 'data-bs-toggle', value: 'tooltip' },
                    { id: 'data-bs-placement', value: 'left' },
                    { id: 'title', value: `${operation} ${section}` }
                ],
                children: [
                    {
                        classList: ['btn-close', 'btn-close-white'],
                        attributes: [ { id: 'aria-label', value: operation.toLowerCase() } ]
                    }
                ]
            }
        ]    
    };    
    if (operation === 'New') {
        button.children[0].classList.push('plus');
        if (section === 'Description') button.children[0].addEventListener = { listener: newDescriptionFunction };
        if (section === 'Rule') button.children[0].addEventListener = { listener: newRuleFunction };
        if (section === 'Breakdown') button.children[0].addEventListener = { listener: newBreakdownFunction };
    } else {
        if (section === 'Description') button.children[0].addEventListener = { listener: toggleDescription };
        if (section === 'Rule') button.children[0].addEventListener = { listener: toggleRule };
        if (section === 'Breakdown') button.children[0].addEventListener = { listener: toggleBreakdown };
    };
    return button;
};

function buttonGroupElement(section) {
    return {
        classList: ['d-flex', 'flex-column', 'justify-content-between', 'ps-2'],
        children: [
            { classList: ['mb-2'], children: [ buttonElement('Remove', section) ] },
            { children: [ buttonElement('New', section) ] }
        ]
    };
};

function descriptionElement({ firstElement = false } = {}) {
    const description =  {
        classList: ['col-12'],
        children: [
            {
                classList: ['row'],
                children: [
                    {
                        classList: ['col-3', 'col-md-2', 'd-flex', 'align-items-baseline'],
                        children: [
                            {
                                classList: ['fw-bold', 'py-1'],
                                innerText: 'Description'
                            }
                        ]
                    },
                    {
                        classList: ['col', 'd-flex', 'justify-content-end', 'ps-0', 'pe-2'],
                        children: [
                            {
                                type: 'label',
                                classList: ['col-form-label', 'd-none'],
                                attributes: [{ id: 'visibility', value: 'hidden' }]
                            },
                            {
                                type: 'textarea',
                                classList: ['form-control'],
                                addEventListener: { type: 'input', listener: resize, options: { once: false } }
                            },
                            buttonGroupElement('Description')
                        ]
                    }
                ]
            }
        ]
    };
    if (!firstElement) {
        description.children[0].children[0].children[0].classList.push('d-none');
        if (description.children[0].children[0].children[0].attributes) description.children[0].children[0].children[0].attributes.push({ id: 'visibility', value: 'hidden' });
        else description.children[0].children[0].children[0].attributes = [{ id: 'visibility', value: 'hidden' }];
    };
    return description;
};

function ruleElement({ firstElement = false } = {}) {

    function checkboxGroupElement(action) {
        const titles = [{ id: 'ace', value: 'Ace', icon: 'bi-suit-spade-fill' }, { id: 'flag-bitch', value: 'flag bitch', icon: 'bi-flag-fill' }, { id: 'karen', value: 'Karen', icon: 'bi-cone-striped' }];
        const checkboxGroup = {
            classList: ['col-12'],
            children: [
                {
                    classList: ['row'],
                    children: [
                        {
                            classList: ['col-12'],
                            children: [
                                {
                                    classList: ['row', 'me-0'],
                                    children: [
                                        {
                                            classList: ['col', 'd-flex', 'justify-content-end'],
                                            children: [
                                                {
                                                    classList: ['col-form-label', 'ps-3', 'fw-bold'],
                                                    innerText: `${action.title} Title`
                                                }
                                            ]
                                        },
                                        {
                                            classList: ['col-6', 'btn-group', 'px-0'],
                                            attributes: [
                                                { id: 'role', value: 'group' },
                                                { id: 'aria-label', value: 'Title checkbox toggle group' }
                                            ],
                                            children: []
                                        },
                                        { classList: ['col', 'small-width'] }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        for (const title of titles) {
            const titleInput = {
                type: 'input',
                classList: ['btn-check'],
                attributes: [
                    { id: 'type', value: 'checkbox' },
                    { id: 'autocomplete', value: 'off' },
                    { id: 'value', value: title.value },
                    { id: 'data-method', value: action.method }
                ]
            };
            const titleLabel = {
                type: 'label',
                classList: ['btn', action.class],
                children: [
                    {
                        classList: ['d-flex', 'p-0'],
                        children: [
                            {
                                type: 'i',
                                classList: ['mx-auto', 'bi', title.icon]
                            }
                        ]
                    }
                ]
            };
            checkboxGroup.children[0].children[0].children[0].children[1].children.push(titleInput);
            checkboxGroup.children[0].children[0].children[0].children[1].children.push(titleLabel);
        };
        return checkboxGroup;
    };

    // can we use the one provided from server
    const actions = [{ method: 'award', title: 'Award', class: 'btn-outline-success' }, { method: 'revoke', title: 'Revoke', class: 'btn-outline-danger' }];

    const rule = {
        classList: ['col-12'],
        children: [
            {
                classList: ['row', 'gy-2'],
                children: [
                    {
                        classList: ['col-12'],
                        children: [
                            {
                                classList: ['row', 'd-flex', 'justify-content-center'],
                                children: [ { classList: ['col-10', 'border-2', 'border-top'] }]
                            }
                        ]
                    },
                    {
                        classList: ['col-12'],
                        children: [
                            {
                                classList: ['row', 'fw-bold'],
                                children: [
                                    {
                                        classList: ['col-3', 'col-md-2', 'd-flex', 'align-items-baseline'],
                                        children: [{ classList: ['py-1'], innerText: 'Rules' }]
                                    },
                                    {
                                        type: 'li',
                                        classList: ['col', 'px-0'],
                                        children: [
                                            {
                                                classList: ['row', 'gy-2'],
                                                children: [
                                                    {
                                                        classList: ['col-12'],
                                                        children: [
                                                            {
                                                                classList: ['d-flex', 'justify-content-end', 'ps-0', 'pe-2'],
                                                                children: [
                                                                    {
                                                                        type: 'label',
                                                                        classList: ['col-form-label', 'd-none'],
                                                                        attributes: [{ id: 'visibility', value: 'hidden' }]
                                                                    },
                                                                    { type: 'textarea', classList: ['form-control'] },
                                                                    buttonGroupElement('Rule')
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]    
                    },
                    breakdownButtonColumnElement(),
                    {
                        classList: ['col-12'],
                        children: [
                            {
                                classList: ['row'],
                                children: [
                                    {
                                        classList: ['col-12'],
                                        children: [
                                            {
                                                classList: ['row', 'me-0'],
                                                children: [
                                                    {
                                                        classList: ['col', 'd-flex', 'justify-content-end'],
                                                        children: [
                                                            {
                                                                type: 'label',
                                                                classList: ['col-form-label', 'ps-3', 'fw-bold'],
                                                                innerText: 'Demerits'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        classList: ['col-6', 'px-0'],
                                                        children: [
                                                            {
                                                                type: 'input',
                                                                classList: ['form-control'],
                                                                attributes: [
                                                                    { id: 'type', value: 'number' },
                                                                    { id: 'value', value: 0 }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        classList: ['col', 'small-width']
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]    
                    }
                ]
            }
        ]
    };
    if (firstElement) {
        rule.children[0].children[0].classList.push('d-none');
        if (rule.children[0].children[0].attributes) rule.children[0].children[0].attributes.push({ id: 'visibility', value: 'hidden' });
        else rule.children[0].children[0].attributes = [{ id: 'visibility', value: 'hidden' }];
    } else {
        rule.children[0].children[1].children[0].children[0].children[0].classList.push('d-none');
        if (rule.children[0].children[1].children[0].children[0].children[0].attributes) rule.children[0].children[1].children[0].children[0].children[0].attributes.push({ id: 'visibility', value: 'hidden' });
        else rule.children[0].children[1].children[0].children[0].children[0].attributes = [{ id: 'visibility', value: 'hidden' }];
    };
    for (const action of actions) rule.children[0].children.push(checkboxGroupElement(action));
    return rule;
};

function breakdownElement({ firstElement = false, addButton = true } = {}) {
    const breakdown = {
        classList: ['col-12'],
        children: [
            {
                classList: ['row', 'gy-2'],
                children: [
                    {
                        classList: ['col-12'],
                        children: [
                            {
                                classList: ['row', 'd-flex', 'justify-content-center'],
                                children: [{ classList: ['col-10', 'border-2', 'border-top'] }]
                            }
                        ]
                    },
                    {
                        classList: ['col-12'],
                        children: [
                            {
                                classList: ['row'],
                                children: [
                                    {
                                        type: 'li',
                                        classList: ['col', 'px-0', 'fw-bold'],
                                        children: [
                                            {
                                                classList: ['row', 'gy-2'],
                                                children: [
                                                    {
                                                        classList: ['col-12'],
                                                        children: [
                                                            {
                                                                classList: ['d-flex', 'justify-content-end', 'ps-0', 'pe-2'],
                                                                children: [
                                                                    {
                                                                        type: 'label',
                                                                        classList: ['col-form-label', 'd-none'],
                                                                        attributes: [{ id: 'visibility', value: 'hidden' }],
                                                                        innerText: 'Breakdowns'
                                                                    },
                                                                    { type: 'textarea', classList: ['form-control'] },
                                                                    buttonGroupElement('Breakdown')
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
    if (firstElement) {
        breakdown.children[0].children[0].classList.push('d-none');
        if (breakdown.children[0].children[0].attributes) breakdown.children[0].children[0].attributes.push({ id: 'visibility', value: 'hidden' });
        else breakdown.children[0].children[0].attributes = [{ id: 'visibility', value: 'hidden' }];
    };
    if (addButton) breakdown.children[0].children.push(breakdownButtonColumnElement());
    return breakdown;
};

function sectionElement() {
    return {
        type: 'section',
        classList: ['col-12', 'col-lg-10', 'col-xl-8', 'border', 'border-3', 'rounded-3', 'mx-auto', 'px-2'],
        children: [
            {
                classList: ['row', 'gy-3', 'pt-3', 'pb-2'],
                children: [
                    {
                        classList: ['col-12'],
                        children: [
                            {
                                classList: ['row', 'gy-2', 'border', 'border-1', 'rounded-2', 'pb-2', 'mx-0'],
                                children: [
                                    {
                                        classList: ['col-3', 'col-md-2', 'd-flex', 'align-items-baseline'],
                                        children: [
                                            {
                                                classList: ['fw-bold', 'py-1'],
                                                innerText: 'Heading'
                                            }
                                        ]
                                    },
                                    {
                                        classList: ['col-9', 'col-md-10', 'ps-0', 'pe-2'],
                                        children: [
                                            {
                                                type: 'label',
                                                classList: ['col-form-label', 'd-none'],
                                                attributes: [{ id: 'visibility', value: 'hidden' }],
                                                innerText: 'Heading'
                                            },
                                            {
                                                type: 'textarea',
                                                classList: ['form-control'],
                                                attributes: [{ id: 'rows', value: 1 }]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        classList: ['col-12'],
                        children: [
                            {
                                classList: ['row', 'gy-2', 'border', 'border-1', 'rounded-2', 'pb-2', 'mx-0'],
                                children: [ addRowElement('Description') ]
                            }
                        ]                                    
                    },
                    {
                        classList: ['col-12'],
                        children: [
                            {
                                type: 'ol',
                                classList: ['row', 'gy-2', 'border', 'border-1', 'rounded-2', 'mb-0', 'mx-0', 'ps-0', 'pb-2'],
                                children: [ addRowElement('Rule') ]
                            }
                        ]
                    },
                    {
                        classList: ['col-12', 'mt-2'],
                        children: [
                            {
                                classList: ['row', 'mx-0'],
                                children: [
                                    {
                                        classList: ['btn', 'btn-danger'],
                                        attributes: [
                                            { id: 'data-type', value: 'button' },
                                            { id: 'data-operation', value: 'remove' },
                                            { id: 'data-section', value: 'section' },
                                            { id: 'readonly', value: '' }
                                        ],
                                        innerText: 'Remove Section',
                                        addEventListener: { listener: toggleSection }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
};

function addBreakdownElement({ level = 1 } = {}) {
    const newBreakdown = {
        classList: ['col-12'],
        children: [
            {
                type: 'ol',
                classList: ['row', 'gy-2', 'mb-0', 'mx-0', 'px-2'],
                attributes: [{ id: 'data-level', value: level }],
                children: [ breakdownElement({ firstElement: true, addButton: level < 3 }) ]
            }
        ]
    };
    return newBreakdown;
};

function addRowElement(section) {
    const addRow = {
        classList: ['col-12'],
        children: [
            {
                classList: ['row'],
                children: [
                    {
                        classList: ['col-3', 'col-md-2', 'd-flex', 'align-items-center'],
                        children: [
                            {
                                classList: ['fw-bold', 'py-1'],
                                innerText: section
                            }
                        ]
                    },
                    {
                        classList: ['col', 'd-grid', 'ps-0', 'pe-2'],
                        children: [
                            {
                                classList: ['btn', 'btn-success'],
                                attributes: [
                                    { id: 'data-type', value: 'button' },
                                    { id: 'data-operation', value: 'add' },
                                    { id: 'data-section', value: section.toLowerCase() }                                            
                                ],
                                innerText: `Add ${section}`,
                            }
                        ]
                    }
                ]
            }
        ]
    };
    if (section === 'Description') addRow.children[0].children[1].children[0].addEventListener = { listener: addDescriptionFunction };
    if (section === 'Rule') {
        addRow.children[0].children[0].children[0].innerText += 's';
        addRow.children[0].children[1].children[0].innerText += 's';
        addRow.children[0].children[1].children[0].addEventListener = { listener: addRuleFunction };
        return addRow;
    };
    return addRow;
};