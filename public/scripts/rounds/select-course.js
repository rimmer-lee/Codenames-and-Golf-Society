function searchOnEnter(event) {
    if (event.keyCode === 13) searchCourse.call(event.target);
};

function provideFeedback(message) {
    const feedback = document.getElementById('feedback');
    const feedbackParent = feedback.parentElement;
    feedback.innerText = message;
    feedbackParent.classList.remove('d-none');
    feedbackParent.removeAttribute('visibility');
};

function resetCourseSearchValidation() {
    function removeInvalidClass(id) {
        document.getElementById(id).classList.remove('is-invalid');
    };
    const feedback = document.getElementById('feedback');
    const feedbackParent = feedback.parentElement;
    removeInvalidClass('region-select');
    removeInvalidClass('city');
    removeInvalidClass('course-name');
    feedback.innerText = 'No new courses found.';
    feedbackParent.classList.add('d-none');
    feedbackParent.setAttribute('visibility', 'hidden');
};

function resetCourseModalFields() {
    const countrySelect = document.getElementById('country-select');
    const regionSelect = document.getElementById('region-select');
    const city = document.getElementById('city');
    const name = document.getElementById('course-name');
    const coursesTable = document.getElementById('courses').querySelector('tbody');
    countrySelect.querySelector('[selected]').removeAttribute('selected');
    countrySelect.children[0].setAttribute('selected', true);
    while (regionSelect.children.length > 0) regionSelect.children[0].remove();
    regionSelect.insertBefore(createElement({
        type: 'option',
        attributes: [{ id: 'selected', value: true }],
        innerText: 'Select Region'
    }), null);
    toggleGrandparentVisibility(regionSelect, false);
    city.value = '';
    toggleGrandparentVisibility(city, false);
    name.value = '';
    while (coursesTable.children.length > 0) coursesTable.children[0].remove();
    toggleGrandparentVisibility(coursesTable, false);
};

async function searchCourse() {
    const regionSelect = document.getElementById('region-select');
    const cityInput = document.getElementById('city');
    const courseNameInput = document.getElementById('course-name');
    const coursesTable = document.getElementById('courses').querySelector('tbody');
    const feedbackParent = document.getElementById('feedback').parentElement;
    const country = document.getElementById('country-select').value;
    const region = regionSelect.value;
    const city = cityInput.value;
    const name = courseNameInput.value;
    const invalidCountry = /select/i.test(country);
    const invalidRegion = /select/i.test(region);
    toggleGrandparentVisibility(coursesTable, false);
    resetCourseSearchValidation();
    if (invalidCountry && invalidRegion && !city && !name) return courseNameInput.classList.add('is-invalid');
    if (!invalidCountry && invalidRegion && !city && !name) return regionSelect.classList.add('is-invalid');
    if (!invalidCountry && !invalidRegion && !city && !name) return cityInput.classList.add('is-invalid');
    const modalContent = this.closest('.modal-content');
    modalContent.classList.add('spin');
    let path = '/rounds/courses/find?';
    while (coursesTable.children.length > 0) coursesTable.children[0].remove()
    if (!/select/i.test(country)) path += `&country=${country}`;
    if (!/select/i.test(region)) path += `&region=${region}`;
    if (city) path += `&city=${city}`;
    if (name) path += `&name=${name}`;
    path = path.replace('&', '');
    const response = await fetch(path)
        .then(response => response.json());
    modalContent.classList.remove('spin');
    const { data, message, success } = response;
    if (!success) return provideFeedback(message);
    const localStorage = JSON.parse(window.localStorage.getItem('courses')) || [];
    const newCourses = data.filter(({ id }) => !localStorage.some(({ randa }) => randa == id));
    if (newCourses.length > 0) {
        for (const course of newCourses) {
            const tableRow = {
                type: 'tr',
                attributes: [
                    { id: 'id', value: course.id },
                    { id: 'data-bs-dismiss', value: 'modal' }
                ],
                addEventListener: [{ listener: async function() {
                    document.body.classList.add('spin');
                    const courseSelect = document.getElementById('course-select');
                    const response = await fetch(`/rounds/courses/find?id=${this.closest('tr').id}&country=${country}`)
                        .then(response => response.json());
                    const { data, message, success } = response;
                    if (!success) {
                        if (/Course already exists/i.test(message)) {
                            courseSelect.querySelector('[selected]').removeAttribute('selected');
                            courseSelect.querySelector(`[value="${data._id}"]`).setAttribute('selected', true);
                            selectCourse.call(courseSelect);
                            bootstrap.Modal.getInstance(document.getElementById('course-search-modal')).hide();
                        };
                        provideFeedback(message);
                        return this.remove();
                    };
                    const id = `randa-${data.randa}`;
                    const localStorage = JSON.parse(window.localStorage.getItem('courses')) || [];
                    resetCourseModalFields();
                    localStorage.push(data);
                    window.localStorage.setItem('courses', JSON.stringify(localStorage));
                    courses.push(data);
                    courseSelect.insertBefore(createElement({
                        type: 'option',
                        attributes: [{ id: 'value', value: id }],
                        innerText: data.name
                    }), courseSelect.querySelector('[value="new"]'));
                    courseSelect.querySelector('[selected]').removeAttribute('selected');
                    courseSelect.querySelector(`[value="${id}"]`).setAttribute('selected', true);
                    sortCourses();
                    selectCourse.call(courseSelect);
                    document.body.classList.remove('spin');
                } }],
                children: []
            };
            for (const key of ['name', 'city', 'region', 'country']) {
                const tableCellElement = {
                    type: 'td',
                    children: []
                };
                let tableCellChildElement;
                if (key === 'city') tableCellElement.classList = ['d-none', 'd-md-table-cell'];
                else if (key === 'country') tableCellElement.classList = ['d-none', 'd-lg-table-cell'];
                if (course.region && key === 'region') {
                    tableCellElement.children.push({
                        classList: ['d-none', 'd-lg-block', 'text-center'],
                        innerText: course.region.name || ''
                    });
                    tableCellChildElement = {
                        classList: ['d-lg-none', 'text-center'],
                        innerText: course.region.code || ''
                    };
                } else {
                    tableCellChildElement = {
                        classList: ['text-center'],
                        innerText: course[key] || ''
                    };
                };
                tableCellElement.children.push(tableCellChildElement);
                tableRow.children.push(tableCellElement);
            };
            coursesTable.insertBefore(createElement(tableRow), null);
        };
        toggleGrandparentVisibility(coursesTable);
    } else {
        feedbackParent.classList.remove('d-none');
        feedbackParent.removeAttribute('visibility');
    };
};

