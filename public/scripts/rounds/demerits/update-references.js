function updateReferences() {
    for (const demeritModal of document.querySelectorAll('.modal[id^="demerit|"]')) {
        const [ , player, hole ] = demeritModal.id.split('|');
        demeritModal.querySelectorAll('.col-11.border.border-1.rounded-3.mx-auto.p-3').forEach((demerit, index) => {
            for (const inputParent of demerit.querySelectorAll('.row.gy-3 > .col-12')) {
                const label = inputParent.querySelector('label');
                const input = inputParent.querySelector('[name]');
                if (!label && !input) continue;
                const nameValue = input.getAttribute('name').replace(/]/g, '').split('[')[5];
                const id = `demerit-${player}-${hole}-${nameValue}-${index + 1}`;
                label.setAttribute('for', id);
                input.setAttribute('id', id);
                input.setAttribute('name', `[${player}][demerit]['${hole}']['${index + 1}'][${nameValue}]`);
            };
        });
    };
    updateData();
};