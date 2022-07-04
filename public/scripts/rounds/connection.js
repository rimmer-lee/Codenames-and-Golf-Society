function toggleButtons() {
    const online = window.navigator.onLine;
    const courseSelect = document.getElementById('course-select');
    const newCourseOption = courseSelect.querySelector('[value="new"]');
    for (const button of document.querySelectorAll('#button-parent .btn')) {
        if (online) {
            button.classList.remove('disabled');
            continue;
        };
        button.classList.add('disabled');
    };
    if (online && !newCourseOption) courseSelect.insertBefore(createElement({
            type: 'option',
            attributes: [{ id: 'value', value: 'new' }],
            innerText: 'New Course'
        }), null);
    if (!online) {
        const courseSearchModal = bootstrap.Modal.getInstance(document.getElementById('course-search-modal'));
        courseSelect.querySelector('[selected]').removeAttribute('selected');
        courseSelect[0].setAttribute('selected', true);
        courseSelect.classList.add('is-invalid');
        if (newCourseOption) newCourseOption.remove();
        if ((courseSearchModal || {})._isShown) courseSearchModal.hide();
    };
};

function toggleElement (element, show = true) {
    if (!element) return;
    if (show) {
        element.classList.remove('d-none');
        element.removeAttribute('visibility');
        return;
    };
    element.classList.add('d-none');
    element.setAttribute('visibility', 'hidden');
};

window.addEventListener('online', toggleButtons);
window.addEventListener('offline', toggleButtons);

toggleButtons();