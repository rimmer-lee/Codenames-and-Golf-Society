// need to trigger validate form function

(function() {

    document.querySelector('[data-type="button"][data-operation="add"]').addEventListener('click', function () {

        function sectionElementWrapper(children) {
            return {
                type: 'section',
                classList: ['col-12'],
                children: [
                    {
                        classList: ['row', 'd-flex'],
                        children: [
                            {
                                classList: ['col-11', 'col-md-8', 'col-lg-6', 'border', 'border-3', 'rounded-3', 'mx-auto', 'px-3'],
                                children: [{ classList: ['row', 'gy-3', 'py-3'], children }]
                            }
                        ]
                    }
                ]
            };
        };

        function columnElementWrapper(children) {
            return {
                classList: ['col-12'],
                children: [
                    { classList: ['row', 'mx-0'], children }
                ]
            };
        };

        function invalidFeedbackElement(section) {
            return {
                classList: ['invalid-feedback'],
                children: [
                    {
                        classList: ['d-flex', 'justify-content-end'],
                        innerText: `Please select a ${section.toLowerCase()}.`
                    }
                ]
            }
        };

        function dateElement(page, index) {
            const id = `${index}|date`;
            const element = [
                {
                    type: 'label',
                    classList: ['col-4', 'col-form-label', 'd-flex', 'align-items-center', 'fw-bold'],
                    attributes: [{ id: 'for', value: id }],
                    innerText: 'Date'
                },
                {
                    type: 'input',
                    classList: ['col', 'form-control', 'me-2'],
                    attributes: [
                        { id: 'id', value: id },
                        { id: 'type', value: 'date' },
                        { id: 'name', value: `${page.toLowerCase()}[${index}][when][date]` },
                        {
                            id: 'value',
                            value: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date.getDate()).padStart(2, '0')}`
                        },
                        { id: 'required', value: '' }
                    ],
                    addEventListener: [{ type: 'change', listener: validation }]
                },
                invalidFeedbackElement('date')
            ];
            return columnElementWrapper(element);
        };

        function selectElement(section, page, index) {
            const options = section === 'Player' ? players : rules;
            const lowerSection = section.toLowerCase();
            const id = `${index}|${lowerSection}`
            const element = [
                {
                    type: 'label',
                    classList: ['col-4', 'col-form-label', 'd-flex', 'align-items-center', 'fw-bold'],
                    innerText: section,
                    attributes: [{ id: 'for', value: id }]
                },
                {
                    type: 'select',
                    classList: ['col', 'form-select', 'me-2'],
                    attributes: [
                        { id: 'id', value: id },
                        { id: 'name', value: `${page.toLowerCase()}[${index}][${lowerSection}]` },
                        { id: 'autofocus', value: '' },
                        { id: 'required', value: '' }
                    ],
                    addEventListener: [{ type: 'change', listener: validation }],
                    children: [
                        {
                            type: 'option',
                            attributes: [
                                { id: 'value', value: '' },
                                { id: 'selected', value: '' },
                                { id: 'disabled', value: '' }
                            ],
                            innerText: `Select ${lowerSection}`
                        }
                    ]
                },
                invalidFeedbackElement(section)
            ];
            for (const option of options) {
                const newOption = {
                    type: 'option',
                    attributes: [{ id: 'value', value: option._id || option.id }]
                };
                if (section === 'Player') {
                    newOption.innerText = option.name;
                } else if (section === 'Rule') {
                    // defaults to first description
                    // but what if more than 1 description for rules?
                    newOption.innerText = `${option.index}. ${option.description[0]}`;
                };
                element[1].children.push(newOption);
            };
            if (section === 'Rule') element[1].addEventListener.push({ type: 'change', listener: updateDescription, options: { once: false } });
            return columnElementWrapper(element);
        };

        function titleInputElement(title, action, index) {
            const id = `${index}|${action.method}|${title.id}`;
            return {
                type: 'input',
                classList: ['btn-check'],
                attributes: [
                    { id: 'id', value: id },
                    { id: 'type', value: 'checkbox' },
                    { id: 'autocomplete', value: 'off' },
                    { id: 'name', value: `demerit[${index}][action][titles]` },
                    { id: 'value', value: `${action.method}|${title.value}` }
                ]
            };
        };

        function titleLabelElement(title, action, index) {
            const id = `${index}|${action.method}|${title.id}`;
            return {
                type: 'label',
                classList: ['btn', `btn-outline-${action.class}`],
                attributes: [{ id: 'for', value: id }],
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
        };

        function titlesElement(action, index) {
            const element = [
                {
                    classList: ['col-4', 'col-form-label', 'd-flex', 'align-items-center', 'fw-bold'],
                    innerText: `${action.title} Title`
                },
                {
                    classList: ['col', 'px-0'],
                    children: [
                        {
                            classList: ['row', 'me-0'],
                            children: [
                                {
                                    classList: ['btn-group'],
                                    attributes: [
                                        { id: 'role', value: 'group' },
                                        { id: 'aria-label', value: 'Title checkbox toggle group' }
                                    ],
                                    children: []
                                }
                            ]
                        }
                    ]
                }
            ];
            for (title of titles) {
                element[1].children[0].children[0].children.push(titleInputElement(title, action, index));
                element[1].children[0].children[0].children.push(titleLabelElement(title, action, index));
            };
            return columnElementWrapper(element);
        };

        function commentsElement(page, index) {
            const id = `${index}|comments`;
            const element = [
                {
                    type: 'label',
                    classList: ['col-4', 'col-form-label', 'd-flex', 'align-items-center', 'fw-bold'],
                    attributes: [{ id: 'for', value: id }],
                    innerText: 'Comments'
                },
                {
                    type: 'textarea',
                    classList: ['col', 'form-control', 'me-2'],
                    attributes: [
                        { id: 'id', value: id },
                        { id: 'name', value: `${page.toLowerCase()}[${index}][comments]` },
                        { id: 'rows', value: '1' },
                        { id: 'placeholder', value: 'Optional' }
                    ]
                }
            ]
            return columnElementWrapper(element);        
        };

        function removeButtonElement(page) {
            const element = [
                {
                    classList: ['btn', 'btn-danger'],
                    attributes: [
                        { id: 'data-type', value: 'button' },
                        { id: 'data-operation', value: 'remove' },
                        { id: 'data-section', value: 'section' }
                    ],
                    innerText: `Remove ${page}`,
                    addEventListener: [{ listener: remove }]
                }
            ]
            return columnElementWrapper(element);            
        };

        function demeritElement(index) {
            const page = 'Demerit';
            const element =  [
                dateElement(page, index),
                columnElementWrapper([
                    {
                        type: 'label',
                        classList: ['col-4', 'col-form-label', 'd-flex', 'align-items-center', 'fw-bold'],
                        attributes: [{ id: 'for', value: `${index}|hole` }],
                        innerText: 'Hole'
                    },
                    {
                        type: 'input',
                        classList: ['col', 'form-control', 'me-2'],
                        attributes: [
                            { id: 'id', value: `${index}|hole` },
                            { id: 'type', value: 'number' },
                            { id: 'name', value: `${page.toLowerCase()}[${index}][when][hole]` },
                            { id: 'value', value: '0' },
                            { id: 'min', value: '1' },
                            { id: 'max', value: '18' }
                        ]
                    }
                ]),
                selectElement('Player', page, index),
                columnElementWrapper([                    {
                        type: 'label',
                        classList: ['col-4', 'col-form-label', 'd-flex', 'align-items-center', 'fw-bold'],
                        attributes: [{ id: 'for', value: `${index}|demerit` }],
                        innerText: 'Demerits'
                    },
                    {
                        type: 'input',
                        classList: ['col', 'form-control', 'me-2'],
                        attributes: [
                            { id: 'id', value: `${index}|demerit` },
                            { id: 'type', value: 'number' },
                            { id: 'name', value: `${page.toLowerCase()}[${index}][action][demerits]` },
                            { id: 'value', value: '0' }
                        ]
                    }
                ]),
                selectElement('Rule', page, index),
                {
                    classList: ['col-12', 'd-none'],
                    attributes: [{ id: 'visibility', value: 'hidden' }],
                    children: [
                        {
                            classList: ['row', 'mx-0', 'px-4'],
                            children: [
                                {
                                    type: 'p',
                                    classList: ['mb-0', 'text-overflow', 'text-muted', 'rule-description'],
                                    attributes: [
                                        { id: 'readonly', value: '' },
                                        { id: 'rows', value: '1' }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                commentsElement(page, index),
                removeButtonElement(page)
            ];
            for (const action of actions) element.splice(element.length - 2, 0, titlesElement(action, index));
            return element;
        };

        function drinkElement(index) {
            const page = 'Drink';
            return [
                dateElement(page, index),
                selectElement('Player', page, index),
                columnElementWrapper([
                    {
                        type: 'label',
                        classList: ['col-4', 'col-form-label', 'd-flex', 'align-items-center', 'fw-bold'],
                        attributes: [{ id: 'for', value: `${index}|drink` }],
                        innerText: 'Drinks'
                    },
                    {
                        type: 'input',
                        classList: ['col', 'form-control', 'me-2'],
                        attributes: [
                            { id: 'id', value: `${index}|drink` },
                            { id: 'type', value: 'number' },
                            { id: 'name', value: `${page.toLowerCase()}[${index}][value]` },
                            { id: 'value', value: '0' },
                            { id: 'min', value: '0' }
                        ]
                    }
                ]),
                commentsElement(page, index),
                removeButtonElement(page)
            ];
        };
        
        const page = this.dataset.page;
        const sections = Array.from(document.querySelectorAll('section'));
        const index = parseInt(sections[sections.length - 1].querySelector('input').getAttribute('id').match(/(\d+)\|(.+)/)[1]) + 1;
        const parentElement = this.closest('form');
        const lastElement = this.closest('.col-12');
        const newElement = createElement(sectionElementWrapper(page === 'Drink' ? drinkElement(index) : demeritElement(index)));        

        parentElement.insertBefore(newElement, lastElement);

    });
})();