function provideFeedback(message) {
    const feedback = document.getElementById('feedback');
    const feedbackParent = feedback.parentElement;
    feedback.innerText = message;
    feedbackParent.classList.remove('d-none');
    feedbackParent.removeAttribute('visibility');
};

// use ./validate/resetValidation.js
function removeInvalidClass(id) {
    document.getElementById(id).classList.remove('is-invalid');
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

function resetCourseSearchValidation() {
    const feedback = document.getElementById('feedback');
    const feedbackParent = feedback.parentElement;
    removeInvalidClass('region-select');
    removeInvalidClass('city');
    removeInvalidClass('course-name');
    feedback.innerText = 'No new courses found.';
    feedbackParent.classList.add('d-none');
    feedbackParent.setAttribute('visibility', 'hidden');
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
                    const marker = (document.getElementById('marker|id') || { value: undefined }).value;
                    const response = await fetch(`/rounds/courses/find?id=${this.closest('tr').id}&country=${country}${marker && marker !== 'Select Player' ? `&marker=${marker}` : ''}`)
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
                    const { id: value, name: innerText } = data;
                    resetCourseModalFields();
                    courses.push(data);
                    courseSelect.insertBefore(createElement({
                        type: 'option',
                        attributes: [{ id: 'value', value }],
                        innerText
                    }), courseSelect.querySelector('[value="new"]'));
                    courseSelect.querySelector('[selected]').removeAttribute('selected');
                    courseSelect.querySelector(`[value="${value}"]`).setAttribute('selected', true);
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

function searchOnEnter(event) {
    if (event.keyCode === 13) searchCourse.call(event.target);
};

function selectCourse() {
    const course = courses.find(({ id }) => id == this.value);
    const teeElement = document.querySelector('#tees tbody');
    const teeElementParent = closestColumn(teeElement);
    const teeSelects = document.querySelectorAll('select[id$="|tee"]');

    // const scorecardAccordionItem = document.getElementById('scorecard-heading').closest('.accordion-item');

    const holeOneParentColumn = document.getElementById('hole-1').closest('.row').closest('.col-12');
    const paginationParentElement = closestColumn(document.querySelector('ul'));

    // const playersAccordion = document.getElementById('players');

    toggleElement(teeElementParent, false);
    toggleElement(holeOneParentColumn, false);
    toggleElement(paginationParentElement, false);

    // playersAccordion.classList.add('forced-accordion-bottom');

    removeChildren(teeElement);
    for (const teeSelect of teeSelects) {
        removeChildren(teeSelect);
        toggleElement(closestColumn(teeSelect), false);
    };
    for (let i = 1; i < 19; i++) {
        const tableBody = document.querySelector(`#hole-${i} tbody`);
        removeChildren(tableBody);
        toggleElement(closestColumn(tableBody), course);
        if (!course) continue;
        for (const tee of course.tees) {
            const { colour, _id, names: { long, short } } = tee;
            const id = `${_id}-${i}|`;
            tableBody.insertBefore(createElement({
                type: 'tr',
                classList: colour ? [ colour.class.table ] : [],
                children: [
                    {
                        type: 'td',
                        children: [
                            {
                                classList: ['d-none', 'd-md-block'],
                                attributes: [{ id: 'id', value: `${id}long-name` }],
                                innerText: long
                            },
                            {
                                classList: ['d-block', 'd-md-none'],
                                attributes: [{ id: 'id', value: `${id}short-name` }],
                                innerText: short
                            }
                        ]
                    },
                    ...['distance', 'par', 'strokeIndex'].map(property => {
                        const value = `${id}${property}`;
                        return {
                            type: 'td',
                            children: [
                                {
                                    children: [
                                        {
                                            type: 'label',
                                            classList: ['d-none', 'form-label'],
                                            attributes: [{ id: 'for', value }]
                                        },
                                        {
                                            type: 'input',
                                            classList: ['form-control', 'text-center'],
                                            attributes: [
                                                { id: 'id', value },
                                                { id: 'type', value: 'number' },
                                                { id: 'name', value: `[course][tees][${_id}][${i}][${property}]` },
                                                ...(function() {
                                                    switch (property) {
                                                        case 'distance':
                                                            return [{ id: 'min', value: '1' }];
                                                        case 'par':
                                                            return [
                                                                { id: 'min', value: '3' },
                                                                { id: 'max', value: '5' }
                                                            ]
                                                        case 'strokeIndex':
                                                            return [
                                                                { id: 'min', value: '1' },
                                                                { id: 'max', value: '18' }
                                                            ];
                                                    };
                                                })()
                                            ],
                                            addEventListener: [{ type: 'blur', listener: updateData }]
                                        }
                                    ]
                                }
                            ]
                        };
                    })
                ]
            }), null);
        };
    };
    if (course) {
        const { _id: defaultTee } = course.tees.find(({ default: defaultTee }) => defaultTee) || {};
        toggleElement(teeElementParent);
        toggleElement(holeOneParentColumn);
        toggleElement(paginationParentElement);

        // playersAccordion.classList.remove('forced-accordion-bottom');

        for (const tee of course.tees) {
            const { colour, holes, _id, names: { long, short, value }, par, ratings: { bogey, course, slope } } = tee;
            for (const teeSelect of teeSelects) {
                teeSelect.insertBefore(createElement({
                    type: 'option',
                    attributes: [{ id: 'value', value: _id }],
                    innerText: long
                }), null);
            };
            teeElement.insertBefore(createElement({
                type: 'tr',
                classList: colour ? [ colour.class.table ] : [],
                children: [
                    {
                        type: 'td',
                        children: [
                            {
                                classList: ['d-none', 'd-md-block'],
                                attributes: [{ id: 'id', value: `${value}|long-name` }],
                                innerText: long
                            },
                            {
                                classList: ['d-block', 'd-md-none'],
                                attributes: [{ id: 'id', value: `${value}|short-name` }],
                                innerText: short
                            }
                        ]
                    },
                    ...['par',
                        'course-rating-full',
                        'course-rating-front',
                        'course-rating-back',
                        'bogey-rating',
                        'slope-rating-full',
                        'slope-rating-front',
                        'slope-rating-back'
                    ].map(property => {
                        return {
                            type: 'td',
                            classList: ['course-rating-front',
                                'course-rating-back',
                                'bogey-rating',
                                'slope-rating-front',
                                'slope-rating-back'].includes(property) ? ['d-none', 'd-lg-table-cell'] : [],
                            children: [
                                {
                                    attributes: [{ id: 'id', value: `${value}|${property}` }],
                                    innerText: (function() {
                                            switch (property) {
                                                case 'par':
                                                    if (par?.full) return par.full;
                                                    else if (holes) return holes.reduce((sum, hole) => sum + hole.par, 0);
                                                case 'course-rating-full':
                                                    return singleDecimal(course.full);
                                                case 'course-rating-front':
                                                    return singleDecimal(course.front);
                                                case 'course-rating-back':
                                                    return singleDecimal(course.back);
                                                case 'bogey-rating':
                                                    return singleDecimal(bogey);
                                                case 'slope-rating-full':
                                                    return slope.full;
                                                case 'slope-rating-front':
                                                    return slope.front;
                                                case 'slope-rating-back':
                                                    return slope.back;
                                            };
                                        })()
                                }
                            ]
                        };
                    })
                ]
            }), null);
            if (!holes) continue;
            for (const hole of holes) {
                const { distance, index, par, strokeIndex } = hole;
                const holeId = `${_id}-${index}|`;
                const distanceElement = document.getElementById(`${holeId}distance`);
                const parElement = document.getElementById(`${holeId}par`);
                const strokeIndexElement = document.getElementById(`${holeId}strokeIndex`);
                if (distanceElement) distanceElement.value = distance;
                if (parElement) parElement.value = par;
                if (strokeIndexElement) strokeIndexElement.value = strokeIndex;
            };
        };
        for (const teeSelect of teeSelects) {
            const [ , player ] = teeSelect.id.match(/([^|]+)\|tee/);
            toggleElement(closestColumn(teeSelect), !/select player/i.test(document.getElementById(`${player}|id`)?.value));
            Array.from(teeSelect.children).find(({ value }) => defaultTee === value).setAttribute('selected', true);
        };
    } else if (this.value === 'new') {
        if (window.navigator.onLine) new bootstrap.Modal(document.getElementById('course-search-modal')).show();
        else {
            this.querySelector('[selected]').removeAttribute('selected');
            this[0].setAttribute('selected', true);
            this.classList.add('is-invalid');
        };
    };
    validation.call(this);
};

const countrySelect = document.getElementById('country-select');
const regionSelect = document.getElementById('region-select');
const cityInput = document.getElementById('city');
const courseNameInput = document.getElementById('course-name');

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
    if (!regions || regions.length === 0) return provideFeedback(message);
    for (const region of regions) {
        regionSelect.insertBefore(createElement({
            type: 'option',
            attributes: [{ id: 'value', value: region.code }],
            innerText: region.name
        }), null);
    };
    toggleGrandparentVisibility(regionSelect);
});

// shared with models/course.js
function singleDecimal(number) {
    return Number.parseFloat(number).toFixed(1);
};

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

document.getElementById('course-select').addEventListener('change', function() {
    selectCourse.bind(this)();
    updateData.bind(this)();
});