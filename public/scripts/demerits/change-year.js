const playerHeadingRow = document.querySelector('table#demerit > thead > tr');
const tableBody = document.querySelector('table#demerit > tbody');
const newDemeritHead = document.getElementById('new-demerit-head');
const newDrinkHead = document.getElementById('new-drink-head');

document.getElementById('year').addEventListener('change', function() {
    const { demerits, drinks, players } = data.find(({ year }) => year == this.value);
    if (!demerits || !drinks || !players) return;
    function createRows(objectArray, property, insertBeforeElementId) {
        for (const o of objectArray) {
            const { date } = o;
            const value = `/demerits/edit?d=${date}`;
            const element = {
                type: 'tr',
                classList: ['align-middle'],
                attributes: [{ id: 'data-date', value: '' }],
                children: [
                    {
                        type: 'th',
                        classList: ['d-flex', 'justify-content-end'],
                        attributes: [{ id: 'scope', value: 'row' }],
                        children: [
                            {
                                type: 'a',
                                attributes: [{ id: 'href', value }],
                                innerText: date
                            }
                        ]
                    }
                ]
            };
            for (const player of players) {
                const { id } = player;
                const total = o.players.find(({ player }) => player === id)[property];
                element.children.push({
                    type: 'td',
                    classList: ['text-center'],
                    children: [
                        {
                            type: 'a',
                            attributes: [{ id: 'href', value: `${value}&p=${id}` }],
                            innerText: total || ''
                        }
                    ]
                });
            };
            tableBody.insertBefore(createElement(element), document.getElementById(`${insertBeforeElementId}-row`));
        };
    };
    const dateElements = document.querySelectorAll('[data-date]');
    const playerElements = document.querySelectorAll('[data-player]');
    const numberOfPlayers = players.length + 1;
    for (const dateElement of dateElements) dateElement.remove();
    for (const playerElement of playerElements) playerElement.remove();
    for (const element of [newDemeritHead, newDrinkHead]) element.setAttribute('colspan', numberOfPlayers);
    for (const player of players) {
        const { id, name, titles } = player;
        const { initials, knownAs } = name;
        const playerElement = {
            type: 'th',
            classList: ['align-top'],
            attributes: [
                { id: 'scope', value: 'col' },
                { id: 'data-player', value: '' }
            ],
            children: [
                {
                    classList: ['d-flex', 'flex-column'],
                    children: [
                        {
                            type: 'a',
                            classList: ['link-light', 'text-center'],
                            attributes: [{ id: 'href', value: `/players/${id}` }],
                            children: [
                                {
                                    classList: ['d-none', 'd-md-block'],
                                    innerText: knownAs
                                },
                                {
                                    classList: ['d-md-none'],
                                    innerText: initials.short
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        for (const title of titles) {
            const { icon } = allTitles.find(({ value }) => title === value);
            if (!icon) continue;
            playerElement.children[0].children.push({
                // type: 'a',
                classList: ['col', 'd-flex', 'link-light', 'p-0'],
                // attributes: [{ id: 'href', value: '' }],
                children: [
                    {
                        type: 'i',
                        classList: ['mx-auto', 'bi', icon]
                    }
                ]
            });
        };
        for (const property of ['demerits', 'owed', 'balance', 'bbq']) {
            const value = player[property];
            const dataElement = {
                type: 'td',
                classList: ['text-center'],
                attributes: [{ id: 'data-player', value: '' }]
            };
            if (property !== 'bbq') {
                dataElement.classList = ['text-center'];
                dataElement.innerText = value || 0;
            } else if (value) {
                dataElement.children = [
                    {
                        type: 'img',
                        attributes: [
                            { id: 'src', value: '/images/bbq.png' },
                            { id: 'alt', value: 'bbq'}
                        ]
                    }
                ];
            };
            document.getElementById(`${property}-row`).insertBefore(createElement(dataElement), null);
        };
        playerHeadingRow.insertBefore(createElement(playerElement), null);
    };

    // https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
    createRows(demerits, 'demerits', 'demerits');
    createRows(drinks, 'drinks', 'owed');
});