const tableBody = document.querySelector('table > tbody');

document.getElementById('year').addEventListener('change', function() {
    const { players } = data.find(({ year }) => year == this.value);
    if (!players) return;
    const classList = ['d-flex', 'justify-content-center', 'align-items-center'];
    while (tableBody.children.length > 0) tableBody.children[0].remove();
    for (const player of players) {
        const { drinks, id, infractions, name, rounds, titles } = player;
        const children = titles.map(({ class: tClass, icon, method, value }) => {
            return {
                children: [
                    {
                        classList: ['btn', `btn-${tClass}`],
                        attributes: [
                            { id: 'data-bs-toggle', value: 'tooltip' },
                            { id: 'data-bs-placement', value: 'top' },
                            { id: 'title', value: `${method} ${value}` }
                        ],
                        children: [
                            {
                                classList: ['d-flex', 'p-0'],
                                children: [
                                    {
                                        type: 'i',
                                        classList: ['mx-auto', 'bi', icon]
                                    }
                                ]
                            }
                        ]
                    }
                ]

                //  <!-- add link to titles page to see history of titles? -->
                //  <a class="col d-flex p-0" href="">
                //      <i class="mx-auto bi <%= t.icon %>"></i>
                //  </a>

            }
        });
        tableBody.insertBefore(createElement({
            type: 'tr',
            children: [
                {
                    type: 'td',
                    children: [
                        {
                            classList,
                            children: [
                                {
                                    type: 'a',
                                    attributes: [{ id: 'href', value: `/players/${id}` }],
                                    innerText: name.friendly
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'td',
                    children: [
                        {
                            classList,
                            innerText: rounds.toString()
                        }
                    ]
                },
                {
                    type: 'td',
                    children: [
                        {
                            classList,
                            innerText: infractions.toString()
                        }
                    ]
                },
                {
                    type: 'td',
                    children: [
                        {
                            classList: ['d-flex', 'justify-content-evenly', 'align-items-center'],
                            children
                        }
                    ]
                },
                {
                    type: 'td',
                    children: [
                        {
                            classList,
                            innerText: drinks.toString()
                        }
                    ]
                }
            ]
        }), null);
    };
});