const gameSelectSelector = 'select.form-select[id^="game-"][id$="|select"]';
const gamePlayersSelector = '[id^="game-"][id$="|players"]';

function addGame() {
    const gameAccordionElement = this.closest('.row').querySelector('.accordion');
    const gameAccordionParentElement = gameAccordionElement.parentElement;
    const gameIndex = ++gameAccordionElement.children.length;
    const gameReference = `game-${gameIndex}`;
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
                                                            { id: 'id', value: `${gameReference}|select` },
                                                            { id: 'name', value: `[game]['${gameIndex}'][name]` },
                                                            { id: 'aria-label', value: 'game select' }
                                                        ],
                                                        addEventListener: [
                                                            { type: 'change', listener: selectGame },
                                                            { type: 'change', listener: updateData }
                                                        ],
                                                        children: [
                                                            {
                                                                type: 'option',
                                                                attributes: [
                                                                    { id: 'disabled', value: true },
                                                                    { id: 'selected', value: true }
                                                                ],
                                                                innerText: 'Select Game'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        type: 'label',
                                                        attributes: [{ id: 'for', value: `${gameReference}|select` }],
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
                                            }
                                        ]
                                    },
                                    {
                                        classList: ['col-12', 'px-4', 'd-none'],
                                        attributes: [{ id: 'visibility', value: 'hidden' }],
                                        children: [
                                            {
                                                type: 'p',
                                                classList: ['mb-0', 'text-overflow', 'text-muted'],
                                                attributes: [
                                                    { id: 'id', value: `${gameReference}|description` },
                                                    { id: 'readonly', value: true },
                                                    { id: 'rows', value: '1' }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        classList: ['col-12', 'd-none'],
                                        attributes: [{ id: 'visibility', value: 'hidden' }],
                                        children: [
                                            {
                                                classList: ['game-element', 'fixed-game-element-height', 'd-flex', 'justify-content-evenly', 'align-items-center'],
                                                children: []
                                            }
                                        ]
                                    },

                                    // {
                                    //     classList: ['col-12', 'd-none'],
                                    //     attributes: [{ id: 'visibility', value: 'hidden' }],
                                    //     children: [
                                    //         {
                                    //             classList: ['game-element', 'fixed-game-element-height', 'd-flex', 'justify-content-evenly', 'align-items-center'],
                                    //             children: []
                                    //         }
                                    //     ]
                                    // },
                                    // {
                                    //     classList: ['col-12', 'd-none'],
                                    //     attributes: [{ id: 'visibility', value: 'hidden' }],
                                    //     children: [
                                    //         {
                                    //             classList: ['game-element', 'fixed-game-element-height', 'd-flex', 'align-items-center', 'justify-content-center'],
                                    //             children: []
                                    //         }
                                    //     ]
                                    // },

                                    {
                                        classList: ['col-12', 'd-none'],
                                        attributes: [{ id: 'visibility', value: 'hidden' }],
                                        children: [
                                            {
                                                classList: ['game-element', 'fixed-game-element-height', 'd-flex', 'align-items-center', 'justify-content-center'],
                                                children: [
                                                    {
                                                        classList: ['form-check', 'form-switch'],
                                                        children: [
                                                            {
                                                                type: 'input',
                                                                classList: ['form-check-input'],
                                                                attributes: [
                                                                    { id: 'id', value: `${gameReference}|handicap` },
                                                                    { id: 'name', value: `[game]['${gameIndex}'][handicap]` },
                                                                    { id: 'type', value: 'checkbox' }
                                                                ],
                                                                addEventListener: [{ type: 'change', listener: updateData }]
                                                            },
                                                            {
                                                                type: 'label',
                                                                classList: ['form-check-label'],
                                                                attributes: [{ id: 'for', value: `${gameReference}|handicap` }],
                                                                innerText: 'Handicap Adjusted'
                                                            }
                                                        ]
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
                                            }
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
    for (const roundType of ROUND_TYPES.filter(({ end, start }) => start !== 0 || end !== 0)) {
        const { name } = roundType;
        const value = `${gameReference}|round|${name}`;
        const radioButtonElementObject = {
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
        if (name === 'full') radioButtonElementObject.children[0].attributes.push({ id: 'checked', value: true });
        newItemElementObject.children[1].children[0].children[0].children[2].children[0].children.push(radioButtonElementObject);
    };
    // for (const scoring of ['Shots', 'Nett', 'Stableford']) {
    //     const value = `${gameReference}|scoring|${scoring}`;
    //     const radioButtonElementObject = {
    //         classList: ['form-check', 'form-check-inline'],
    //         children: [
    //             {
    //                 type: 'input',
    //                 classList: ['form-check-input'],
    //                 attributes: [
    //                     { id: 'id', value },
    //                     { id: 'name', value: `[game]['${gameIndex}'][scoring]` },
    //                     { id: 'type', value: 'radio' },
    //                     { id: 'value', value: scoring.toLowerCase() }
    //                 ],
    //                 addEventListener: [{ type: 'change', listener: updateData }]
    //             },
    //             {
    //                 type: 'label',
    //                 classList: ['form-check-label'],
    //                 attributes: [{ id: 'for', value }],
    //                 innerText: scoring
    //             }
    //         ]
    //     };
    //     if (scoring === 'Shots') radioButtonElementObject.children[0].attributes.push({ id: 'checked', value: true });
    //     newItemElementObject.children[1].children[0].children[0].children[3].children[0].children.push(radioButtonElementObject);
    // };
    // for (const handicaps of ['Standard', 'Competition']) {
    //     const value = `${gameReference}|handicap|${handicaps}`;
    //     const radioButtonElementObject = {
    //         classList: ['form-check', 'form-check-inline'],
    //         children: [
    //             {
    //                 type: 'input',
    //                 classList: ['form-check-input'],
    //                 attributes: [
    //                     { id: 'id', value },
    //                     { id: 'name', value: `[game]['${gameIndex}'][handicap]` },
    //                     { id: 'type', value: 'radio' },
    //                     { id: 'value', value: handicaps.toLowerCase() }
    //                 ],
    //                 addEventListener: [{ type: 'change', listener: updateData }]
    //             },
    //             {
    //                 type: 'label',
    //                 classList: ['form-check-label'],
    //                 attributes: [{ id: 'for', value }],
    //                 innerText: handicaps
    //             }
    //         ]
    //     };
    //     if (handicaps === 'Standard') radioButtonElementObject.children[0].attributes.push({ id: 'checked', value: true });
    //     newItemElementObject.children[1].children[0].children[0].children[4].children[0].children.push(radioButtonElementObject);
    // };
    gameAccordionElement.insertBefore(createElement(newItemElementObject), null);
    updateGameOptions();
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
                                classList: ['col'],
                                children: [
                                    {
                                        classList: ['d-flex', 'justify-content-center', 'align-items-center'],
                                        children: [
                                            {
                                                classList: ['form-check', 'form-switch'],
                                                children: [
                                                    {
                                                        type: 'input',
                                                        classList: ['form-check-input'],
                                                        attributes: [
                                                            { id: 'id', value },
                                                            { id: 'name', value: `[game]['${game.split('-')[1]}'][${player}][participation]` },
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
            }
        ]
    }), null);
};

function changeParticipation() {
    const parentAccordionBody = this.closest('.accordion-body');
    const gameSelect = parentAccordionBody.querySelector(gameSelectSelector);
    const gamePlayersElement = parentAccordionBody.querySelector(gamePlayersSelector);
    const participationCheckboxes = Array.from(gamePlayersElement.querySelectorAll('input[type=checkbox]'));
    const participationLabelElement = this.parentElement.querySelector('label');
    const { text } = gameSelect[gameSelect.selectedIndex];
    const { players } = GAMES.find(({ name }) => name === text)
    const teamGame = players.for.some(value => value === 'team');
    const { maximum: maximumPlayers, minimum: minimumPlayers } = players;
    const { checked } = this;
    const [ gameReference ] = this.id.split('|');
    participationLabelElement.classList.toggle('text-muted', !checked);
    participationLabelElement.classList.toggle('fw-bold', checked);
    if (teamGame) {
        const checkedParticipationCheckboxes = participationCheckboxes.filter(({ checked }) => checked).length;
        const minimum = minimumPlayers === maximumPlayers ? 0 : -1;
        const teams = maximumPlayers ? Math.min(maximumPlayers, checkedParticipationCheckboxes) : checkedParticipationCheckboxes;
        for (const participationCheckbox of participationCheckboxes) {
            const participationCheckboxRow = participationCheckbox.closest('.row');
            const radioButton = participationCheckboxRow.querySelector('input.form-check-input[type=radio]');
            const checkedValue = (participationCheckboxRow.querySelector('input.form-check-input[type=radio]:checked') || {}).value;
            const [ , playerReference ] = participationCheckbox.id.split('|');
            if (radioButton) radioButton.closest('.col').remove();
            if (!participationCheckbox.checked || checkedParticipationCheckboxes < 3) continue;
            const radioButtonElementObject = {
                classList: ['col'],
                children: [
                    {
                        classList: ['d-flex', 'justify-content-evenly', 'align-items-center'],
                        children: []
                    }
                ]
            };
            for (let i = minimum; i < teams; i++) {
                radioButtonElementObject.children[0].children.push(
                    teamRadioButtonObject(
                        gameReference,
                        playerReference,
                        i < 0 ? 'None' : letterFromNumber(i).toUpperCase(),
                        checkedValue || (minimum < 0 ? 'none' : 'a')
                    )
                );
            };
            participationCheckbox.closest('.row').insertBefore(createElement(radioButtonElementObject), null);
        };
        updateMethodSelect.call(this);
    };
    updateData();
};

function changeTeam() {
    updateMethodSelect.call(this);
    updateData();
};

function removeGame() {
    const gameAccordionElement = this.closest('.accordion');
    const gameAccordionParentElement = gameAccordionElement.parentElement;
    this.closest('.accordion-item').remove();
    toggleVisibility(gameAccordionParentElement, gameAccordionElement.children.length > 0);
    document.querySelectorAll(gameSelectSelector).forEach((gameSelect, index) => {
        const [ , game ] = gameSelect.id.match(/game-(.+)\|select/);
        // updateAttributes(
        //     ['aria-controls', 'aria-labelledby', 'data-bs-target', 'for', 'id', 'name', 'title', 'value'],
        //     game,
        //     index + 1
        // );

        for (const idElement of document.querySelectorAll(`[id*="${game}"]`)) {
            idElement.id = idElement.id.replaceAll(game, index + 1);
        };
        for (const nameElement of document.querySelectorAll(`[name*="${game}"]`)) {
            nameElement.name = nameElement.name.replaceAll(game, index + 1);
        };

        for (const ariaControlsElement of document.querySelectorAll(`[aria-controls*="${game}"]`)) {
            ariaControlsElement.attributes['aria-controls'].value = ariaControlsElement.attributes['aria-controls'].value.replaceAll(game, index + 1);
        };
        for (const ariaLabelledByElement of document.querySelectorAll(`[aria-labelledby*="${game}"]`)) {
            ariaLabelledByElement.attributes['aria-labelledby'].value = ariaLabelledByElement.attributes['aria-labelledby'].value.replaceAll(game, index + 1);
        };
        for (const bsTargetElement of document.querySelectorAll(`[data-bs-target*="${game}"]`)) {
            bsTargetElement.attributes['data-bs-target'].value = bsTargetElement.attributes['data-bs-target'].value.replaceAll(game, index + 1);
        };
        for (const forElement of document.querySelectorAll(`[for*="${game}"]`)) {
            forElement.attributes.for.value = forElement.attributes.for.value.replaceAll(game, index + 1);
        };

        for (const titleElement of document.querySelectorAll(`[title*="${game}"]`)) {
            const titleValue = titleElement.attributes.title.value.replaceAll(game, index + 1);
            titleElement.attributes.title.value = titleValue;
            titleElement.innerText = titleValue;
        };

    });
    updateData();
};

function selectGame() {
    const parentAccordionBody = this.closest('.accordion-body');

    // const gameScoringRadioButton = parentAccordionBody.querySelector('input[id^="game-"][id*="|scoring|"][type="radio"]');
    const gameHandicapRadioButton = parentAccordionBody.querySelector('input[id^="game-"][id*="|handicap|"][type="radio"]');

    const gameHandicapCheckbox = parentAccordionBody.querySelector('input[id^="game-"][id$="|handicap"][type="checkbox"]');

    const gameMethodSelect = parentAccordionBody.querySelector('select[id^="game-"][id$="|method"]');
    const gameRoundRadioButton = parentAccordionBody.querySelector('input[id^="game-"][id*="|round|"][type="radio"]');
    const gamePlayersElement = parentAccordionBody.querySelector(gamePlayersSelector);
    const [ gameReference ] = this.id.split('|');
    this.classList.remove('is-invalid');

    // toggleVisibility(gameScoringRadioButton.closest('.col-12'), false);
    // toggleVisibility(gameHandicapRadioButton.closest('.col-12'), false);

    toggleVisibility(gameHandicapCheckbox.closest('.col-12'), false);
    gameHandicapCheckbox.removeAttribute('disabled');
    toggleVisibility(gamePlayersElement.closest('.col-12'), false);
    toggleVisibility(gameMethodSelect.closest('.col-12'), false);
    toggleVisibility(gameRoundRadioButton.closest('.col-12'), false);
    while (gamePlayersElement.children.length > 0) gamePlayersElement.children[0].remove();
    while (gameMethodSelect.children.length > 0) gameMethodSelect.children[0].remove();
    if (!this.value || this.value === 'Select Game') return this.classList.add('is-invalid');
    const playerSelects = Array.from(document.querySelectorAll(playerSelectSelector)).filter(({ value }) => value && value !== 'Select Player');
    const game = GAMES.find(({ name }) => name === this.value);
    if (!game || game.players.minimum > playerSelects.length) {
        this.children[0].selected = true;
        return this.classList.add('is-invalid');
    };

    // toggleVisibility(gameScoringRadioButton.closest('.col-12'));
    // toggleVisibility(gameHandicapRadioButton.closest('.col-12'));

    toggleVisibility(gameHandicapCheckbox.closest('.col-12'));
    toggleVisibility(gameRoundRadioButton.closest('.col-12'));

    if (!game.handicap.adjustable) gameHandicapCheckbox.setAttribute('disabled', true);
    gameHandicapCheckbox.checked = game.handicap.default;

    toggleVisibility(gamePlayersElement.closest('.col-12'));
    for (const playerSelect of playerSelects) {
        const { id, selectedIndex } = playerSelect;
        const [ playerReference ] = id.split('|');
        const playerName = playerSelect[selectedIndex].innerText;
        addPlayerToGame(gameReference, playerReference, playerName);
    };
};

function teamRadioButtonObject(game, player, team, checkedValue = '') {
    const lowerTeam = team.toLowerCase();
    const value = `${game}|${player}|team-${lowerTeam}`;
    const teamRadioButtonObject = {
        classList: ['form-check', 'form-check-inline'],
        children: [
            {
                type: 'input',
                classList: ['form-check-input'],
                attributes: [
                    { id: 'id', value },
                    { id: 'name', value: `[game]['${game.split('-')[1]}'][${player}][team]` },
                    { id: 'type', value: 'radio' },
                    { id: 'value', value: lowerTeam }
                ],
                addEventListener: [{ type: 'change', listener: changeTeam }]
            },
            {
                type: 'label',
                classList: ['form-check-label'],
                attributes: [{ id: 'for', value }],
                innerText: team
            }
        ]
    };
    if (checkedValue === lowerTeam) teamRadioButtonObject.children[0].attributes.push({ id: 'checked', value: true });
    return teamRadioButtonObject;
};

function updateGameOptions() {
    const gameSelects = document.querySelectorAll(gameSelectSelector);
    const selectedPlayers = Array.from(document.querySelectorAll(playerSelectSelector)).filter(({ value }) => value && value !== 'Select Player').length;
    const applicableGames = GAMES.filter(({ players }) => players.minimum <= selectedPlayers);
    for (const gameSelect of gameSelects) {
        const currentValue = gameSelect.value;
        while (gameSelect.children.length > 1) gameSelect.children[1].remove();
        for (const game of applicableGames) {
            const value = game.name;
            gameSelect.insertBefore(createElement({
                type: 'option',
                attributes: [{ id: 'value', value }],
                innerText: value
            }), null);
        };
        const selectedOption = Array.from(gameSelect.children).find(({ value }) => value === currentValue);
        if (selectedOption) selectedOption.selected = true;
    };
};

function updateMethodSelect() {
    const parentAccordionBody = this.closest('.accordion-body');
    const gameSelect = parentAccordionBody.querySelector(gameSelectSelector);
    const gameMethodSelect = parentAccordionBody.querySelector('[id^="game-"][id$="|method"]');
    const game = GAMES.find(({ name }) => name === gameSelect[gameSelect.selectedIndex].text)
    while (gameMethodSelect.children.length > 0) gameMethodSelect.children[0].remove();
    toggleVisibility(gameMethodSelect.closest('.col-12'), false);
    if (!game) return;
    const method = game.options.find(({ type }) => type === 'method');
    if (!method) return;
    const gamePlayersElement = parentAccordionBody.querySelector(gamePlayersSelector);
    const checkedParticipationCheckboxes = Array.from(gamePlayersElement.querySelectorAll('input[type=checkbox]')).filter(({ checked }) => checked).length;
    const maximumPlayers = game.players.maximum;
    const participatingPlayers = maximumPlayers ? Math.min(maximumPlayers, checkedParticipationCheckboxes) : checkedParticipationCheckboxes;
    for (let i = 0; i < participatingPlayers; i++) {
        const team = letterFromNumber(i);
        if (gamePlayersElement.querySelectorAll(`.col:not(.d-none) [type=radio][value=${team}]:checked`).length > 1) {
            toggleVisibility(gameMethodSelect.closest('.col-12'));
            method.values.forEach((value, index) => {
                const attributes = [{ id: 'value', value }];
                if (index === 0) attributes.push({ id: 'selected', value: true });
                appendOption(value, gameMethodSelect, [{ id: 'value', value }]);
            });
            break;
        };
    };
};

document.getElementById('play-game').addEventListener('click', addGame);