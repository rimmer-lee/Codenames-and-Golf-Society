document.getElementById('reset-submit').addEventListener('click', () => {
    function resetElement(id, callback) {
        const element = document.getElementById(id);
        element.querySelector('[selected]').removeAttribute('selected');
        element.firstElementChild.setAttribute('selected', true);
        callback.call(element);
        if (element.hasAttribute('required')) resetValidation.call(element);
    };
    const gameAccordion = document.querySelector('#game .accordion');
    const playerSelects = document.querySelectorAll('select.form-select[id$="|id"]:not([id="marker|id"])');
    window.localStorage.removeItem('round');
    resetElement('course-select', selectCourse);
    for (const playerSelect of playerSelects) playerSelect.closest('.col-12').remove();
    resetElement('marker|id', selectPlayer);
    toggleVisibility(gameAccordion.parentElement, false);
    while (gameAccordion.children.length > 0) gameAccordion.children[0].remove();
    for (const accordionItem of document.querySelectorAll('.accordion-item')) {
        const accordionButton = accordionItem.querySelector('button.accordion-button');
        accordionItem.querySelector('.accordion-collapse.collapse').classList.add('show');
        accordionButton.setAttribute('aria-expanded', 'true');
        accordionButton.classList.remove('collapsed');
        handleAccordionClick.call(accordionButton);
    };
    updateData();
});

document.addEventListener('hidden.bs.modal', function(e) {
    switch (e.target.id) {
        case 'course-search-modal':
            const courseSelect = document.getElementById('course-select');
            resetCourseModalFields();
            if (!/new/i.test(courseSelect.value)) return false;
            courseSelect.querySelector('[selected]').removeAttribute('selected');
            Array.from(courseSelect.children).find(({ innerText }) => innerText === 'Select Course').setAttribute('selected', true);
            validation.call(courseSelect);
            return true;
        case 'new-player-modal':
            const playerSelects = document.querySelectorAll('select.form-select[id$="|id"]');
            resetPlayerModalFields();
            for (const playerSelect of playerSelects) {
                if (playerSelect.value !== 'new') continue;
                playerSelect.querySelector('[selected]').removeAttribute('selected');
                Array.from(playerSelect.children).find(({ innerText }) => innerText === 'Select Player').setAttribute('selected', true);
                selectPlayer.call(playerSelect);
            };
            return true;
    };
    return false;
});

document.addEventListener('show.bs.modal', function(e) {
    switch (e.target.id) {
        case 'confirmation-modal':
            const confirmationLabel = document.getElementById('confirmation-label');
            const roundDate = new Date(document.getElementById('date').value);
            confirmationLabel.innerText = '';
            if (roundDate.toDateString() !== new Date().toDateString()) confirmationLabel.innerText = `The date of the round is ${roundDate.full()}. `;
            confirmationLabel.innerText += 'Are you sure that you want to submit the round?';
            return true;
    };
    return false;
});