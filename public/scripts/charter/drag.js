const draggables = Array.from(document.querySelectorAll('[draggable]'));
const containers = draggables.map(draggable => draggable.closest('.row'));
for (const draggable of draggables) {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
        draggable.parentElement.classList.add('empty');
    });
    // draggable.addEventListener('dragend', () => {
    //     draggable.classList.remove('dragging');
    //     draggable.parentElement.classList.remove('empty');
        
        // const existingParent = document.querySelector('.dragover');
        // const existingElement = existingParent.querySelector('textarea');
        // const existingEnd = existingParent.children[2];
        // const previousParent = document.querySelector('.empty');
        // const previousEnd = previousParent.children[2];
        // existingParent.insertBefore(draggable, existingEnd);
        // previousParent.insertBefore(existingElement, previousEnd);
        // existingParent.classList.remove('dragover');
        // previousParent.classList.remove('empty');

    // });
    draggable.addEventListener('dragend', () => {
        const container = document.querySelector('.dragover');
        const existingElement = container.querySelector('textarea');
        const existingParent = existingElement.parentElement;
        const existingEnd = existingParent.children[2];
        console.log(existingEnd)
        const previousParent = document.querySelector('.empty');
        const previousEnd = previousParent.children[2];
        
        existingParent.insertBefore(draggable, existingEnd);
        previousParent.insertBefore(existingElement, previousEnd);
        draggable.classList.remove('dragging');
        draggable.parentElement.classList.remove('empty');
        container.classList.remove('dragover');
    });
};
for (const container of containers) {
    container.addEventListener('dragover', e => {
        e.preventDefault();

        container.classList.add('dragover');
        
        // const afterElement = getDragAfterElement(container, e.clientY);

    });
};
function getDragAfterElement(container, y) {
    const draggableElements = Array.from(container.querySelectorAll('[draggable]:not(.dragging)'));
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) return { offset, element: child };
        else return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
};