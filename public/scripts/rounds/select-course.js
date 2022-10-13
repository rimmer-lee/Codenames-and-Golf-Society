function removeInvalidClass(id) {
    document.getElementById(id).classList.remove('is-invalid');
};

function provideFeedback(message) {
    const feedback = document.getElementById('feedback');
    const feedbackParent = feedback.parentElement;
    feedback.innerText = message;
    feedbackParent.classList.remove('d-none');
    feedbackParent.removeAttribute('visibility');
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
        toggleElement(tableBody.closest('[class*="col"]'), course);
        if (!course) continue;
        // toggleElement(tableBody.closest('[class*="col"]'));
        for (const tee of course.tees) {
            const { colour, id, names: { long, short } } = tee;
            tableBody.insertBefore(createElement({
                type: 'tr',
                classList: colour ? [ colour.class.table ] : [],
                children: [
                    {
                        type: 'td',
                        children: [
                            {
                                classList: ['d-none', 'd-md-block'],
                                attributes: [{ id: 'id', value: `${id}-${i}|long-name` }],
                                innerText: long
                            },
                            {
                                classList: ['d-block', 'd-md-none'],
                                attributes: [{ id: 'id', value: `${id}-${i}|short-name` }],
                                innerText: short
                            }
                        ]
                    },
                    ...['distance', 'par', 'strokeIndex'].map(property => {
                        return {
                            type: 'td',
                            children: [
                                {
                                    children: [
                                        {
                                            type: 'label',
                                            classList: ['d-none', 'form-label'],
                                            attributes: [{ id: 'for', value: `${id}-${i}|${property}` }]
                                        },
                                        {
                                            type: 'input',
                                            classList: ['form-control', 'text-center'],
                                            attributes: [
                                                { id: 'id', value: `${id}-${i}|${property}` },
                                                { id: 'type', value: 'number' },
                                                { id: 'name', value: `[course][tees][${id}][${i}][${property}]` },
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
        toggleElement(teeElementParent);
        toggleElement(teeSelectParent);
        toggleElement(holeOneParentColumn);
        toggleElement(paginationParentElement);
        // playersAccordion.classList.remove('forced-accordion-bottom');
        for (const tee of course.tees) {
            const { colour, holes, id, names: { long, short, value }, par, ratings: { bogey, course, slope } } = tee;
            teeSelect.insertBefore(createElement({
                type: 'option',
                attributes: [{ id: 'value', value: id }],
                innerText: long
            }), null);
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
                        'courseRating-full',
                        'courseRating-front',
                        'courseRating-back',
                        'bogeyRating',
                        'slopeRating-full',
                        'slopeRating-front',
                        'slopeRating-back'
                    ].map(property => {
                        return {
                            type: 'td',
                            classList: ['courseRating-front',
                                'courseRating-back',
                                'bogeyRating',
                                'slopeRating-front',
                                'slopeRating-back'].includes(property) ? ['d-none', 'd-lg-table-cell'] : [],
                            children: [
                                {
                                    attributes: [{ id: 'id', value: `${value}|${property}` }],
                                    innerText: (function() {
                                            switch (property) {
                                                case 'par':
                                                    if (par?.full) return par.full;
                                                    else if (holes) return holes.reduce((sum, hole) => sum + hole.par, 0);
                                                case 'courseRating-full':
                                                    return singleDecimal(course.full);
                                                case 'courseRating-front':
                                                    return singleDecimal(course.front);
                                                case 'courseRating-back':
                                                    return singleDecimal(course.back);
                                                case 'bogeyRating':
                                                    return singleDecimal(bogey);
                                                case 'slopeRating-full':
                                                    return slope.full;
                                                case 'slopeRating-front':
                                                    return slope.front;
                                                case 'slopeRating-back':
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
                const holeId = `${id}-${index}|`;
                const distanceElement = document.getElementById(`${holeId}distance`);
                const parElement = document.getElementById(`${holeId}par`);
                const strokeIndexElement = document.getElementById(`${holeId}strokeIndex`);
                if (distanceElement) distanceElement.value = distance;
                if (parElement) parElement.value = par;
                if (strokeIndexElement) strokeIndexElement.value = strokeIndex;
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

document.getElementById('course-select').addEventListener('change', selectCourse);
document.getElementById('course-select').addEventListener('change', updateData);