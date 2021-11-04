function selectPlayer() {
    function toggleElement (element, show = true) {
        if (!element) return;
        if (show) {
            element.classList.remove('d-none');
            element.removeAttribute('visibility');
        } else {
            element.classList.add('d-none');
            element.setAttribute('visibility', 'hidden');
        };
    };
    const playerSelects = document.querySelectorAll('select.form-select[id$="|id"]');
    const selectValues = Array.from(playerSelects).filter(({ value }) => value && value !== 'Select Player');
    const summary = document.getElementById('summary-score');
    const playersAccordion = document.getElementById('players');
    const scorecardAccordionItem = document.getElementById('scorecard-heading').closest('.accordion-item');
    playersAccordion.classList.add('forced-accordion-bottom');
    toggleElement(summary.closest('[class*="col"]'), selectValues.length > 0);
    toggleElement(scorecardAccordionItem, selectValues.length > 0);
    if (selectValues.length > 0) playersAccordion.classList.remove('forced-accordion-bottom');
    for (const removePlayer of document.querySelectorAll('.remove-player')) removePlayer.remove();
    for (const team of document.querySelectorAll('.team')) team.remove();
    while (summary.children.length > 0) summary.children[0].remove();
    for (const playerSelect of playerSelects) {
        const id = playerSelect.id.split('|')[0];
        const currentSelectedIndex = playerSelect.selectedIndex;
        if (playerSelect.value === 'Select Player' ||
            document.querySelector(`input[value="${playerSelect[currentSelectedIndex].value}"]`)) continue;
        function resetSelectPlayer() {
            this.closest('.row').querySelector('select').selectedIndex = 0;
            updateData();
            selectPlayer();                
        };

        // need to enable tooltips
        
        const removePlayerElementObject = {
            classList: ['d-flex', 'remove-player', 'ps-2'],
            children: [
                {
                    classList: ['btn', 'btn-danger', 'd-flex', 'align-items-center'],
                    attributes: [
                        { id: 'data-bs-placement', value: 'left' },
                        { id: 'title', value: 'Remove Player' }
                    ],
                    addEventListener: [{ listener: resetSelectPlayer }],
                    children: [
                        {
                            classList: ['btn-close', 'btn-close-white'],
                            attributes: [{ id: 'aria-label', value: 'remove' }]
                        }
                    ]
                }
            ]
        };
        playerSelect.closest('.col').insertBefore(createElement(removePlayerElementObject), null);
        // if (selectValues.length > 1 && playerSelect.value !== 'Select Player') {
        //     const teamRadiosElementObject = {
        //         classList: ['col-12', 'team'],
        //         children: [
        //             {
        //                 classList: ['row', 'mx-0'],
        //                 children: [
        //                     {
        //                         classList: ['col-3', 'col-form-label', 'd-flex', 'align-items-center', 'fw-bold', 'ps-3'],
        //                         innerText: 'Team'
        //                     },
        //                     {
        //                         classList: ['col', 'd-flex', 'justify-content-between', 'align-items-center'],
        //                         children: []
        //                     }
        //                 ]
        //             }
        //         ]
        //     };
        //     const teams = ['None', 'A', 'B', 'C', 'D'];
        //     for (let i = 0; i < selectValues.length + 1; i++) {
        //         const value = `${id}|team-${teams[i].toLowerCase()}`;
        //         const radioButton = {
        //             classList: ['form-check', 'form-check-inline'],
        //             children: [
        //                 {
        //                     type: 'input',
        //                     classList: ['form-check-input'],
        //                     attributes: [
        //                         { id: 'id', value },
        //                         { id: 'type', value: 'radio' },
        //                         { id: 'name', value: `[${id}][team]` },
        //                         { id: 'value', value: teams[i].toLowerCase() }
        //                     ],
        //                     addEventListener: [{ type: 'input', listener: updateData }]
        //                 },
        //                 {
        //                     type: 'label',
        //                     classList: ['form-check-label'],
        //                     attributes: [{ id: 'for', value }],
        //                     innerText: teams[i]
        //                 }
        //             ]
        //         };
        //         if (i === 0) radioButton.children[0].attributes.push({ id: 'checked', value: 'true' });
        //         teamRadiosElementObject.children[0].children[1].children.push(radioButton);
        //     };
        //     playerSelect.closest('.row').insertBefore(createElement(teamRadiosElementObject), null);
        // };
        if (playerSelect.id === this.id || playerSelect.value !== 'Select Player') continue;
        for (const option of playerSelect.querySelectorAll('option')) option.remove();
        function createOption(attributes = [], text) {
            const option = document.createElement('option');
            for (const attribute of attributes) option.setAttribute(attribute.id, attribute.value)
            option.innerText = text;
            playerSelect.appendChild(option)
        };
        const optionAttributes = [{ id: 'disabled', value: 'true' }];
        if (currentSelectedIndex === 0 ) optionAttributes.push({ id: 'selected', value: 'true' });
        createOption(optionAttributes, 'Select Player');
        players.forEach((player, i) => {
            if (currentSelectedIndex === i + 1) createOption([{ id: 'selected', value: 'true' }, { id: 'value', value: player.id }], player.name.knownAs);
            else createOption([{ id: 'value', value: player.id }], player.name.knownAs);
        });
    };
    for (const playerSelect of playerSelects) {
        Array.from(playerSelect.children).forEach(child => {
            if (selectValues.some(selectValue => selectValue.value === child.value && selectValue.id.split('|')[0] !== playerSelect.id.split('|')[0])) child.remove();
        });
        if (playerSelect.value === 'Select Player') continue;
        const player = playerSelect.id.split('|')[0];
        const playerSummaryElementObject = {
            type: 'h4',
            classList: ['col-6', 'col-md', 'd-flex', 'justify-content-center', 'mb-0'],
            children: [
                {
                    classList: ['pe-2'],
                    innerText: players.find(({ id }) => id === playerSelect.value).name.knownAs
                },
                {
                    children: [
                        {
                            type: 'span',
                            attributes: [{ id: 'id', value: `${player}|score` }],
                            innerText: '0'
                        },
                        {
                            type: 'span',
                            innerText: ' ('
                        },
                        {
                            type: 'span',
                            classList: ['f-level'],
                            attributes: [{ id: 'id', value: `${player}|par` }],
                            innerText: '0'
                        },
                        {
                            type: 'span',
                            innerText: ')'
                        }
                    ]
                    
                }
            ]
        };
        summary.insertBefore(createElement(playerSummaryElementObject), null);
    };
    for (const playersSection of document.querySelectorAll('[id^="players-"]:not([id$="heading"]):not([id$="button"])')) {
        const hole = playersSection.id.split('-')[1];
        while (playersSection.children.length > 0) playersSection.children[0].remove();
        toggleElement(playersSection.closest('[class*="col"]'), selectValues.length > 0);
        for (const playerSelect of playerSelects) {
            const playerName = playerSelect.selectedOptions[0].innerText;
            if (playerName === 'Select Player') continue;
            const player = playerSelect.id.split('|')[0];
            const playerScoreElementObject = {
                classList: ['col-12'],
                children: [
                    {
                        classList: ['row'],
                        children: [
                            {
                                classList: ['col', 'd-flex', 'align-items-center', 'justify-content-center'],
                                attributes: [{ id: 'data-player', value: `${player}` }],
                                innerText: playerName
                            },
                            {
                                // classList: ['col-3'],
                                classList: ['col'],
                                children: [
                                    {
                                        type: 'label',
                                        classList: ['form-label', 'd-none'],
                                        attributes: [{ id: 'for', value: `${player}|hole-${hole}` }]
                                    },
                                    {
                                        type: 'input',
                                        classList: ['form-control', 'text-center'],
                                        attributes: [
                                            { id: 'id', value: `${player}|hole-${hole}` },
                                            { id: 'type', value: 'number' },
                                            { id: 'min', value: '1' },
                                            { id: 'name', value: `[${player}][hole][${hole}]` }
                                        ],
                                        addEventListener: [
                                            { type: 'input', listener: updateData },
                                            { type: 'blur', listener: changeScores }
                                        ]
                                    }
                                ]
                            },
                            // {
                            //     classList: ['col-5', 'd-flex'],
                            //     children: [
                            //         {
                            //             type: 'button',
                            //             classList: ['btn', 'btn-primary', 'mx-auto'],
                            //             attributes: [
                            //                 { id: 'data-bs-toggle', value: 'modal' },
                            //                 { id: 'data-bs-target', value: '#demerit-modal' },
                            //                 { id: 'data-bs-player', value: player },
                            //                 { id: 'data-bs-player-name', value: playerName },
                            //                 { id: 'data-bs-hole', value: hole }
                            //             ],
                            //             addEventListener: [
                            //                 { listener: function (e) { e.preventDefault() } },
                            //                 { event: 'show.bs.modal', listener: demeritModalClick }
                            //             ],
                            //             innerText: 'Demerit'
                            //         }
                            //     ]
                            // }
                        ]
                    }
                ]
            };
            playersSection.insertBefore(createElement(playerScoreElementObject), null);
        };
    };
    updateScores();
};

for (const playerSelect of document.querySelectorAll('select.form-select[id$="|id"]')) playerSelect.addEventListener('change', selectPlayer);