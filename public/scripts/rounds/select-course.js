function selectCourse() {
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
    const course = courses.find(({ _id }) => _id == this.value);
    const teeElement = document.querySelector('#tees tbody');
    const teeElementParent = teeElement.closest('[class*="col"]');
    const teeSelect = document.getElementById('tee-select');
    const teeSelectParent = teeSelect.closest('[class*="col"]');
    const scorecardAccordionItem = document.getElementById('scorecard-heading').closest('.accordion-item');
    const paginationParentElement = document.querySelector('ul').closest('[class*="col"]');
    const playersAccordion = document.getElementById('players');
    toggleElement(teeElementParent, false);
    toggleElement(teeSelectParent, false);
    toggleElement(scorecardAccordionItem, false);
    toggleElement(paginationParentElement, false);
    playersAccordion.classList.add('forced-accordion-bottom');
    while (teeElement.children.length > 0) teeElement.children[0].remove();
    while (teeSelect.children.length > 0) teeSelect.children[0].remove();
    for (let i = 1; i < 19; i++) {
        const tableBody = document.querySelector(`#hole-${i} tbody`);
        while (tableBody.children.length > 0) tableBody.children[0].remove();
        toggleElement(tableBody.closest('[class*="col"]'), false);
        if (!course) continue;
        toggleElement(tableBody.closest('[class*="col"]'));
        for (const tee of course.tees) {
            const newElementObject = { type: 'tr', classList: [ `table-${teeColours.find(({ colour }) => colour === tee.colour).class}` ], children: [] };
            for (const value of ['distance', 'par', 'strokeIndex']) {
                const dataElementObject = {
                    type: 'td',
                    children: [
                        {
                            classList: ['d-flex', 'justify-content-center'],
                            children: [
                                {
                                    type: 'label',
                                    classList: ['d-none', 'form-label'],
                                    attributes: [{ id: 'for', value: `${tee.colour}-${i}|${value}` }]
                                },
                                {
                                    type: 'input',
                                    classList: ['form-control', 'text-center'],
                                    attributes: [
                                        { id: 'id', value: `${tee.colour}-${i}|${value}` },
                                        { id: 'type', value: 'number' },
                                        { id: 'name', value: `[course][hole][${i}][${tee.colour}][${value}]` },
                                        { id: 'data-hole', value: i },
                                        { id: 'data-tee', value: tee.colour },
                                        { id: 'data-value', value: value },
                                        { id: 'disabled', value: '' }
                                    ]
                                }
                            ]
                        }
                    ]
                };
                switch (value) {
                    case 'distance':
                        dataElementObject.children[0].children[1].attributes.push({ id: 'min', value: '1' });
                        break;
                    case 'par':
                        dataElementObject.children[0].children[1].attributes.push({ id: 'min', value: '3' });
                        dataElementObject.children[0].children[1].attributes.push({ id: 'max', value: '5' });
                        break;
                    case 'strokeIndex':
                        dataElementObject.children[0].children[1].attributes.push({ id: 'min', value: '1' });
                        dataElementObject.children[0].children[1].attributes.push({ id: 'max', value: '18' });
                        break;
                };
                newElementObject.children.push(dataElementObject);
            };
            tableBody.insertBefore(createElement(newElementObject), null);
        };
    };
    if (course) {
        toggleElement(teeElementParent);
        toggleElement(teeSelectParent);
        toggleElement(scorecardAccordionItem);
        toggleElement(paginationParentElement);
        playersAccordion.classList.remove('forced-accordion-bottom');
        for (const tee of course.tees) {
            const optionElementObject = {
                type: 'option',
                attributes: [{ id: 'value', value: tee.colour }],
                innerText: `${tee.colour[0].toUpperCase()}${tee.colour.slice(1)}`
            };            
            const tableRowElementObject = {
                type: 'tr',
                classList: [ `table-${teeColours.find(({ colour }) => colour === tee.colour).class}` ],
                children: []
            };
            teeSelect.insertBefore(createElement(optionElementObject), null);
            for (const value of ['tee', 'par', 'courseRating-full', 'courseRating-front', 'courseRating-back', 'bogeyRating', 'slopeRating-full', 'slopeRating-front', 'slopeRating-back']) {
                const tableDataElementObject = {
                    type: 'td',
                    classList: [],
                    children: [
                        {
                            classList: ['d-flex', 'justify-content-center'],
                            children: [
                                {
                                    type: 'label',
                                    classList: ['d-none', 'form-label'],
                                    attributes: [{ id: 'for', value: `${tee.colour}|${value}` }]
                                },
                                {
                                    type: 'input',
                                    classList: ['form-control', 'text-center', 'text-capitalize'],
                                    attributes: [
                                        { id: 'id', value: `${tee.colour}|${value}` },
                                        { id: 'type', value: 'number' },
                                        { id: 'name', value: `[course][tee][${tee.colour}][${value}]` },
                                        { id: 'value', value: '' },
                                        { id: 'disabled', value: '' }
                                    ]
                                }
                            ]
                        }
                    ]
                };
                let classesToAssign = [];
                let valueToAssign;
                switch (value) {
                    case 'tee':
                        tableDataElementObject.children[0].children[1].attributes.find(({ id }) => id === 'type').value = 'text';
                        valueToAssign = tee.colour;
                        break;
                    case 'par':
                        valueToAssign = tee.holes.reduce((sum, hole) => sum + hole.par, 0);
                        break;
                    case 'courseRating-full':
                        valueToAssign = tee.ratings.course.full;
                        break;
                    case 'courseRating-front':
                        classesToAssign = ['d-none', 'd-md-table-cell'];
                        valueToAssign = tee.ratings.course.front;
                        break;
                    case 'courseRating-back':
                        classesToAssign = ['d-none', 'd-md-table-cell'];
                        valueToAssign = tee.ratings.course.back;
                        break;
                    case 'bogeyRating':
                        classesToAssign = ['d-none', 'd-md-table-cell'];
                        valueToAssign = tee.ratings.bogey;
                        break;
                    case 'slopeRating-full':
                        valueToAssign = tee.ratings.slope.full;
                        break;
                    case 'slopeRating-front':
                        classesToAssign = ['d-none', 'd-md-table-cell'];
                        valueToAssign = tee.ratings.slope.front;
                        break;
                    case 'slopeRating-back':
                        classesToAssign = ['d-none', 'd-md-table-cell'];
                        valueToAssign = tee.ratings.slope.back;
                        break;
                };
                tableDataElementObject.classList.push( ...classesToAssign );
                tableDataElementObject.children[0].children[1].attributes.find(({ id }) => id === 'value').value = valueToAssign;
                tableRowElementObject.children.push(tableDataElementObject);
            };
            teeElement.insertBefore(createElement(tableRowElementObject), null);
            for (const hole of tee.holes) {
                const distance = document.querySelector(`[data-hole="${hole.index}"][data-tee="${tee.colour}"][data-value="distance"]`);
                const par = document.querySelector(`[data-hole="${hole.index}"][data-tee="${tee.colour}"][data-value="par"]`);
                const strokeIndex = document.querySelector(`[data-hole="${hole.index}"][data-tee="${tee.colour}"][data-value="strokeIndex"]`);
                if (distance) distance.setAttribute('value', hole.distance);
                if (par) par.setAttribute('value', hole.par);
                if (strokeIndex) strokeIndex.setAttribute('value', hole.strokeIndex);
            };
        };
        teeSelect.children[0].setAttribute('selected', true);
    } else if (this.value === 'new') {
        // for (const ratingElement of ratingElements) ratingElement.value = '';
    };
    selectTee.call(document.getElementById('tee-select'));
};

document.getElementById('course-select').addEventListener('change', selectCourse);