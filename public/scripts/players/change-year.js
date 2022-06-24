const tableBody = document.querySelector('table > tbody');

document.getElementById('year').addEventListener('change', function() {
    const { players } = data.find(({ year }) => year == this.value);
    if (!players) return;
    while (tableBody.children.length > 0) tableBody.children[0].remove();
    for (const player of players) {
        const { drinks, id, infractions, name, rounds, titles } = player;
        const children = titles.map(({ class: tClass, icon, method, value }) => {
            return {
                classList: ['btn', `btn-${tClass}`, 'py-0', 'px-1'],
                attributes: [
                    { id: 'data-bs-toggle', value: 'tooltip' },
                    { id: 'data-bs-placement', value: 'top' },
                    { id: 'title', value: `${method} ${value}` }
                ],
                children: [
                    {
                        type: 'i',
                        classList: ['bi', icon]
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
                    innerText: infractions.toString()
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
                    innerText: drinks.toString()
                }
            ]
        }), null);
    };
});