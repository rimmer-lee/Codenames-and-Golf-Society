const playersTable = document.getElementById('players');
const tableBody = playersTable.querySelector('table > tbody');

// shared with public/scripts/rounds/shared-functions.js
function toggleVisibility(element, show = true) {
    element.classList.toggle('d-none', !show);
    if (show) return element.removeAttribute('visibility');
    return element.setAttribute('visibility', 'hidden');
};

document.getElementById('year').addEventListener('change', function() {
    const { players } = data.find(({ year }) => year == this.value);
    const availableData = players && players.length > 0;
    toggleVisibility(playersTable, availableData);
    toggleVisibility(document.getElementById('key'), availableData);
    toggleVisibility(document.getElementById('no-data'), !availableData);
    if (!availableData) return;
    while (tableBody.children.length > 0) tableBody.children[0].remove();
    for (const player of players) {
        const { drinks, id, infractions, name, quorums, rounds, titles } = player;
        tableBody.insertBefore(createElement({
            type: 'tr',
            children: [
                {
                    type: 'td',
                    children: [
                        {
                            type: 'a',
                            attributes: [{ id: 'href', value: `/players/${id}` }],
                            children: [
                                {
                                    classList: ['d-none', 'd-md-block'],
                                    innerText: name.friendly
                                },
                                {
                                    classList: ['d-md-none'],
                                    innerText: name.initials.short
                                }
                            ]

                        }
                    ]
                },
                {
                    type: 'td',
                    innerText: rounds.toString()
                },
                {
                    type: 'td',
                    innerText: quorums.toString()
                },
                {
                    type: 'td',
                    innerText: infractions.toString()
                },
                {
                    type: 'td',
                    classList: ['p-0'],
                    children: [
                        {
                            classList: ['align-items-center', 'd-flex', 'flex-column', 'flex-sm-row', 'justify-content-evenly'],
                            children: titles.map(({ class: tClass, icon, method, value }) => {
                                return {
                                    // type: 'a',
                                    classList: ['btn', `btn-${tClass}`, 'm-1', 'px-1', 'py-0'],
                                    // attributes: [
                                    //     { id: 'data-bs-toggle', value: 'tooltip' },
                                    //     { id: 'data-bs-placement', value: 'top' },
                                    //     { id: 'title', value: `${method} ${value}` }
                                    // ],
                                    children: [
                                        {
                                            type: 'i',
                                            classList: ['bi', icon]
                                        }
                                    ]
                                }
                            })
                        }
                    ]
                },
                {
                    type: 'td',
                    innerText: drinks.toString()
                }
            ]
        }), null);
    };
});