function demeritModalClick() {
    const { bsHole, bsPlayer, bsPlayerName } = this.dataset;
    const demeritButton = document.getElementById('demerit-submit');
    let ordinal = 'th';
    switch (bsHole % 10) {
        case 1:
            ordinal = 'st';
            break;
        case 2:
            ordinal = 'nd';
            break;
        case 3:
            ordinal = 'rd';
            break;
    };
    document.getElementById('demerit-modal-label').innerText = `Demerit for ${bsPlayerName} on the ${bsHole}${ordinal} Hole`;
    demeritButton.setAttribute('data-player', bsPlayer);
    demeritButton.setAttribute('data-hole', bsHole);
};

document.getElementById('demerit-submit').addEventListener('click', () => {
    const demerits = document.getElementById('demerit-demerits');
    const rule = document.getElementById('demerit-rule');
    const titles = document.querySelectorAll('input[type="checkbox"][id^="demerit-"]');
    const comments = document.getElementById('demerit-comments');
    const button = document.getElementById('demerit-submit');
    button.setAttribute('data-demerits', demerits.value);
    button.setAttribute('data-rule', rule.value);
    button.setAttribute('data-comments', comments.value);
    // for (const title of titles) {
    //     button.setAttribute(``, )
    // };

});

document.getElementById('reset-submit').addEventListener('click', () => {
    function resetElement(id, callback) {
        const element = document.getElementById(id);
        element.querySelector('[selected]').removeAttribute('selected');
        element.firstElementChild.setAttribute('selected', true);
        callback.call(element);
        if (element.hasAttribute('required')) resetValidation.call(element);
    };
    window.localStorage.removeItem('round');
    resetElement('course-select', selectCourse);
    for (const player of ['marker', 'player-a', 'player-b', 'player-c']) {
        resetElement(`${player}|id`, selectPlayer);
    };
    for (const accordionItem of document.querySelectorAll('.accordion-item')) {
        const accordionButton = accordionItem.querySelector('button.accordion-button');
        accordionItem.querySelector('.accordion-collapse.collapse').classList.add('show');
        accordionButton.setAttribute('aria-expanded', 'true');
        accordionButton.classList.remove('collapsed');
        handleAccordionClick.call(accordionButton);
    };
    updateData();
});