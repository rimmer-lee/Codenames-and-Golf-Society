function addDemerit() {
    const modal = this.closest('.modal');
    const modalBody = modal.querySelector('.modal-body > .row.gy-2');
    const [ , player, hole ] = modal.id.split('|');
    const index = modalBody.childElementCount;
    modalBody.insertBefore(createElement(demeritObject(player, hole, index)), modalBody.querySelector('.btn.btn-success').closest('.col-11.border.border-1.rounded-3.mx-auto.p-3'));
    updateDemeritButtons(player, hole);
    updateReferences();
    updateCloseButtons(modal);
};

function demeritObject(player, hole, index) {
    const { value } = document.getElementById('date');
    const currentRules = rules.find(({ date }) => {
        const { end, start } = date;
        return value <= end && value >= start;
    }) || rules[rules.length - 1];
    const demeritObject = {
        classList: ['col-11', 'border', 'border-1', 'rounded-3', 'mx-auto', 'p-3'],
        children: [
            {
                classList: ['row', 'gy-3'],
                children: [
                    {
                        classList: ['col-12'],
                        children: [
                            {
                                classList: ['row', 'd-flex', 'align-items-center'],
                                children: [
                                    {
                                        type: 'label',
                                        classList: ['col-4', 'col-form-label'],
                                        attributes: [{ id: 'for', value: `demerit-${player}-${hole}-rule-${index}` }],
                                        innerText: 'Rule'
                                    },
                                    {
                                        type: 'select',
                                        classList: ['col', 'form-select', 'me-2'],
                                        attributes: [
                                            { id: 'id', value: `demerit-${player}-${hole}-rule-${index}` },
                                            { id: 'name', value: `[${player}][demerit]['${hole}']['${index}'][rule]` },
                                            { id: 'required', value: '' }
                                        ],
                                        addEventListener: [
                                            { type: 'blur', listener: validation },
                                            { type: 'change', listener: updateData },
                                            { type: 'change', listener: updateDescription }
                                        ],
                                        children: [
                                            {
                                                type: 'option',
                                                attributes: [
                                                    { id: 'selected', value: 'true' },
                                                    { id: 'disabled', value: 'true' }
                                                ],
                                                innerText: 'Select Rule'
                                            }
                                        ]
                                    },
                                    {
                                        classList: ['invalid-feedback'],
                                        children: [
                                            {
                                                classList: ['d-flex', 'justify-content-end'],
                                                innerText: 'Please select a rule.'
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
                                classList: ['row', 'd-flex', 'align-items-center'],
                                children: [
                                    {
                                        type: 'label',
                                        classList: ['col-4', 'col-form-label'],
                                        attributes: [{ id: 'for', value: `demerit-${player}-${hole}-demerits-${index}` }],
                                        innerText: 'Demerits'
                                    },
                                    {
                                        type: 'input',
                                        classList: ['col', 'form-control', 'me-2'],
                                        attributes: [
                                            { id: 'id', value: `demerit-${player}-${hole}-demerits-${index}` },
                                            { id: 'type', value: 'number' },
                                            { id: 'value', value: '' },
                                            { id: 'name', value: `[${player}][demerit]['${hole}']['${index}'][demerits]` }
                                        ],
                                        addEventListener: [{ type: 'change', listener: updateData }]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        classList: ['col-12', 'd-none'],
                        attributes: [{ id: 'visibility', value: 'hidden' }],
                        children: [
                            {
                                classList: ['row', 'mx-0', 'px-4'],
                                children: [
                                    {
                                        type: 'p',
                                        classList: ['rule-description', 'mb-0', 'text-overflow', 'text-muted'],
                                        attributes: [
                                            { id: 'readonly', value: 'true' },
                                            { id: 'rows', value: '1' }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        classList: ['col-12', 'px-2'],
                        children: [
                            {
                                classList: ['form-floating'],
                                children: [
                                    {
                                        type: 'textarea',
                                        classList: ['form-control'],
                                        attributes: [
                                            { id: 'id', value: `demerit-${player}-${hole}-comments-${index}` },
                                            { id: 'placeholder', value: 'Comments' },
                                            { id: 'name', value: `[${player}][demerit]['${hole}']['${index}'][comments]` }
                                        ],
                                        addEventListener: [{ type: 'change', listener: updateData }]
                                    },
                                    {
                                        type: 'label',
                                        attributes: [{ id: 'for', value: `demerit-${player}-${hole}-comments-${index}` }],
                                        innerText: 'Comments'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        classList: ['col-12', 'px-2'],
                        children: [
                            {
                                classList: ['row', 'mx-0'],
                                addEventListener: [{ listener: removeDemerit }],
                                children: [
                                    {
                                        classList: ['btn', 'btn-danger'],
                                        innerText: 'Remove Demerit'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
    for (const rule of currentRules.rules.sort((a, b) => a.index - b.index)) {
        demeritObject.children[0].children[0].children[0].children[1].children.push({
            type: 'option',
            attributes: [{ id: 'value', value: rule._id }],
            innerText: `${rule.index}. ${rule.description[0]}`
        });
    };
    for (const action of actions) {
        const actionElementObject = {
            classList: ['col-12'],
            children: [
                {
                    classList: ['row', 'd-flex', 'align-items-center'],
                    children: [
                        {
                            classList: ['col-4', 'col-form-label'],
                            innerText: `${action.title} Title`
                        },
                        {
                            classList: ['col', 'px-0'],
                            children: [
                                {
                                    classList: ['row', 'me-0'],
                                    children: [
                                        {
                                            classList: ['btn-group', 'pe-2'],
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
                    ]
                }
            ]
        };
        for (const title of titles) {
            const reference = `demerit-${player}-${hole}-${action.method}|${title.id}-${index}`;
            actionElementObject.children[0].children[1].children[0].children[0].children.push(
                {
                    type: 'input',
                    classList: ['btn-check'],
                    attributes: [
                        { id: 'id', value: reference },
                        { id: 'type', value: 'checkbox' },
                        { id: 'value', value: `${action.method}|${title.value}` },
                        { id: 'name', value: `[${player}][demerit]['${hole}']['${index}'][${action.method}|${title.id}]` }
                    ],
                    addEventListener: [{ listener: updateData }]
                },
                {
                    type: 'label',
                    classList: ['btn', `btn-outline-${action.class}`],
                    attributes: [{ id: 'for', value: reference }],
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
                }
            );
        };
        demeritObject.children[0].children.splice(demeritObject.children[0].children.length - 2, 0, actionElementObject);
    };
    return demeritObject;
};

function updateDemeritButtons(player, hole, demeritsExist = true) {
    if (!player || !hole) return false;
    const demeritButtons = document.querySelectorAll(`[data-bs-toggle="modal"][data-bs-target="#demerit\\\\|${player}\\\\|${hole.replace(/'/g, '')}"]`);
    if (!demeritButtons) return false;
    for (const demeritButton of demeritButtons) {
        if (demeritsExist) {
            demeritButton.classList.remove('btn-success');
            demeritButton.classList.add('btn-primary');
            continue;
        };
        demeritButton.classList.remove('btn-primary');
        demeritButton.classList.add('btn-success');
    };
    return true;
};