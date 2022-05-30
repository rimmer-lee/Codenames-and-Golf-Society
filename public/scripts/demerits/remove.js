function remove() {
    this.closest('section').remove();
};

for (const removeButton of document.querySelectorAll('[data-type="button"][data-operation="remove"]')) removeButton.addEventListener('click', remove);