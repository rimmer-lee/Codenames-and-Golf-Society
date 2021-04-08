function toggle(text) {
    for (const element of document.querySelectorAll('[data-type="button"]')) {
        element.addEventListener('click', (e) => {
            const t = e.target;
            const parent = t.closest('[class*="border"]');
            parent.classList.toggle('border-danger');
            parent.classList.toggle('bg-danger');
            parent.classList.toggle('text-white');
            t.classList.toggle('btn-danger')
            t.classList.toggle('btn-secondary')
            if (t.dataset.status === 'remove') {
                t.setAttribute('data-status', 'restore');
                t.setAttribute('value', `Restore ${text}`);
            } else if (t.dataset.status === 'restore') {
                t.setAttribute('data-status', 'remove');
                t.setAttribute('value', `Remove ${text}`);
            };
        });
    };
}