function selectCourse() {
    const course = courses.find(({ randa, id }) => id == this.value || (/^randa/.test(this.value) && randa == this.value.split('randa-')[1]));
    const teeElement = document.querySelector('#tees tbody');
    const teeElementParent = teeElement.closest('[class*="col"]');
    const teeSelect = document.getElementById('tee-select');
    const teeSelectParent = teeSelect.closest('[class*="col"]');
    // const scorecardAccordionItem = document.getElementById('scorecard-heading').closest('.accordion-item');
    const holeOneParentColumn = document.getElementById('hole-1').closest('.row').closest('.col-12');
    const paginationParentElement = document.querySelector('ul').closest('[class*="col"]');
    // const playersAccordion = document.getElementById('players');
    toggleElement(teeElementParent, false);
    toggleElement(teeSelectParent, false);
    toggleElement(holeOneParentColumn, false);
    toggleElement(paginationParentElement, false);
    // playersAccordion.classList.add('forced-accordion-bottom');
    while (teeElement.children.length > 0) teeElement.children[0].remove();
    while (teeSelect.children.length > 0) teeSelect.children[0].remove();
    for (let i = 1; i < 19; i++) {
        const tableBody = document.querySelector(`#hole-${i} tbody`);
        while (tableBody.children.length > 0) tableBody.children[0].remove();
        toggleElement(tableBody.closest('[class*="col"]'), false);
        if (!course) continue;
        toggleElement(tableBody.closest('[class*="col"]'));
        for (const tee of course.tees) {
            const newElementObject = { type: 'tr', classList: [], children: [] };
            let longName = tee.name;
            let shortName = tee.name;
            let teeValue = tee.name.toLowerCase();
            if (/\s/.test(tee.name)) shortName = shortName.split(' ');
            else shortName = shortName.split('/');
            shortName = shortName.map(name => {
                if (/\D/.test(name)) {
                    for (const letter of name) {
                        if (/\w/.test(letter)) return letter.toUpperCase();
                    };
                };
                return name;
            }).join('');
            if (tee.gender && course.tees.filter(({ name }) => name === tee.name).length > 1) {
                teeValue += `-${tee.gender.toLowerCase()}`;
                longName += ` (${tee.gender[0].toUpperCase()}${tee.gender.substr(1).toLowerCase()})`;
                shortName += ` (${tee.gender[0].toUpperCase()})`;
            };
            if (tee.colour) newElementObject.classList.push(((teeColours.find(({ colour }) => colour === tee.colour) || {}).class || {}).table);
            newElementObject.children.push({
                type: 'td',
                classList: ['align-middle'],
                children: [
                    {
                        classList: ['d-none', 'd-md-block', 'text-center'],
                        attributes: [{ id: 'id', value: `${teeValue}-${i}|long-name` }],
                        innerText: longName
                    },
                    {
                        classList: ['d-block', 'd-md-none', 'text-center'],
                        attributes: [{ id: 'id', value: `${teeValue}-${i}|short-name` }],
                        innerText: shortName
                    }
                ]
            });
            for (const property of ['distance', 'par', 'strokeIndex']) {
                const dataElementObject = {
                    type: 'td',
                    classList: ['align-middle'],
                    children: []
                };
                dataElementObject.children.push({
                    classList: ['d-flex', 'justify-content-center'],
                    children: [
                        {
                            type: 'label',
                            classList: ['d-none', 'form-label'],
                            attributes: [{ id: 'for', value: `${teeValue}-${i}|${property}` }]
                        },
                        {
                            type: 'input',
                            classList: ['form-control', 'text-center'],
                            attributes: [
                                { id: 'id', value: `${teeValue}-${i}|${property}` },
                                { id: 'type', value: 'number' },
                                { id: 'name', value: `[course][tees][${teeValue}][${i}][${property}]` },
                            ],
                            addEventListener: [{ type: 'blur', listener: updateData }]
                        }
                    ]
                });
                switch (property) {
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
        toggleElement(holeOneParentColumn);
        toggleElement(paginationParentElement);
        // playersAccordion.classList.remove('forced-accordion-bottom');
        for (const tee of course.tees) {
            const optionElementObject = {
                type: 'option',
                attributes: [{ id: 'value', value: tee.name }],
                innerText: tee.name
            };
            const tableRowElementObject = { type: 'tr', classList: [], children: [] };
            let teeValue = tee.name.toLowerCase();
            let longName = tee.name;
            let shortName = tee.name;
            if (/\s/.test(tee.name)) shortName = shortName.split(' ');
            else shortName = shortName.split('/');
            shortName = shortName.map(name => {
                if (/\D/.test(name)) {
                    for (const letter of name) {
                        if (/\w/.test(letter)) return letter.toUpperCase();
                    };
                };
                return name;
            }).join('');
            if (tee.gender && course.tees.filter(({ name }) => name === tee.name).length > 1) {
                teeValue += `-${tee.gender.toLowerCase()}`;
                optionElementObject.attributes.find(({ id }) => id === 'value').value = teeValue;
                optionElementObject.innerText = `${tee.name} (${tee.gender})`;
                longName += ` (${tee.gender[0].toUpperCase()}${tee.gender.substr(1).toLowerCase()})`;
                shortName += ` (${tee.gender[0].toUpperCase()})`;
            };
            if (tee.colour) tableRowElementObject.classList.push(teeColours.find(({ colour }) => colour === tee.colour).class.table);
            teeSelect.insertBefore(createElement(optionElementObject), null);
            tableRowElementObject.children.push({
                type: 'td',
                classList: ['align-middle'],
                children: [
                    {
                        classList: ['d-none', 'd-md-block', 'text-center'],
                        attributes: [{ id: 'id', value: `${teeValue}|long-name` }],
                        innerText: longName
                    },
                    {
                        classList: ['d-block', 'd-md-none', 'text-center'],
                        attributes: [{ id: 'id', value: `${teeValue}|short-name` }],
                        innerText: shortName
                    }
                ]
            });
            for (const property of ['par', 'courseRating-full', 'courseRating-front', 'courseRating-back', 'bogeyRating', 'slopeRating-full', 'slopeRating-front', 'slopeRating-back']) {
                const tableDataElementObject = {
                    type: 'td',
                    classList: ['align-middle'],
                    children: [
                        {
                            classList: ['text-center'],
                            attributes: [{ id: 'id', value: `${teeValue}|${property}` }]
                        }
                    ]
                };
                let classesToAssign = [];
                let valueToAssign = '';
                switch (property) {
                    case 'par':
                        if ((tee.par || {}).full) valueToAssign = tee.par.full;
                        else if (tee.holes) valueToAssign = tee.holes.reduce((sum, hole) => sum + hole.par, 0);
                        break;
                    case 'courseRating-full':
                        valueToAssign = tee.ratings.course.full;
                        break;
                    case 'courseRating-front':
                        classesToAssign = ['d-none', 'd-lg-table-cell'];
                        valueToAssign = tee.ratings.course.front;
                        break;
                    case 'courseRating-back':
                        classesToAssign = ['d-none', 'd-lg-table-cell'];
                        valueToAssign = tee.ratings.course.back;
                        break;
                    case 'bogeyRating':
                        classesToAssign = ['d-none', 'd-lg-table-cell'];
                        valueToAssign = tee.ratings.bogey;
                        break;
                    case 'slopeRating-full':
                        valueToAssign = tee.ratings.slope.full;
                        break;
                    case 'slopeRating-front':
                        classesToAssign = ['d-none', 'd-lg-table-cell'];
                        valueToAssign = tee.ratings.slope.front;
                        break;
                    case 'slopeRating-back':
                        classesToAssign = ['d-none', 'd-lg-table-cell'];
                        valueToAssign = tee.ratings.slope.back;
                        break;
                };
                if (['courseRating-full', 'courseRating-front', 'courseRating-back', 'bogeyRating'].includes(property)) valueToAssign = valueToAssign.toFixed(1);
                tableDataElementObject.classList.push( ...classesToAssign );
                tableDataElementObject.children[0].innerText = valueToAssign;
                tableRowElementObject.children.push(tableDataElementObject);
            };
            teeElement.insertBefore(createElement(tableRowElementObject), null);
            if (!tee.holes) continue;
            for (const hole of tee.holes) {
                const { distance, index, par, strokeIndex } = hole;
                const id = `${teeValue}-${index}|`;
                const distanceElement = document.getElementById(`${id}distance`);
                const parElement = document.getElementById(`${id}par`);
                const strokeIndexElement = document.getElementById(`${id}strokeIndex`);
                if (distanceElement) distanceElement.setAttribute('value', distance);
                if (parElement) parElement.setAttribute('value', par);
                if (strokeIndexElement) strokeIndexElement.setAttribute('value', strokeIndex);
            };
        };
        teeSelect.children[0].setAttribute('selected', true);
    } else if (this.value === 'new') {
        if (window.navigator.onLine) new bootstrap.Modal(document.getElementById('course-search-modal')).show();
        else {
            this.querySelector('[selected]').removeAttribute('selected');
            this[0].setAttribute('selected', true);
            this.classList.add('is-invalid');
        };
    };
    validation.call(this);
    selectTee.call(document.getElementById('tee-select'));
    updateScores();
};

const countrySelect = document.getElementById('country-select');
const regionSelect = document.getElementById('region-select');
const cityInput = document.getElementById('city');
const courseNameInput = document.getElementById('course-name');

document.getElementById('course-select').addEventListener('change', selectCourse);

countrySelect.addEventListener('click', resetCourseSearchValidation);

countrySelect.addEventListener('change', async function() {
    const country = this.value;
    const regionSelect = document.getElementById('region-select');
    toggleGrandparentVisibility(regionSelect, false);
    while (regionSelect.children.length > 0) regionSelect.children[0].remove();
    regionSelect.insertBefore(createElement({
        type: 'option',
        attributes: [{ id: 'selected', value: true }],
        innerText: 'Select Region'
    }), null);
    if (/select/i.test(country)) return this.classList.add('is-invalid');
    const response = await fetch(`/rounds/courses/find?country=${country}`)
        .then(response => response.json());
    const { data, message, success } = response;
    if (!success) return provideFeedback(message);
    const regions = data;
    if (!regions || regions.lenth === 0) return provideFeedback(message);
    for (const region of regions) {
        regionSelect.insertBefore(createElement({
            type: 'option',
            attributes: [{ id: 'value', value: region.code }],
            innerText: region.name
        }), null);
    };
    toggleGrandparentVisibility(regionSelect);
});

regionSelect.addEventListener('click', resetCourseSearchValidation);

regionSelect.addEventListener('change', function() {
    const city = document.getElementById('city');
    const regionUnselected = !/Select/.test(this.value);
    resetCourseSearchValidation();
    toggleGrandparentVisibility(city, regionUnselected);
    if (!regionUnselected) return this.classList.add('is-invalid');
    city.value = '';
});

cityInput.addEventListener('click', resetCourseSearchValidation);

cityInput.addEventListener('keydown', searchOnEnter);

courseNameInput.addEventListener('click', resetCourseSearchValidation);

courseNameInput.addEventListener('keydown', searchOnEnter);

document.getElementById('search-course').addEventListener('click', searchCourse);