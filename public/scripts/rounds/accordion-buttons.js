// style accordion buttons

for (const button of document.querySelectorAll('.accordion-item > h2.accordion-header > button')) {
    button.addEventListener('click', function() {
        if (this.ariaExpanded === 'true') {
            this.innerText = this.id.split('-')[0].charAt(0).toUpperCase() + this.id.split('-')[0].slice(1);
        } else {
            function htmlWrapper(html) {
                return `<div class="d-flex flex-grow-1 justify-content-center fw-bold">${html}</div>`;
            }
            switch (this.id) {
                case 'round-button':
                    const dateElement = document.getElementById('date');
                    if (!dateElement) return;
                    const newDate = new Date(dateElement.value);
                    const weekday = newDate.toLocaleDateString('en-GB', { weekday: 'long' });
                    const day = newDate.toLocaleDateString('en-GB', { day: 'numeric' });
                    const month = newDate.toLocaleDateString('en-GB', { month: 'long' });
                    const year = newDate.toLocaleDateString('en-GB', { year: '2-digit' });
                    let ordinal = 'th';
                    switch (day % 10) {
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
                    this.innerHTML = htmlWrapper(`${weekday}, ${day}${ordinal} ${month} '${year}`);
                    break;
                case 'course-button':
                    const courseSelect = document.getElementById('course-select');
                    const teeSelect = document.getElementById('tee-select');
                    const courseValue = courseSelect.selectedOptions[0].innerText;
                    const teeValue = teeSelect.selectedOptions[0].innerText;
                    if (!/^Select/i.test(courseValue)) {
                        const courseHTML = `<div class="pe-2">${courseValue}</div><div><span> (${teeValue})</span></div>`
                        this.innerHTML = htmlWrapper(courseHTML);
                    };
                    break;
                case 'players-button':
                    let playersHTML = '';
                    for (const select of this.closest('.accordion-item').querySelectorAll('select')) {
                        const selectValue = select[select.selectedIndex].text;
                        if (!/^Select/i.test(selectValue)) {
                            const teamParent = select.closest('.row').querySelector('.team');
                            let playerHTML = `<div class="pe-2">${selectValue}</div>`;
                            if (teamParent && !teamParent.classList.contains('d-none')) {
                                const teams = teamParent.querySelectorAll('input[type="radio"]');
                                const checked = teams.find(({ checked }) => checked).value;
                                const team = checked.split('-')[checked.split('-').length - 1];
                                if (team && team !== 'none') playerHTML += `<div><span> (${team.toUpperCase()})</span></div>`;
                            };
                            playersHTML += htmlWrapper(playerHTML);
                        };
                    };
                    if (playersHTML) this.innerHTML = playersHTML;
                    break;
                case 'scorecard-button':
                    const summaryScore = document.getElementById('summary-score');
                    if (summaryScore.closest('.col-12').classList.contains('d-none')) break;
                    let scorecardHTML = '';
                    for (const playerScoreChild of summaryScore.children) {
                        const score = playerScoreChild.querySelector('[id$="|score"]').innerText;
                        const par = playerScoreChild.querySelector('[id$="|par"]').innerText;
                        let parClass = 'f-level';
                        if (par > 0) parClass = 'f-over';
                        else if (par < 0) parClass = 'f-under';
                        scorecardHTML += htmlWrapper(`<div>${score} (<span class="${parClass}">${par}</span>)</div>`);
                    };
                    this.innerHTML = scorecardHTML;
                    break;
                default:
                    break;
            };
        };
    });
};