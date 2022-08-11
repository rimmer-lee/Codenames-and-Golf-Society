const GAME_SELECT_SELECTOR = `select.form-select${gameElementId('game')}`;
const gamePlayersSelector = gameElementId('players');

function addGame() {
    const gameAccordionElement = this.closest('.row').querySelector('.accordion');
    const gameAccordionParentElement = gameAccordionElement.parentElement;
    const selectedPlayers = Array.from(document.querySelectorAll(playerSelectSelector)).filter(({ value }) => value && value !== 'Select Player').length;
    const gameIndex = ++gameAccordionElement.children.length;
    const gameReference = `game-${gameIndex}`;
    const handicapMultiplierId = `${gameReference}|handicap-multiplier`;
    const newItemElementObject = {
        classList: ['accordion-item'],
        children: [
            {
                type: 'h2',
                classList: ['accordion-header'],
                attributes: [{ id: 'id', value: `${gameReference}|heading` }

                ],
                children: [
                    {
                        type: 'button',
                        classList: ['accordion-button'],
                        attributes: [
                            { id: 'aria-controls', value: gameReference },
                            { id: 'aria-expanded', value: 'true' },
                            { id: 'data-bs-target', value: `#${gameReference}` },
                            { id: 'data-bs-toggle', value: 'collapse' },
                            { id: 'title', value: `Game ${gameIndex}` },
                            { id: 'type', value: 'button' }
                        ],
                        innerText: `Game ${gameIndex}`
                    }
                ]
            },
            {
                classList: ['accordion-collapse', 'collapse', 'show'],
                attributes: [
                    { id: 'id', value: gameReference },
                    { id: 'aria-labelledby', value: `${gameReference}|heading` }
                ],
                children: [
                    {
                        classList: ['accordion-body'],
                        children: [
                            {
                                classList: ['row', 'gx-2', 'gy-3'],
                                children: [
                                    {
                                        classList: ['col-12'],
                                        children: [
                                            {
                                                classList: ['form-floating'],
                                                children: [
                                                    {
                                                        type: 'select',
                                                        classList: ['form-select', 'text-capitalize', 'text-wrap'],
                                                        attributes: [
                                                            { id: 'id', value: `${gameReference}|game` },
                                                            { id: 'name', value: `[game]['${gameIndex}'][game]` },
                                                            { id: 'aria-label', value: 'game select' }
                                                        ],
                                                        addEventListener: [
                                                            { type: 'change', listener: selectGame },
                                                            { type: 'change', listener: updateData },
                                                            { type: 'change', listener: updateDescription }
                                                        ],
                                                        children: [
                                                            {
                                                                type: 'option',
                                                                attributes: [
                                                                    { id: 'disabled', value: true },
                                                                    { id: 'selected', value: true }
                                                                ],
                                                                innerText: 'Select Game'
                                                            },
                                                            ...gameSelectOptions(selectedPlayers)
                                                        ]
                                                    },
                                                    {
                                                        type: 'label',
                                                        attributes: [{ id: 'for', value: `${gameReference}|game` }],
                                                        innerText: 'Game'
                                                    },
                                                    {
                                                        classList: ['invalid-feedback'],
                                                        children: [
                                                            {
                                                                classList: ['d-flex', 'justify-content-end'],
                                                                innerText: 'Please select a game.'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            descriptionElementObject(gameReference, 'game')
                                        ]
                                    },
                                    {
                                        classList: ['col-12', 'd-none'],
                                        attributes: [{ id: 'visibility', value: 'hidden' }],
                                        children: [
                                            {
                                                classList: ['align-items-center', 'd-flex', 'fixed-game-element-height', 'game-element', 'position-relative'],
                                                children: [
                                                    {
                                                        classList: ['align-items-center', 'd-flex', 'flex-fill', 'justify-content-evenly'],
                                                        children: ROUND_TYPES.filter(({ end, start }) => start !== 0 || end !== 0)
                                                            .map(({ name }) => {
                                                                const value = `${gameReference}|round|${name}`;
                                                                return {
                                                                    classList: ['form-check', 'form-check-inline'],
                                                                    children: [
                                                                        {
                                                                            type: 'input',
                                                                            classList: ['form-check-input'],
                                                                            attributes: [
                                                                                { id: 'id', value },
                                                                                { id: 'name', value: `[game]['${gameIndex}'][round]` },
                                                                                { id: 'type', value: 'radio' },
                                                                                { id: 'value', value: name }
                                                                            ],
                                                                            addEventListener: [{ type: 'change', listener: updateData }]
                                                                        },
                                                                        {
                                                                            type: 'label',
                                                                            classList: ['form-check-label'],
                                                                            attributes: [{ id: 'for', value }],
                                                                            innerText: `${name[0].toUpperCase()}${name.substring(1)}`
                                                                        }
                                                                    ]
                                                                };
                                                            })
                                                    },
                                                    {
                                                        classList: ['floating-label'],
                                                        innerText: 'Round'
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
                                                classList: ['align-items-center', 'd-flex', 'fixed-game-element-height', 'game-element', 'position-relative'],
                                                children: [
                                                    {
                                                        classList: ['align-items-center', 'd-flex', 'flex-fill', 'justify-content-evenly'],
                                                        children: []
                                                    },
                                                    {
                                                        classList: ['floating-label'],
                                                        innerText: 'Scoring'
                                                    }
                                                ]
                                            },
                                            descriptionElementObject(gameReference, 'scoring')
                                        ]
                                    },
                                    {
                                        classList: ['col-12', 'd-none'],
                                        attributes: [{ id: 'visibility', value: 'hidden' }],
                                        children: [
                                            {
                                                classList: ['fixed-game-element-height', 'game-element', 'position-relative'],
                                                children: [
                                                    {
                                                        classList: ['row', 'row-cols-1'],
                                                        children: [
                                                            {
                                                                classList: ['col'],
                                                                children: [
                                                                    {
                                                                        classList: ['align-items-center', 'd-flex', 'flex-fill', 'justify-content-evenly'],
                                                                        children: GAMES.handicap
                                                                            .sort((a, b) => a.order - b.order)
                                                                            .map(({ id: v, value: innerText }) => {
                                                                                const value = `${gameReference}|handicap|type|${v}`;
                                                                                return {
                                                                                    classList: ['form-check', 'form-check-inline'],
                                                                                    children: [
                                                                                        {
                                                                                            type: 'input',
                                                                                            classList: ['form-check-input'],
                                                                                            attributes: [
                                                                                                { id: 'id', value },
                                                                                                { id: 'disabled', value: true },
                                                                                                { id: 'name', value: `[game]['${gameIndex}'][handicap][type]` },
                                                                                                { id: 'type', value: 'radio' },
                                                                                                { id: 'value', value: v }
                                                                                            ],
                                                                                            addEventListener: [
                                                                                                { type: 'change', listener: updateData },
                                                                                                { type: 'change', listener: updateDescription }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            type: 'label',
                                                                                            classList: ['form-check-label'],
                                                                                            attributes: [{ id: 'for', value }],
                                                                                            innerText
                                                                                        }
                                                                                    ]
                                                                                };
                                                                            })
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                classList: ['col', 'd-none'],
                                                                attributes: [{ id: 'visibility', value: 'hidden' }],
                                                                children: [
                                                                    {
                                                                        classList: ['row'],
                                                                        children: [
                                                                            {
                                                                                classList: ['col-6', 'mx-auto'],

                                                                                children: [
                                                                                    {
                                                                                        classList: ['input-group', 'pb-1', 'pt-3'],
                                                                                        children: [
                                                                                            {
                                                                                                type: 'label',
                                                                                                classList: ['input-group-text'],
                                                                                                attributes: [{ id: 'for', value: handicapMultiplierId }],
                                                                                                innerText: 'Multiplier'
                                                                                            },
                                                                                            {
                                                                                                type: 'input',
                                                                                                classList: ['form-control', 'text-end'],
                                                                                                attributes: [
                                                                                                    { id: 'id', value: handicapMultiplierId },
                                                                                                    { id: 'min', value: '0' },
                                                                                                    { id: 'name', value: `[game]['${gameIndex}'][handicap][multiplier]` },
                                                                                                    { id: 'step', value: '0.01' },
                                                                                                    { id: 'type', value: 'number' },
                                                                                                    { id: 'value', value: '100.00' }
                                                                                                ],
                                                                                                addEventListener: [
                                                                                                    { type: 'input', listener: updateDescription },
                                                                                                    { type: 'change', listener: function() {
                                                                                                        return this.value = parseFloat(this.value).toFixed(2);
                                                                                                    } },
                                                                                                    { type: 'change', listener: updateData }
                                                                                                ]
                                                                                            },
                                                                                            {
                                                                                                classList: ['input-group-text'],
                                                                                                innerText: '%'
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]

                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                classList: ['floating-label'],
                                                                innerText: 'Handicap'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            descriptionElementObject(gameReference, 'handicap'),
                                            descriptionElementObject(gameReference, 'handicap-multiplier')
                                        ]
                                    },
                                    {
                                        classList: ['col-12', 'd-none'],
                                        attributes: [{ id: 'visibility', value: 'hidden' }],
                                        children: [
                                            {
                                                classList: ['game-element'],
                                                children: [
                                                    {
                                                        classList: ['row', 'g-3', 'p-3'],
                                                        attributes: [{ id: 'id', value: `${gameReference}|players` }],
                                                        children: []
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
                                                classList: ['form-floating'],
                                                children: [
                                                    {
                                                        type: 'select',
                                                        classList: ['form-select', 'text-capitalize', 'text-wrap'],
                                                        attributes: [
                                                            { id: 'id', value: `${gameReference}|method` },
                                                            { id: 'name', value: `[game]['${gameIndex}'][method]` },
                                                            { id: 'aria-label', value: 'game method' }
                                                        ],
                                                        addEventListener: [
                                                            { type: 'change', listener: updateData },
                                                            { type: 'change', listener: updateDescription }
                                                        ],
                                                        children: [
                                                            {
                                                                type: 'option',
                                                                attributes: [
                                                                    { id: 'disabled', value: true },
                                                                    { id: 'selected', value: true }
                                                                ],
                                                                innerText: 'Select Method'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        type: 'label',
                                                        attributes: [{ id: 'for', value: `${gameReference}|method` }],
                                                        innerText: 'Method'
                                                    }
                                                ]
                                            },
                                            descriptionElementObject(gameReference, 'method')
                                        ]
                                    },
                                    {
                                        classList: ['col-12'],
                                        children: [
                                            {
                                                type: 'input',
                                                classList: ['btn', 'btn-danger', 'w-100'],
                                                attributes: [
                                                    { id: 'type', value: 'button' },
                                                    { id: 'value', value: 'Remove Game' }
                                                ],
                                                addEventListener: [{ listener: removeGame }]
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
    gameAccordionElement.insertBefore(createElement(newItemElementObject), null);
    document.getElementById(`${gameReference}|round|full`).checked = true;
    toggleVisibility(gameAccordionParentElement);
};

function addPlayerToGame(game, player, innerText) {
    const value = `${game}|${player}|participation`;
    document.getElementById(`${game}|players`).insertBefore(createElement({
        classList: ['col-12'],
        children: [
            {
                classList: ['border', 'border-1', 'rounded', 'p-2'],
                children: [
                    {
                        classList: ['row', 'g-2'],
                        children: [
                            {
                                classList: ['align-items-center', 'col', 'd-flex', 'justify-content-center'],
                                children: [
                                    {
                                        classList: ['form-check', 'form-switch'],
                                        children: [
                                            {
                                                type: 'input',
                                                classList: ['form-check-input'],
                                                attributes: [
                                                    { id: 'id', value },
                                                    { id: 'name', value: `[game]['${getGameIndex(game)}'][${player}][participation]` },
                                                    { id: 'type', value: 'checkbox' },
                                                    { id: 'value', value }
                                                ],
                                                addEventListener: [{ type: 'change', listener: changeParticipation }]
                                            },
                                            {
                                                type: 'label',
                                                classList: ['form-check-label', 'text-muted'],
                                                attributes: [{ id: 'for', value }],
                                                innerText
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
    }), null);
};

function changeParticipation() {
    const gameReference = getGameReference(this);
    const participationCheckboxes = Array.from(document.querySelectorAll(`[id="${gameReference}|players"] input[type=checkbox]`));
    const participationLabelElement = this.parentElement.querySelector('label');
    const gameSelectValue = document.getElementById(`${gameReference}|game`).value;

    // need to check if it all exists
    const { for: f, maximum, minimum } = GAMES.game.find(({ id }) => id === gameSelectValue).filters.players;

    const { checked } = this;
    participationLabelElement.classList.toggle('text-muted', !checked);
    participationLabelElement.classList.toggle('fw-bold', checked);
    if (f.includes('team')) {
        const participatingPlayers = participationCheckboxes.filter(({ checked }) => checked).length;
        const teamNames = (function() {
            const length = Math.min(maximum || participatingPlayers, participatingPlayers);
            const startingValue = +(maximum === minimum) - 1;
            const defaultTeamNames = Array.from({ length }, (_, i) => i + startingValue).map(i => {
                if (i < 0) return { id: 'none', value: 'None' };
                const id = letterFromNumber(i);
                const value = id.toUpperCase();
                return { id, value };
            });
            const idStart = `${(participationCheckboxes.find(({ checked }) => checked)?.id || '').split('|participation')[0]}|team-`;
            if (!document.querySelector(`[id^="${idStart}"][id$="|name"]`)) return defaultTeamNames;
            return defaultTeamNames.map(({ id, value: v }) => {
                const value = document.getElementById(`${idStart}${id}}|name`)?.value || v;
                return { id, value };
            });
        })();
        for (const participationCheckbox of participationCheckboxes) {
            const participationCheckboxRow = participationCheckbox.closest('.row');
            const radioButton = participationCheckboxRow.querySelector('input.form-check-input[type=radio]');
            const checkedId = (participationCheckboxRow.querySelector('input.form-check-input[type=radio]:checked') || {}).value || teamNames[0].id;
            const [ , playerReference ] = participationCheckbox.id.split('|');
            if (radioButton) radioButton.closest('.col').remove();
            if (!participationCheckbox.checked || participatingPlayers < 3) continue;
            participationCheckbox.closest('.row').insertBefore(createElement({
                classList: ['col'],
                children: [
                    {
                        classList: ['g-2', 'row', 'row-cols-1'],
                        children: teamNames.map(({ id, value }) => teamRadioButtonObject(gameReference, playerReference, id, value, checkedId))
                    }
                ]
            }), null);
        };
        updateMethodSelect.call(this);
    };
    updateData();
};

function changeScoringType() {
    const { id, value } = this;
    const [ gameReference ] = id.split('|');
    const handicapAdjustmentInput = document.getElementById(`${gameReference}|handicap-multiplier`);
    const handicapRadioButtons = document.querySelectorAll(`input[id^="${gameReference}|handicap|type|"][type="radio"]`);
    const firstHandicapRadioButton = handicapRadioButtons[0];
    const enableHandicap = value !== 'shots'
    toggleVisibility(firstHandicapRadioButton.closest('.col-12'), enableHandicap);
    toggleVisibility(handicapAdjustmentInput.closest('.fixed-game-element-height.game-element.position-relative .col'), enableHandicap);
    for (const button of handicapRadioButtons) button.disabled = !enableHandicap;
    handicapAdjustmentInput.disabled = !enableHandicap;
    firstHandicapRadioButton.checked = true;
    updateDescription.call(this);
    updateDescription.call(firstHandicapRadioButton);
};

function changeTeam() {
    updateMethodSelect.call(this);
    updateData();
};

function descriptionElementObject(gameReference, descriptionReference) {
    return {
        classList: ['d-none', 'pt-2', 'px-4'],
        attributes: [{ id: 'visibility', value: 'hidden' }],
        children: [
            {
                type: 'p',
                classList: ['mb-0', 'text-center', 'text-overflow', 'text-muted'],
                attributes: [
                    { id: 'id', value: `${gameReference}|${descriptionReference}-description` },
                    { id: 'readonly', value: true },
                    { id: 'rows', value: '1' }
                ]
            }
        ]
    };
};

function gameElementId(value) {
    return `[id^="game-"][id*="|${value}"]`;
};

function gameSelectOptions(players) {
    return GAMES.game.filter(({ filters }) => players >= filters.players.minimum)
        .sort((a, b) => a.order - b.order)
        .map(({ id: value, value: innerText }) => {
            return {
                type: 'option',
                attributes: [{ id: 'value', value }],
                innerText
            }
        })
};

function getGameIndex(id) {
    return (id.match(/game\-(\d+)/) || Array.from({ length: 2 }))[1];
};

function getGameReference(element) {
    return element.id.split('|')[0];
};

function handleTeamNameChanges() {
    const { id, value } = this;
    const [ , gameIndex, teamValue ] = (id.match(/game\-(\d+)\|.*\|team\-(\w+)\|name/) || Array.from({ length: 3 }))
    for (const element of Array.from(document.querySelectorAll(`[id^="game-${gameIndex}|"][id$="|team-${teamValue}|name"]:not([id="${id}"])`))) element.value = value;
    updateData();
};

function removeGame() {
    const gameAccordionElement = this.closest('.accordion');
    const gameAccordionParentElement = gameAccordionElement.parentElement;
    this.closest('.accordion-item').remove();
    toggleVisibility(gameAccordionParentElement, gameAccordionElement.children.length > 0);
    document.querySelectorAll(GAME_SELECT_SELECTOR).forEach((gameSelect, index) => {
        const gameIndex = getGameIndex(gameSelect.id);
        if (!gameIndex) return;
        // updateAttributes(
        //     ['aria-controls', 'aria-labelledby', 'data-bs-target', 'for', 'id', 'name', 'title', 'value'],
        //     gameIndex,
        //     index + 1
        // );

        for (const idElement of document.querySelectorAll(`[id*="${gameIndex}"]`)) {
            idElement.id = idElement.id.replaceAll(gameIndex, index + 1);
        };
        for (const nameElement of document.querySelectorAll(`[name*="${gameIndex}"]`)) {
            nameElement.name = nameElement.name.replaceAll(gameIndex, index + 1);
        };

        for (const ariaControlsElement of document.querySelectorAll(`[aria-controls*="${gameIndex}"]`)) {
            ariaControlsElement.attributes['aria-controls'].value = ariaControlsElement.attributes['aria-controls'].value.replaceAll(gameIndex, index + 1);
        };
        for (const ariaLabelledByElement of document.querySelectorAll(`[aria-labelledby*="${gameIndex}"]`)) {
            ariaLabelledByElement.attributes['aria-labelledby'].value = ariaLabelledByElement.attributes['aria-labelledby'].value.replaceAll(gameIndex, index + 1);
        };
        for (const bsTargetElement of document.querySelectorAll(`[data-bs-target*="${gameIndex}"]`)) {
            bsTargetElement.attributes['data-bs-target'].value = bsTargetElement.attributes['data-bs-target'].value.replaceAll(gameIndex, index + 1);
        };
        for (const forElement of document.querySelectorAll(`[for*="${gameIndex}"]`)) {
            forElement.attributes.for.value = forElement.attributes.for.value.replaceAll(gameIndex, index + 1);
        };

        for (const titleElement of document.querySelectorAll(`[title*="${gameIndex}"]`)) {
            const titleValue = titleElement.attributes.title.value.replaceAll(gameIndex, index + 1);
            titleElement.attributes.title.value = titleValue;
            titleElement.innerText = titleValue;
        };

    });
    updateData();
};

function selectGame() {
    const gameReference = getGameReference(this);
    const gamePlayersElement = document.getElementById(`${gameReference}|players`);
    const gameHandicapParent = document.getElementById(`${gameReference}|handicap-description`).closest('.col-12');
    const handicapRadioButtons = document.querySelectorAll(`input${gameElementId('handicap|type|')}[type="radio"]`);
    const gameMethodSelect = document.getElementById(`${gameReference}|method`);
    const gameRoundParent = this.closest('.accordion-body').querySelector(`input${gameElementId('round')}[type="radio"]`).closest('.col-12');

    // find a better way to select the element
    const gameScoringParent = document.getElementById(`${gameReference}|scoring-description`).closest('.col-12').querySelector('.align-items-center.d-flex.flex-fill.justify-content-evenly');

    this.classList.remove('is-invalid');
    toggleVisibility(gameHandicapParent, false);
    toggleVisibility(gameMethodSelect.closest('.col-12'), false);
    toggleVisibility(gamePlayersElement.closest('.col-12'), false);
    toggleVisibility(gameRoundParent, false);
    toggleVisibility(gameScoringParent.closest('.col-12'), false);
    updateDescription.call(this);
    for (const handicap of handicapRadioButtons) handicap.disabled = true;
    while (gameMethodSelect.children.length > 0) gameMethodSelect.children[0].remove();
    while (gamePlayersElement.children.length > 0) gamePlayersElement.children[0].remove();
    while (gameScoringParent.children.length > 0) gameScoringParent.children[0].remove();
    if (!this.value || this.value === 'Select Game') return this.classList.add('is-invalid');
    const playerSelects = Array.from(document.querySelectorAll(playerSelectSelector)).filter(({ value }) => value && value !== 'Select Player');
    const { filters, players } = GAMES.game.find(({ id }) => id === this.value);
    if (players?.minimum > playerSelects.length) {
        this.children[0].selected = true;
        return this.classList.add('is-invalid');
    };
    const gameIndex = getGameIndex(gameReference) || 0;
    const scoringValues = GAMES.scoring.filter(({ id }) => filters.scoring.includes(id)).sort((a, b) => a.order - b.order);
    toggleVisibility(gamePlayersElement.closest('.col-12'));
    toggleVisibility(gameRoundParent);
    toggleVisibility(gameScoringParent.closest('.col-12'));
    for (const playerSelect of playerSelects) {
        const { id, selectedIndex } = playerSelect;
        const [ playerReference ] = id.split('|');
        const playerName = playerSelect[selectedIndex].innerText;
        addPlayerToGame(gameReference, playerReference, playerName);
    };
    for (const scoring of scoringValues) {
        const { id, value: innerText } = scoring;
        const value = `${gameReference}|scoring|${id}`;
        gameScoringParent.insertBefore(createElement({
            classList: ['form-check', 'form-check-inline'],
            children: [
                {
                    type: 'input',
                    classList: ['form-check-input'],
                    attributes: [
                        { id: 'id', value },
                        { id: 'name', value: `[game]['${gameIndex}'][scoring]` },
                        { id: 'type', value: 'radio' },
                        { id: 'value', value: id }
                    ],
                    addEventListener: [
                        { type: 'change', listener: changeScoringType },
                        { type: 'change', listener: updateData },
                        { type: 'change', listener: updateDescription }
                    ]
                },
                {
                    type: 'label',
                    classList: ['form-check-label'],
                    attributes: [{ id: 'for', value }],
                    innerText
                }
            ]
        }), null);
    };
    const firstScoringRadioButton = gameScoringParent.querySelector(`input${gameElementId('scoring|')}`);
    firstScoringRadioButton.checked = true;
    changeScoringType.call(firstScoringRadioButton);
};

function teamRadioButtonObject(game, player, teamId, teamName, checkedValue) {
    const gameIndex = getGameIndex(game);
    const value = `${game}|${player}|team-${teamId}`;
    const teamNameId = `${value}|name`;
    const noneTeam = teamId === 'none';
    const teamRadioButtonObject = {
        classList: noneTeam ? ['form-check', 'form-check-inline'] : ['d-flex', 'custom-name-element'],
        children: [
            {
                type: 'input',
                classList: noneTeam ? ['form-check-input'] : ['form-check-input', 'me-2', 'my-auto'],
                attributes: [
                    { id: 'id', value },
                    { id: 'name', value: `[game]['${gameIndex}'][${player}][team]` },
                    { id: 'type', value: 'radio' },
                    { id: 'value', value: teamId }
                ],
                addEventListener: [{ type: 'change', listener: changeTeam }]
            },
            {
                type: 'label',
                classList: noneTeam ? ['form-check-label', 'ps-3'] : ['flex-fill', 'form-check-label'],
                attributes: [{ id: 'for', value }]
            }
        ]
    };
    if (checkedValue === teamId) teamRadioButtonObject.children[0].attributes.push({ id: 'checked', value: true});
    if (noneTeam) teamRadioButtonObject.children[1].innerText = 'None';
    else teamRadioButtonObject.children[1].children = [
            {
                type: 'input',
                classList: ['form-control'],
                attributes: [
                    { id: 'id', value: teamNameId },
                    { id: 'name', value: `[game]['${gameIndex}'][team][${teamId}]` },
                    { id: 'value', value: teamName }
                ],
                addEventListener: [{ type: 'input', listener: handleTeamNameChanges }]
            },
            {
                type: 'label',
                classList: ['d-none'],
                attributes: [
                    { id: 'for', value: teamNameId },
                    { id: 'visibility', value: 'hidden' }
                ]
            }
        ];
    return teamRadioButtonObject;
};

function updateDescription() {
    const { id, value } = this;
    const [ gameReference, type ] = id.split('|');
    const { description } = GAMES[type]?.find(({ id }) => id === value) ||
        {
            calculations: {
                get calculated() {
                    return this.format(0.1 * value);
                },
                get decimal() {
                    return this.format(this.calculated);
                },
                format: function(number) {
                    return +parseFloat(number).toFixed(2);
                },
                get rounded() {
                    return Math.floor(this.calculated);
                }
            },
            get description() {
                const { calculations, rounding } = this;
                const { rounded, decimal } = calculations;
                return `Handicaps will be adjusted by ${value}%. For example, a handicap of 10 will be adjusted to ${rounded} (10 x ${value}% = ${decimal}${rounding}).`
            },
            get rounding() {
                const { calculated, rounded } = this.calculations;
                return rounded === calculated ? '' : ` which is rounded down to ${rounded}`;
            }
        };
    const descriptionElement = document.getElementById(`${gameReference}|${type}-description`);
    descriptionElement.innerText = description;
    toggleVisibility(descriptionElement.parentElement, !!description);
};

function updateGameOptions() {
    const gameSelects = document.querySelectorAll(GAME_SELECT_SELECTOR);
    const selectedPlayers = Array.from(document.querySelectorAll(playerSelectSelector)).filter(({ value }) => value && value !== 'Select Player').length;
    for (const gameSelect of gameSelects) {
        const currentValue = gameSelect.value;
        while (gameSelect.children.length > 1) gameSelect.children[1].remove();
        for (const option of gameSelectOptions(selectedPlayers)) gameSelect.insertBefore(createElement(option), null);
        const selectedOption = Array.from(gameSelect.children).find(({ value }) => value === currentValue);
        if (selectedOption) selectedOption.selected = true;
        else gameSelect.children[0].selected = true;
        selectGame.call(gameSelect);
    };
};

function updateMethodSelect() {
    const gameReference = getGameReference(this);
    const gameMethodSelect = document.getElementById(`${gameReference}|method`);
    const gameSelectValue = document.getElementById(`${gameReference}|game`).value;
    const gameMethods = (GAMES.game.find(({ id }) => id === gameSelectValue) || { filters: { method: GAMES.method }}).filters.method;
    if (!gameMethods) return;
    const methods = GAMES.method.filter(({ id }) => gameMethods.includes(id));
    toggleVisibility(gameMethodSelect.closest('.col-12'), false);
    while (gameMethodSelect.children.length > 0) gameMethodSelect.children[0].remove();
    if (!methods || methods.length === 0) return;
    const teams = [ ...new Set(Array.from(document.querySelectorAll(`[id^="${gameReference}|"][id*="|team-"]:not([id$="none"]):checked`)).map(({ value }) => value)) ]
        .map(team => ({ players: document.querySelectorAll(`[id^="${gameReference}|"][id$="|team-${team}"]:checked`).length, team }));
    if (teams.length <= 1) return;
    const equalTeams = teams.every(({ players }) => teams[0].players === players);
    const methodsToAdd = methods.filter(({ filters }) => ((filters.teams.even ? equalTeams : true) && teams.every(({ players }) => players >= filters.teams.minimum)))
        .map(({ id: value, value: v }) => ({ v, value }));
    toggleVisibility(gameMethodSelect.closest('.col-12'));
    for (const method of methodsToAdd) {
        const { v, value } = method;
        appendOption(v, gameMethodSelect, [{ id: 'value', value }]);
    };
};

document.getElementById('play-game').addEventListener('click', addGame);