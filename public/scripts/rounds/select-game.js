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
                                                            { type: 'change', listener: updateGameOptionDescription }
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
                                                classList: ['fixed-game-element-height', 'game-element', 'position-relative'],
                                                children: [
                                                    {
                                                        classList: ['g-1', 'pt-1', 'row'],
                                                        children: ROUND_TYPES
                                                            .filter(({ end, start }) => start !== 0 || end !== 0)
                                                            .sort((a, b) => a.order - b.order)
                                                            .map(({ id, value: innerText }) => {
                                                                const value = `${gameReference}|round|${id}`;
                                                                return {
                                                                    classList: ['col'],
                                                                    children: [
                                                                        {
                                                                            classList: ['d-flex', 'justify-content-center'],
                                                                            children: [
                                                                                {
                                                                                    classList: ['form-check', 'form-check-inline'],
                                                                                    children: [
                                                                                        {
                                                                                            type: 'input',
                                                                                            classList: ['form-check-input'],
                                                                                            attributes: [
                                                                                                { id: 'id', value },
                                                                                                { id: 'name', value: `[game]['${gameIndex}'][round]` },
                                                                                                { id: 'type', value: 'radio' },
                                                                                                { id: 'value', value: id }
                                                                                            ],
                                                                                            addEventListener: [{ type: 'change', listener: updateData }]
                                                                                        },
                                                                                        {
                                                                                            type: 'label',
                                                                                            classList: ['form-check-label'],
                                                                                            attributes: [{ id: 'for', value }],
                                                                                            innerText
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
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
                                                classList: ['fixed-game-element-height', 'game-element', 'position-relative'],
                                                children: [
                                                    {
                                                        classList: ['g-1', 'pt-1', 'row'],
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
                                                                        classList: ['g-1', 'pt-1', 'row'],
                                                                        children: GAMES.handicap
                                                                            .sort((a, b) => a.order - b.order)
                                                                            .map(({ id: v, value: innerText }) => {
                                                                                const value = `${gameReference}|handicap|type|${v}`;
                                                                                return {
                                                                                    classList: ['col'],
                                                                                    children: [
                                                                                        {
                                                                                            classList: ['d-flex', 'justify-content-center'],
                                                                                            children: [
                                                                                                {
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
                                                                                                                { type: 'change', listener: function() {
                                                                                                                    updateData();
                                                                                                                    updateGameOptionDescription.call(this);
                                                                                                                } }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            type: 'label',
                                                                                                            classList: ['form-check-label'],
                                                                                                            attributes: [{ id: 'for', value }],
                                                                                                            innerText
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                };
                                                                            })
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                classList: ['col'],
                                                                children: [
                                                                    {
                                                                        classList: ['row'],
                                                                        children: [
                                                                            {
                                                                                classList: ['col', 'col-sm-6', 'mx-auto'],
                                                                                children: [
                                                                                    {
                                                                                        classList: ['input-group', 'p-3', 'pb-1'],
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
                                                                                                    { type: 'input', listener: updateGameOptionDescription },
                                                                                                    { type: 'change', listener: function() {
                                                                                                        this.value = parseFloat(this.value).toFixed(2);
                                                                                                        updateData();
                                                                                                    } }
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
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        classList: ['floating-label'],
                                                        innerText: 'Handicap'
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
                                                        addEventListener: [{ type: 'change', listener: updateData }],
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
                        classList: ['g-2', 'px-2', 'row'],
                        children: [
                            {
                                classList: ['align-items-center', 'col-12', 'col-sm', 'd-flex', 'justify-content-center'],
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
    const checkedParticipationCheckboxes = participationCheckboxes.filter(({ checked }) => checked);
    const participatingPlayers = checkedParticipationCheckboxes.length;
    const participationLabelElement = this.parentElement.querySelector('label');
    const gameSelectValue = document.getElementById(`${gameReference}|game`).value;

    // need to check if it all exists
    const { for: f, maximum, minimum } = GAMES.game.find(({ id }) => id === gameSelectValue).filters.players;

    const { checked } = this;
    participationLabelElement.classList.toggle('text-muted', !checked);
    participationLabelElement.classList.toggle('fw-bold', checked);
    if (f.includes('team') && participatingPlayers > (minimum || 0)) {
        const gameReference = getGameReference(checkedParticipationCheckboxes[0]);
        const teamNames = (function() {
            const startingValue = +(maximum === minimum) - 1;
            const length = maximum || Math.floor(participatingPlayers / 2) - startingValue;
            const defaultTeamNames = Array.from({ length }, (_, i) => i + startingValue).map(i => {
                if (i < 0) return { id: 'none', value: 'None' };
                const id = letterFromNumber(i);
                return {id, value: id.toUpperCase() };
            });
            return defaultTeamNames.map(({ id, value: v }) => {
                const value = [ ...new Set(Array.from(document.querySelectorAll(`[id^="${gameReference}|"][id$="|team-${id}|name"]`))
                    .map(({ value }) => value)) ][0] || v;
                return { id, value };
            });
        })();
        for (const participationCheckbox of participationCheckboxes) {
            const participationCheckboxRow = participationCheckbox.closest('.row');
            const checkedId = participationCheckboxRow.querySelector('input.form-check-input[type=radio]:checked')?.value || teamNames[0]?.id;
            participationCheckboxRow.querySelector('input.form-check-input[type=radio]')?.closest('.col')?.remove();
            if (!participationCheckbox.checked || participatingPlayers < minimum) continue;
            const [ , playerReference ] = participationCheckbox.id.split('|');
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
    updateGameOptionDescription.call(this);
    updateGameOptionDescription.call(firstHandicapRadioButton);
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
    document.getElementById(id.split('|name')[0]).checked = true;
    updateData();
};

function removeGame() {
    const gameAccordionElement = this.closest('.accordion');
    const gameAccordionParentElement = gameAccordionElement.parentElement;
    this.closest('.accordion-item').remove();
    toggleVisibility(gameAccordionParentElement, gameAccordionElement.children.length > 0);
    document.querySelectorAll('#game > .accordion-body .accordion-item').forEach((element, index) => {
        const { id } = element.querySelector('[id^="game-"]:not(h2)');
        const gameIndex = getGameIndex(id);
        if (!gameIndex) return;

        // updateAttributes(
        //     ['aria-controls', 'aria-labelledby', 'data-bs-target', 'for', 'id', 'name', 'title', 'value'],
        //     gameIndex,
        //     index + 1
        // );

        for (const idElement of element.querySelectorAll(`[id^="${id}"]`)) {
            idElement.id = idElement.id.replaceAll(gameIndex, index + 1);
        };
        for (const nameElement of element.querySelectorAll(`[name^="[game]['${gameIndex}']"]`)) {
            nameElement.name = nameElement.name.replaceAll(gameIndex, index + 1);
        };
        for (const ariaControlsElement of element.querySelectorAll(`[aria-controls="${id}"]`)) {
            ariaControlsElement.attributes['aria-controls'].value = ariaControlsElement.attributes['aria-controls'].value.replaceAll(gameIndex, index + 1);
        };
        for (const ariaLabelledByElement of element.querySelectorAll(`[aria-labelledby="${id}|heading"]`)) {
            ariaLabelledByElement.attributes['aria-labelledby'].value = ariaLabelledByElement.attributes['aria-labelledby'].value.replaceAll(gameIndex, index + 1);
        };
        for (const bsTargetElement of element.querySelectorAll(`[data-bs-target="#${id}"]`)) {
            bsTargetElement.attributes['data-bs-target'].value = bsTargetElement.attributes['data-bs-target'].value.replaceAll(gameIndex, index + 1);
        };
        for (const forElement of element.querySelectorAll(`[for^="${id}|"]`)) {
            forElement.attributes.for.value = forElement.attributes.for.value.replaceAll(gameIndex, index + 1);
        };
        for (const titleElement of element.querySelectorAll(`[title="Game ${gameIndex}"]`)) {
            const titleValue = titleElement.attributes.title.value.replaceAll(gameIndex, index + 1);
            titleElement.attributes.title.value = titleValue;
            titleElement.innerText = titleValue;
        };
        for (const valueElement of element.querySelectorAll(`[value^="${id}"]`)) {
            valueElement.value = valueElement.value.replaceAll(gameIndex, index + 1);
        };
    });
    updateData();
};

function selectGame() {
    const gameReference = getGameReference(this);
    const playersElement = document.getElementById(`${gameReference}|players`);
    const handicapParent = closestColumn(document.getElementById(`${gameReference}|handicap-description`));
    const handicapRadioButtons = document.querySelectorAll(`input[id^="${gameReference}|handicap|type|"][type="radio"]`);
    const methodSelect = document.getElementById(`${gameReference}|method`);
    const nameElements = document.querySelectorAll(`[id^="${gameReference}|marker|team-"][id$="|name"]`);
    const participationElements = document.querySelectorAll(`[id^="${gameReference}|"][id$="|participation"]`);
    const roundParent = this.closest('.accordion-body').querySelector(`input[id^="${gameReference}|round|"][type="radio"]`).closest('.col-12');
    const scoringParent = closestColumn(document.getElementById(`${gameReference}|scoring-description`)).querySelector('.row');
    const teamElements = document.querySelectorAll(`[id^="${gameReference}|"][id*="|team-"]:checked`);
    this.classList.remove('is-invalid');
    toggleVisibility(handicapParent, false);
    toggleVisibility(closestColumn(methodSelect), false);
    toggleVisibility(closestColumn(playersElement), false);
    toggleVisibility(roundParent, false);
    toggleVisibility(closestColumn(scoringParent), false);
    for (const handicap of handicapRadioButtons) handicap.disabled = true;
    removeChildren(methodSelect);
    removeChildren(playersElement);
    removeChildren(scoringParent);
    if (!this.value || this.value === 'Select Game') return this.classList.add('is-invalid');
    const playerSelects = Array.from(document.querySelectorAll(playerSelectSelector)).filter(({ value }) => value && value !== 'Select Player');
    const { filters, players } = GAMES.game.find(({ id }) => id === this.value);
    if (players?.minimum > playerSelects.length) {
        this.children[0].selected = true;
        return this.classList.add('is-invalid');
    };
    const gameIndex = getGameIndex(gameReference) || 0;
    const scoringValues = GAMES.scoring.filter(({ id }) => filters.scoring.includes(id)).sort((a, b) => a.order - b.order);
    toggleVisibility(closestColumn(playersElement));
    toggleVisibility(roundParent);
    toggleVisibility(closestColumn(scoringParent));
    updateGameOptionDescription.call(this);
    for (const playerSelect of playerSelects) {
        const { id, selectedIndex } = playerSelect;
        const [ playerReference ] = id.split('|');
        const playerName = playerSelect[selectedIndex].innerText;
        addPlayerToGame(gameReference, playerReference, playerName);
    };
    for (const scoring of scoringValues) {
        const { id, value: innerText } = scoring;
        const value = `${gameReference}|scoring|${id}`;
        scoringParent.insertBefore(createElement({
            classList: ['col'],
            children: [
                {
                    classList: ['d-flex', 'justify-content-center'],
                    children: [
                        {
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
                                        { type: 'change', listener: function() {
                                            changeScoringType.call(this);
                                            updateData.call(this);
                                            updateGameOptionDescription.call(this);
                                        } }
                                    ]
                                },
                                {
                                    type: 'label',
                                    classList: ['form-check-label'],
                                    attributes: [{ id: 'for', value }],
                                    innerText
                                }
                            ]
                        }
                    ]
                }
            ]
        }), null);
    };
    for (const participationElement of participationElements) {
        const { checked, id } = participationElement;
        if (!checked) continue;
        const element = document.getElementById(id);
        if (!element) continue;
        element.checked = true;
        changeParticipation.call(element);
    };
    for (const teamElement of teamElements) {
        const element = document.getElementById(teamElement.id);
        if (element) element.checked = true;
    };
    for (const nameElement of nameElements) {
        const { id, value } = nameElement;
        const element = document.getElementById(id);
        if (!element) continue;
        element.value = value;
        handleTeamNameChanges.call(element);
    };
    const firstScoringRadioButton = scoringParent.querySelector(`input${gameElementId('scoring|')}`);
    firstScoringRadioButton.checked = true;
    changeScoringType.call(firstScoringRadioButton);
};

function teamRadioButtonObject(game, player, teamId, teamName, checkedValue) {
    const gameIndex = getGameIndex(game);
    const value = `${game}|${player}|team-${teamId}`;
    const teamNameId = `${value}|name`;
    const noneTeam = teamId === 'none';
    const teamRadioButtonObject = {
        classList: ['d-flex', 'custom-name-element'],
        children: [
            {
                type: 'input',
                classList: ['flex-shrink-0', 'form-check-input', 'me-2', 'my-auto'],
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
                classList: noneTeam ? ['form-check-label', 'none-label'] : ['flex-fill', 'form-check-label'],
                attributes: [{ id: 'for', value }]
            }
        ]
    };
    if (checkedValue && checkedValue === teamId) teamRadioButtonObject.children[0].attributes.push({ id: 'checked', value: true});
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
                addEventListener: [
                    { type: 'change', listener: function() {
                        const { id, value } = this;
                        if (value) return;
                        const [ , team ] = id.match(/\|team\-(\w)+\|/);
                        this.value = team.toUpperCase();
                        handleTeamNameChanges.call(this);
                    } },
                    { type: 'input', listener: handleTeamNameChanges }
                ]
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

function updateGameOptionDescription() {
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
        removeChildren(gameSelect, 1);
        for (const option of gameSelectOptions(selectedPlayers)) gameSelect.insertBefore(createElement(option), null);
        (Array.from(gameSelect.children).find(({ value }) => value === currentValue) || gameSelect.children[0]).selected = true;
        selectGame.call(gameSelect);
    };
};

function updateMethodSelect() {
    const gameReference = getGameReference(this);
    const gameMethodSelect = document.getElementById(`${gameReference}|method`);
    const gameSelectValue = document.getElementById(`${gameReference}|game`).value;
    const { filters } = (GAMES.game.find(({ id }) => id === gameSelectValue) || { filters: { method: GAMES.method }});
    if (!filters) return;
    const methods = GAMES.method.filter(({ id }) => filters.method.includes(id));
    toggleVisibility(gameMethodSelect.closest('.col-12'), false);
    removeChildren(gameMethodSelect);
    if (!methods || methods.length === 0) return;
    const teams = [
        ...Array.from(document.querySelectorAll(`[id^="${gameReference}|"][id*="|team-none"]:checked`)).map(_ => 1),
        ...[ ...new Set(Array.from(document.querySelectorAll(`[id^="${gameReference}|"][id*="|team-"]:not([id$="none"]):checked`)).map(({ value }) => value)) ]
        .map(team => document.querySelectorAll(`[id^="${gameReference}|"][id$="|team-${team}"]:checked`).length)
    ];
    if (teams.length < filters.players.minimum || !teams.some(team => team > 1)) return;
    const equalTeams = teams.every(team => teams[0] === team);
    const methodsToAdd = methods.filter(({ filters }) => ((filters.teams.even ? equalTeams : true) && teams.every(team => team >= filters.teams.minimum)))
        .map(({ id: value, value: v }) => ({ v, value }));
    toggleVisibility(gameMethodSelect.closest('.col-12'));
    for (const method of methodsToAdd) {
        const { v, value } = method;
        appendOption(v, gameMethodSelect, [{ id: 'value', value }]);
    };
    updateGameOptionDescription.call(gameMethodSelect);
};

document.getElementById('play-game').addEventListener('click', addGame);