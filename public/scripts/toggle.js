function toggle() {
    for (const element of document.querySelectorAll('[data-type="button"]')) {
        element.addEventListener('click', (e) => {
            const t = e.target;
            const parent = t.closest('[class~="border"]');
            const value = t.getAttribute('value');
            parent.classList.toggle('border-danger');
            parent.classList.toggle('bg-danger');
            parent.classList.toggle('text-white');
            t.classList.toggle('btn-danger')
            t.classList.toggle('btn-dark')
            if (t.dataset.operation === 'remove') {
                t.setAttribute('data-operation', 'restore');
                t.setAttribute('value', value.replace('Remove', 'Restore'));
            } else if (t.dataset.operation === 'restore') {
                t.setAttribute('data-operation', 'remove');
                t.setAttribute('value', value.replace('Restore', 'Remove'));
            };
        });
    };
}