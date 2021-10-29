function applyRoundingClasses() {
    function addRoundingClasses(leftSelector, rightSelector) {
        document.querySelector(leftSelector).classList.add('left-hole');
        document.querySelector(rightSelector).classList.add('right-hole');
    };
    const width = window.innerWidth;
    const hole = document.querySelector('.active').dataset.hole;
    if (document.querySelector('.left-hole')) document.querySelector('.left-hole').classList.remove('left-hole');
    if (document.querySelector('.right-hole')) document.querySelector('.right-hole').classList.remove('right-hole');
    if (width < 576) {
        if (hole < 7) addRoundingClasses('li.page-item[data-hole="1"]:not([data-hole-end])', 'li.page-item[data-hole="13"][data-hole-end="18"]');
        else if (hole < 13) addRoundingClasses('li.page-item[data-hole="1"][data-hole-end="6"]', 'li.page-item[data-hole="13"][data-hole-end="18"]');
        else addRoundingClasses('li.page-item[data-hole="1"][data-hole-end="6"]', 'li.page-item[data-hole="18"]:not([data-hole-end])');
    } else if (width < 768) {
        if (hole < 10) addRoundingClasses('li.page-item[data-hole="1"]:not([data-hole-end])', 'li.page-item[data-hole="10"][data-hole-end="18"]');
        else addRoundingClasses('li.page-item[data-hole="1"][data-hole-end="9"]', 'li.page-item[data-hole="18"]:not([data-hole-end])');
    } else addRoundingClasses('li.page-item[data-hole="1"]:not([data-hole-end])', 'li.page-item[data-hole="18"]:not([data-hole-end])');
};

for (const page of document.querySelectorAll('li')) {
    page.addEventListener('click', function () {
        function addHoleClasses(index, classes) {
            const elementClassList = document.querySelector(`li.page-item[data-hole="${index}"]:not([data-hole-end])`).classList;
            elementClassList.add( ...classes );
        };
        const hole = this.dataset.hole;
        const holeElement = document.querySelector(`#hole-${hole}`);
        const activeHole = document.querySelector('li.page-item.active');
        const activeHoleElement = document.querySelector(`#hole-${activeHole.dataset.hole}`);
        const frontClassList = document.querySelector('li.page-item[data-hole="1"][data-hole-end="9"]').classList;
        const oneToSixClassList = document.querySelector('li.page-item[data-hole="1"][data-hole-end="6"]').classList;
        const sevenToTwelveClassList = document.querySelector('li.page-item[data-hole="7"][data-hole-end="12"]').classList;
        const thirteenToEighteenClassList = document.querySelector('li.page-item[data-hole="13"][data-hole-end="18"]').classList;
        const backClassList = document.querySelector('li.page-item[data-hole="10"][data-hole-end="18"]').classList;
        activeHole.classList.remove('active');
        activeHoleElement.setAttribute('visibility', 'hidden');
        activeHoleElement.classList.add('d-none');
        holeElement.removeAttribute('visibility');
        holeElement.classList.remove('d-none');
        addHoleClasses(hole, ['active']);
        for (const listItem of Array.from(document.querySelectorAll('li.page-item'))) {
            listItem.classList.remove('d-none', 'd-sm-none', 'd-md-none', 'd-sm-block', 'd-md-block');
        };
        if (hole < 7) {
            frontClassList.add('d-none');
            oneToSixClassList.add('d-none');
            sevenToTwelveClassList.add('d-sm-none');
            thirteenToEighteenClassList.add('d-sm-none');
            backClassList.add('d-none', 'd-sm-block', 'd-md-none');
            for (let i = 7; i < 10; i++) addHoleClasses(i, ['d-none', 'd-sm-block']);
            for (let i = 10; i < 19; i++) addHoleClasses(i, ['d-none', 'd-md-block']);
        } else if (hole < 10) {
            frontClassList.add('d-none');
            oneToSixClassList.add('d-sm-none');
            sevenToTwelveClassList.add('d-none');
            thirteenToEighteenClassList.add('d-sm-none');
            backClassList.add('d-none', 'd-sm-block', 'd-md-none');
            for (let i = 1; i < 7; i++) addHoleClasses(i, ['d-none', 'd-sm-block']);
            for (let i = 10; i < 13; i++) addHoleClasses(i, ['d-sm-none', 'd-md-block']);
            for (let i = 13; i < 19; i++) addHoleClasses(i, ['d-none', 'd-md-block']);
        } else if (hole < 13) {
            frontClassList.add('d-none', 'd-sm-block', 'd-md-none');
            oneToSixClassList.add('d-sm-none');
            sevenToTwelveClassList.add('d-none');
            thirteenToEighteenClassList.add('d-sm-none');
            backClassList.add('d-none');
            for (let i = 1; i < 7; i++) addHoleClasses(i, ['d-none', 'd-md-block']);
            for (let i = 7; i < 10; i++) addHoleClasses(i, ['d-sm-none', 'd-md-block']);
            for (let i = 13; i < 19; i++) addHoleClasses(i, ['d-none', 'd-sm-block']);
        } else {
            frontClassList.add('d-none', 'd-sm-block', 'd-md-none');
            oneToSixClassList.add('d-sm-none');
            sevenToTwelveClassList.add('d-sm-none');
            thirteenToEighteenClassList.add('d-none');
            backClassList.add('d-none');
            for (let i = 1; i < 7; i++) addHoleClasses(i, ['d-none', 'd-md-block']);
            for (let i = 7; i < 10; i++) addHoleClasses(i, ['d-none', 'd-md-block']);
            for (let i = 10; i < 13; i++) addHoleClasses(i, ['d-none', 'd-sm-block']);
        };
        applyRoundingClasses();
    });
};

window.addEventListener('resize', applyRoundingClasses);

applyRoundingClasses();