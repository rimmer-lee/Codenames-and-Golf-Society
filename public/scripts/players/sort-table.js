const ASCENDING = 'ascending';
const DESCENDING = 'descending';
const TD_SELECTOR = 'td[data-path]';

Array.prototype.sortBy = function(ascending = true, path = '') {
    const dateStringRegex = new RegExp(/\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z/);
    return this.sort((a, b) => {
        const aValue = getProperty.call(a, path);
        const bValue = getProperty.call(b, path);
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return ascending ? aValue - bValue : bValue - aValue;
        };
        const multiplier = ascending && 1 || -1;
        const isDate = dateStringRegex.test(aValue) && dateStringRegex.test(bValue) ? -1 : 1;
        if (aValue < bValue) return -1 * multiplier * isDate;
        if (aValue > bValue) return 1 * multiplier * isDate;
        return 0;
    });
};

function getProperty(path) {
    if (!path) return this;
    let o = this;
    for (const p of path.split('.')) o = o[p];
    return o;
};

function iconClass(direction) {
    return `bi-caret-${direction === 'ascending' ? 'down' : 'up'}`
};

for (const element of document.querySelectorAll('[data-path]')) {
    element.addEventListener('click', function(e) {
        e.stopPropagation();
        const table = this.closest('table');
        const td = this.closest('td');
        const tableBody = table.querySelector('tbody');
        const [ , id ] = table.id.match(/^(.*)-table$/);
        const { path } = this.dataset;
        const direction = this.dataset?.direction === 'ascending' ? 'descending' : 'ascending';
        const sortedData = data[id].all.sortBy(direction === ASCENDING, path);
        const icon = this.closest('td').querySelector(`i[data-direction="${direction}"]`);
        for (const i of table.querySelectorAll('i[class$="-fill"]')) {
            i.classList = Array.from(i.classList).map(c => {
                if (!/^bi\-caret\-.*/.test(c)) return c;
                return c.match(/^(bi\-caret\-(?:down|up))(?:\-fill)?/)[1];
            });
        };
        icon.className = `${icon.className}-fill`;
        if (td.dataset.direction && td.dataset.direction === 'ascending') td.dataset.direction = 'descending';
        else {
            for (const element of table.querySelectorAll('td[data-direction]')) delete element.dataset.direction;
            td.dataset.direction = 'ascending';
        };
        while (tableBody.children.length > 0) tableBody.children[0].remove();
        switch (id) {
            case 'demerits':
                for (const demerit of sortedData) {
                    const { date, demerits, hole, rule, titles } = demerit;
                    tableBody.insertBefore(createElement({
                        type: 'tr',
                        children: [
                            {
                                type: 'td',
                                children: [
                                    {
                                        type: 'a',
                                        attributes: [{ id: 'href', value: `/demerits/edit?d=${date.friendly}` }],
                                        innerText: date.friendly
                                    }
                                ]
                            },
                            {
                                type: 'td',
                                innerText: hole
                            },
                            {
                                type: 'td',
                                innerText: demerits.toString()
                            },
                            {
                                type: 'td',
                                innerText: rule.rule
                            },
                            {
                                type: 'td',
                                children: [
                                    {
                                        classList: ['d-flex', 'justify-content-evenly', 'align-items-center'],
                                        children: titles.titles.map(({ action, class: c, name, icon }) => {
                                            return {
                                                classList: ['btn', `btn-${c}`],
                                                attributes: [
                                                    { id: 'data-bs-placement', value: 'top' },
                                                    { id: 'data-bs-toggle', value: 'tooltip' },
                                                    { id: 'title', value: `${action} ${name}` }
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
                                            };
                                        })
                                    }
                                ]
                            }
                        ]
                    }), null);
                };
                break;
            case 'drinks':
                for (const drink of sortedData) {
                    const { date, drinks } = drink;
                    tableBody.insertBefore(createElement({
                        type: 'tr',
                        children: [
                            {
                                type: 'td',
                                children: [
                                    {
                                        type: 'a',
                                        attributes: [{ id: 'href', value: `/demerits/drinks/edit?d=${date.friendly}` }],
                                        innerText: date.friendly
                                    }
                                ]
                            },
                            {
                                type: 'td',
                                innerText: drinks
                            }
                        ]
                    }), null);
                };
                break;
            case 'rounds':
                for (const round of sortedData) {
                    const { course, date, games, _id, par, performance, players, shots } = round;
                    tableBody.insertBefore(createElement({
                        type: 'tr',
                        children: [
                            {
                                type: 'td',
                                children: [
                                    {
                                        type: 'a',
                                        attributes: [{ id: 'href', value: `/rounds/${_id}` }],
                                        innerText: date.friendly
                                    }
                                ]
                            },
                            {
                                type: 'td',
                                children: [
                                    {
                                        type: 'a',
                                        attributes: [{ id: 'href', value: `/rounds/courses/${course.id}` }],
                                        innerText: course.name
                                    }
                                ]
                            },
                            {
                                type: 'td',
                                innerText: shots
                            },
                            {
                                type: 'td',
                                // classList: [par.class],
                                innerText: par.score
                            },
                            {
                                type: 'td',
                                innerText: performance.eagle.toString()
                            },
                            {
                                type: 'td',
                                innerText: performance.birdie.toString()
                            },
                            {
                                type: 'td',
                                innerText: performance.par.toString()
                            },
                            {
                                type: 'td',
                                innerText: performance.bogey.toString()
                            },
                            {
                                type: 'td',
                                innerText: performance['double-bogey'].toString()
                            },
                            {
                                type: 'td',
                                children: [
                                    {
                                        classList: ['d-flex', 'flex-column'],
                                        children: players.players.map(({ id, knownAs }) => {
                                            return {
                                                type: 'a',
                                                attributes: [{ id: 'href', value: `/players/${id}` }],
                                                innerText: knownAs
                                            };
                                        })
                                    }
                                ]
                            },
                            {
                                type: 'td',
                                children: [
                                    {
                                        classList: ['g-2', 'row', 'row-cols-1'],
                                        children: games.games.map(({ description, summary }) => {
                                            return {
                                                classList: ['col', 'd-flex', 'flex-column'],
                                                children: [
                                                    { innerText: description },
                                                    { classList: ['fw-light'], innerText: summary }
                                                ]
                                            };
                                        })
                                    }
                                ]
                            }
                        ]
                    }), null);
                };
                break;
            default:
                return;
        };
    });
};