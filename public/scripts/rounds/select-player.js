const playerSelectSelector = 'select.form-select[id$="|id"]:not([id^="game-"])';
// const handicapInputSelector = 'input.form-control[id$="|handicap"]:not([id^="game-"])';

function addPlayer() {
    const parentRow = this.closest('.row');
    const selects = parentRow.querySelectorAll('select');
    const letter = letterFromNumber(selects.length - 1);
    const playerReference = `player-${letter}`;
    const id = `${playerReference}|id`;
    const playerSelect = {
        classList: ['col-12', 'd-flex'],
        children: [
            {
                classList: ['flex-grow-1'],
                children: [
                    {
                        classList: ['row', 'g-2'],
                        children: [
                            {
                                classList: ['col'],
                                children: [
                                    {
                                        classList: ['form-floating'],
                                        children: [
                                            {
                                                type: 'select',
                                                classList: ['form-select', 'text-capitalize'],
                                                attributes: [
                                                    { id: 'id', value: id },
                                                    { id: 'name', value: `[player-${letter}][id]` }
                                                ],
                                                addEventListener: [
                                                    { type: 'change', listener: selectPlayer },
                                                    { type: 'change', listener: updateData }
                                                ],
                                                children: [
                                                    {
                                                        type: 'option',
                                                        attributes: [
                                                            { id: 'selected', value: true },
                                                            { id: 'disabled', value: true }
                                                        ],
                                                        innerText: 'Select Player'
                                                    }
                                                ]
                                            },
                                            {
                                                type: 'label',
                                                classList: ['text-capitalize'],
                                                attributes: [{ id: 'for', value: id }],
                                                innerText: `Player ${letter}`
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },

            // need to enable tooltips
            {
                classList: ['d-flex', 'ps-2'],
                children: [
                    {
                        classList: ['btn', 'btn-danger', 'd-flex', 'align-items-center'],
                        attributes: [
                            { id: 'data-bs-placement', value: 'left' },
                            { id: 'title', value: 'Remove Player' }
                        ],
                        addEventListener: [{ listener: removePlayer }],
                        children: [
                            {
                                classList: ['btn-close', 'btn-close-white'],
                                attributes: [{ id: 'aria-label', value: 'remove' }]
                            }
                        ]
                    }
                ]
            }

        ]
    };
    parentRow.insertBefore(createElement(playerSelect), this.parentElement);
    selectPlayer.call(document.getElementById(id));
};

function removePlayer() {
    const parentRow = this.closest('.col-12.d-flex');
    const [ playerId ] = parentRow.querySelector('select').id.split('|');
    parentRow.remove();
    for (const playerParticipationInput of document.querySelectorAll(`input[id^=game][id$="|${playerId}|participation"][type=checkbox]`)) playerParticipationInput.closest('.col-12').remove();
    selectPlayer();
    document.querySelectorAll(playerSelectSelector).forEach((playerSelect, index) => {

        const [ , player ] = playerSelect.id.match(/(.+)\|id/);
        const newPlayer = index === 0 ? 'marker' : `player-${letterFromNumber(index - 1)}`;

        // updateAttributes(['for', 'id', 'name'], player, newPlayer);

        for (const idElement of document.querySelectorAll(`[id*="${player}"]`)) {
            idElement.id = idElement.id.replaceAll(player, newPlayer);
        };
        for (const forElement of document.querySelectorAll(`[for*="${player}"]`)) {
            forElement.attributes.for.value = forElement.attributes.for.value.replaceAll(player, newPlayer);
            if (forElement.innerText.toLowerCase() === player.replace('-', ' ')) forElement.innerText = newPlayer.split('-').join(' ');
        };
        for (const nameElement of document.querySelectorAll(`[name*="${player}"]`)) {
            nameElement.name = nameElement.name.replaceAll(player, newPlayer);
        };
    });
    for (const gameAccordionBody of document.querySelectorAll(GAME_SELECT_SELECTOR)) {
        updateGameOptions.call(gameAccordionBody);
        updateMethodSelect.call(gameAccordionBody);
    };
    updateData();
};

function resetPlayerModalFields() {
    const playerName = document.getElementById('player-name')
    playerName.classList.remove('is-invalid');
    playerName.value = '';
    document.getElementById('player-handicap').value = '';
};

function selectPlayer() {
    if (this.value === 'new') {
        const newPlayerElement = document.getElementById('new-player-modal');
        document.getElementById('player-name').classList.remove('is-invalid');
        newPlayerElement.setAttribute('data-select-id', this.id);
        new bootstrap.Modal(newPlayerElement).show();
        return;
    };
    const playerSelects = document.querySelectorAll(playerSelectSelector);
    const handicapInputs = document.querySelectorAll('input.form-control[id$="|handicap"]:not([id^="game-"])');
    const selectValues = Array.from(playerSelects).filter(({ value }) => value && value !== 'Select Player'); // .map(({ value }) => value); -- doesn't work
    const localStorage = JSON.parse(window.localStorage.round) || {};
    // const nonGuests = players.filter(({ guest, id }) => !guest && selectValues.some(selectValue => selectValue.value === id));
    const summary = document.getElementById('summary-score');
    const holeOne = document.getElementById('hole-1');
    // const playersAccordion = document.getElementById('players');
    // const scorecardAccordionItem = document.getElementById('scorecard-heading').closest('.accordion-item');
    let tabIndex = 0;
    // playersAccordion.classList.add('forced-accordion-bottom');
    toggleElement(summary.closest('.col-12'), selectValues.length > 0);
    toggleElement(holeOne.closest('.row').closest('.col-12'), selectValues.length > 0);
    // toggleElement(scorecardAccordionItem, selectValues.length > 0);
    // if (selectValues.length > 0) playersAccordion.classList.remove('forced-accordion-bottom');
    for (const handicap of handicapInputs) handicap.parentElement.parentElement.remove();
    for (const team of document.querySelectorAll('.team')) team.remove();
    for (const demeritModal of document.querySelectorAll('.modal.fade[id^="demerit|"]')) demeritModal.remove();
    while (summary.children.length > 0) summary.children[0].remove();
    for (const playerSelect of playerSelects) {
        const id = playerSelect.id.split('|')[0];
        const currentSelectedPlayer = playerSelect.value;
        if (!document.querySelector(`input[value="${currentSelectedPlayer}"]`)) {
            while (playerSelect.children.length > 0) playerSelect.children[0].remove();
            const optionAttributes = [{ id: 'disabled', value: 'true' }];
            if (currentSelectedPlayer === 'Select Player') optionAttributes.push({ id: 'selected', value: 'true' });
            appendOption('Select Player', playerSelect, optionAttributes);
            for (const player of players) {
                if (selectValues.some(selectValue => selectValue.value === player.id)) continue;
                const options = [{ id: 'value', value: player.id }];
                if (currentSelectedPlayer === player.id) options.push({ id: 'selected', value: 'true' });
                appendOption(player.name.knownAs, playerSelect, options);
            };
            appendOption('New Player', playerSelect, [{ id: 'value', value: 'new' }]);
        };
        if (playerSelect.value === 'Select Player') continue;
        const selectParent = playerSelect.closest('.row.g-2');
        const localStoragePlayer = localStorage[id];
        const currentPlayer = players.find(({ id }) => id === currentSelectedPlayer);
        const handicap = +(localStoragePlayer && localStoragePlayer.handicap || currentPlayer.handicap);
        const handicapElementObject = {
            classList: ['col-4', 'col-md-2'],
            children: [
                {
                    classList: ['form-floating'],
                    children: [
                        {
                            type: 'input',
                            classList: ['form-control', 'text-center'],
                            attributes: [
                                { id: 'id', value: `${id}|handicap` },
                                { id: 'type', value: 'number' },
                                { id: 'placeholder', value: 'Handicap' },
                                { id: 'name', value: `[${id}][handicap]` },
                                { id: 'value', value: handicap },
                                { id: 'max', value: 54 },
                            ],
                            addEventListener: [{ type: 'input', listener: updateData }]
                        },
                        {
                            type: 'label',
                            attributes: [{ id: 'for', value: `${id}|handicap` }],
                            innerText: 'Handicap'
                        }
                    ]
                }
            ]
        };
        const playerSummaryElementObject = {
            type: 'h4',
            classList: ['col', 'mb-0', 'px-0'],
            children: [
                {
                    classList: ['row', 'row-cols-1'],
                    children: [
                        {
                            classList: ['col', 'text-center'],
                            children: [
                                {
                                    classList: ['d-none', 'd-md-block'],
                                    innerText: currentPlayer.name.knownAs
                                },
                                {
                                    classList: ['d-block', 'd-md-none'],
                                    innerText: currentPlayer.name.initials.short
                                }
                            ]
                        },
                        {
                            classList: ['col', 'text-center'],
                            children: [
                                {
                                    type: 'span',
                                    attributes: [{ id: 'id', value: `${id}|score` }],
                                    innerText: '0'
                                },
                                {
                                    type: 'span',
                                    innerText: ' ('
                                },
                                {
                                    type: 'span',
                                    classList: ['f-level'],
                                    attributes: [{ id: 'id', value: `${id}|par` }],
                                    innerText: '0'
                                },
                                {
                                    type: 'span',
                                    innerText: ')'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        selectParent.insertBefore(createElement(handicapElementObject), null);
        summary.insertBefore(createElement(playerSummaryElementObject), null);
    };
    for (const playersSection of document.querySelectorAll('[id^="players-"]:not([id$="heading"]):not([id$="button"])')) {
        const hole = playersSection.id.split('-')[1];
        while (playersSection.children.length > 0) playersSection.children[0].remove();
        toggleElement(playersSection.closest('[class*="col"]'), selectValues.length > 0);
        for (const playerSelect of playerSelects) {
            const currentSelectedPlayer = playerSelect.value;
            if (currentSelectedPlayer === 'Select Player') continue;
            const currentPlayer = players.find(({ id }) => id === currentSelectedPlayer);
            const id = playerSelect.id.split('|')[0];
            const playerScoreElementObject = {
                classList: ['col-12'],
                children: [
                    {
                        classList: ['row', 'mx-0'],
                        children: [
                            {
                                classList: ['col', 'd-flex', 'align-items-center', 'justify-content-center'],
                                attributes: [{ id: 'data-player', value: `${id}` }],
                                innerText: currentPlayer.name.knownAs
                            },
                            {
                                classList: ['col-3', 'px-0'],
                                children: [
                                    {
                                        type: 'label',
                                        classList: ['form-label', 'd-none'],
                                        attributes: [{ id: 'for', value: `${id}|hole-${hole}` }]
                                    },
                                    {
                                        type: 'input',
                                        classList: ['form-control', 'text-center'],
                                        attributes: [
                                            { id: 'id', value: `${id}|hole-${hole}` },
                                            { id: 'type', value: 'number' },
                                            { id: 'min', value: '1' },
                                            { id: 'name', value: `[${id}][hole][${hole}]` },
                                            { id: 'tabindex', value: ++tabIndex }
                                        ],
                                        addEventListener: [{ type: 'input', listener: updateData }]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
            // if (nonGuests.length > 2) {
                const demeritColumn = {
                    classList: ['col-5'],
                };
                if (!currentPlayer.guest) {
                    demeritColumn.classList.push('d-md-flex', 'text-center');
                    demeritColumn.children = [
                        {
                            type: 'button',
                            classList: ['btn', 'btn-success', 'mx-auto'],
                            attributes: [
                                { id: 'data-bs-toggle', value: 'modal' },
                                { id: 'data-bs-target', value: `#demerit\\|${id}\\|${hole}` }
                            ],
                            addEventListener: [{ listener: e => e.preventDefault() }],
                            innerText: 'Demerit'
                        }
                    ];
                };
                playerScoreElementObject.children[0].children.push(demeritColumn);
            // };
            playersSection.insertBefore(createElement(playerScoreElementObject), null);
            // if (currentPlayer.guest || nonGuests.length < 3) continue;
            if (currentPlayer.guest) continue;
            const demeritModalElementObject = {
                classList: ['modal', 'fade'],
                attributes: [
                    { id: 'id', value: `demerit|${id}|${hole}` },
                    { id: 'tabindex', value: '-1' },
                    { id: 'aria-labelledby', value: `demerit-label|${id}|${hole}` },
                    { id: 'aria-hidden', value: 'true' },
                ],
                children: [
                    {
                        classList: ['modal-dialog', 'modal-dialog-centered'],
                        children: [
                            {
                                classList: ['modal-content'],
                                children: [
                                    {
                                        classList: ['modal-header', 'border-bottom-0'],
                                        children: [
                                            {
                                                type: 'h5',
                                                classList: ['modal-title'],
                                                attributes: [{ id: 'id', value: `demerit-label|${id}|${hole}` }],
                                                innerText: `Demerits for ${currentPlayer.name.knownAs} on hole ${hole}`
                                            },
                                            {
                                                type: 'button',
                                                classList: ['btn-close'],
                                                attributes: [
                                                    { id: 'type', value: 'button' },
                                                    { id: 'data-bs-dismiss', value: 'modal' },
                                                    { id: 'aria-label', value: 'Close' }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        classList: ['modal-body', 'p-1'],
                                        children: [
                                            {
                                                classList: ['row', 'gy-2'],
                                                children: [
                                                    {
                                                        classList: ['col-11', 'border', 'border-1', 'rounded-3', 'mx-auto', 'p-3'],
                                                        children: [
                                                            {
                                                                classList: ['row'],
                                                                children: [
                                                                    {
                                                                        classList: ['col-12', 'px-2'],
                                                                        children: [
                                                                            {
                                                                                classList: ['row', 'mx-0'],
                                                                                addEventListener: [{ listener: addDemerit }],
                                                                                children: [
                                                                                    {
                                                                                        classList: ['btn', 'btn-success'],
                                                                                        innerText: 'Add Demerit'
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
                                    },
                                    {
                                        classList: ['modal-footer', 'border-top-0'],
                                        children: [
                                            {
                                                type: 'button',
                                                classList: ['btn', 'btn-secondary'],
                                                attributes: [
                                                    { id: 'type' , value: 'button' },
                                                    { id: 'data-bs-dismiss', value: 'modal' }
                                                ],
                                                innerText: 'Close'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
            document.querySelector('form.needs-validation').insertBefore(createElement(demeritModalElementObject), null);
        };
    };
    // if (nonGuests.length > 2) updateDemerits();
    updateDemerits();
    // else remove demerits?
    updateScores();
    handleAccordionClick.call(document.getElementById('scorecard-button'));
    if (!this.value || /select/i.test(this.value)) return;
    for (const game of document.querySelectorAll('#game .accordion-collapse.collapse')) {
        const gameReference = game.id;
        const [ playerReference ] = this.id.split('|');
        const playerParticipationLabel = document.querySelector(`[for="${gameReference}|${playerReference}|participation"]`);
        const playerName = this[this.selectedIndex].innerText;
        if (playerParticipationLabel) return playerParticipationLabel.innerText = playerName;
        addPlayerToGame(gameReference, playerReference, playerName);
    };
    updateGameOptions();
    // updateGames();
};

for (const playerSelect of document.querySelectorAll(playerSelectSelector)) {
    playerSelect.addEventListener('change', selectPlayer);
    playerSelect.addEventListener('change', updateData);
};

document.getElementById('add-player').addEventListener('click', addPlayer);

document.getElementById('add-new-player').addEventListener('click', function () {
    const playerName = document.getElementById('player-name');
    const { value } = playerName;
    playerName.classList.remove('is-invalid');
    if (!value) return playerName.classList.add('is-invalid');
    const newPlayerModalElement = document.getElementById('new-player-modal');
    const selectId = newPlayerModalElement.getAttribute('data-select-id');
    const playerSelect = document.getElementById(selectId);
    const names = value.split(' ');
    const knownAs = names[0];
    const last = names.length > 1 ? names[names.length - 1] : '';
    const existingPlayer = last && players.filter(({ id }) => {
        return Array.from(playerSelect.children).some(({ value }) => value === id)
    }).find(({ name }) => {
        const knownAsName = name.knownAs.toLowerCase();
        const lastName = (name.last || '').toLowerCase();
        const enteredKnownAsLower = knownAs.toLowerCase();
        const enteredLastLower = last.toLowerCase();
        return lastName &&
            (lastName.includes(enteredLastLower) || enteredLastLower.includes(lastName)) &&
            (knownAsName.includes(enteredKnownAsLower) || enteredKnownAsLower.includes(knownAsName));
    });
    let id;
    if (existingPlayer) id = existingPlayer.id;
    else {
        const localStorage = JSON.parse(window.localStorage.getItem('players')) || [];
        const handicap = +document.getElementById('player-handicap').value || 54.0;
        const initials = {
            full: names.map(name => name[0].toUpperCase()).join(''),
            short: `${knownAs[0]}${last[0]}`.toUpperCase()
        };
        id = `new-${localStorage.length + 1}`;
        const data = { id, guest: true, handicap, name: { full: value, initials, knownAs, last } };
        localStorage.push(data);
        players.push(data);
        window.localStorage.setItem('players', JSON.stringify(localStorage));
        playerSelect.insertBefore(createElement({
            type: 'option',
            attributes: [{ id: 'value', value: id }],
            innerText: knownAs
        }), playerSelect.querySelector('[value="new"]'));
    };
    playerSelect.querySelector('[selected]').removeAttribute('selected');
    playerSelect.querySelector(`[value="${id}"]`).setAttribute('selected', true);
    sortPlayers();
    selectPlayer.call(playerSelect);
    resetPlayerModalFields();
    bootstrap.Modal.getInstance(newPlayerModalElement).hide();
});

document.getElementById('player-name').addEventListener('input', function () {
    this.classList.remove('is-invalid');
});