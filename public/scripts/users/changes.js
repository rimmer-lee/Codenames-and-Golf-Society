function checkChange() {
    function checkElements (selector) {
        if (different) return
        for (const element of Array.from(document.querySelectorAll(selector))) {
            different = checkElementValue(element);
            if (different) return;
        };
    };
    function checkElementValue (element) {
        const uid = element.id.split('|')[0];
        const user = users.find(({ id }) => id === uid);
        const field = element.id.split('|')[1];            
        return (field === 'role' && element.value !== user.role) || (field === 'active' && (element.checked ? 'active' : 'inactive') !== user.status);
        // if (field === 'role' && element.value !== user.role) return true;
        // else if (field === 'active' && (element.checked ? 'active' : 'inactive') !== user.status) return true;
        // return false;
    };
    const buttonParent = document.getElementById('button-parent');
    let different = false;
    buttonParent.classList.add('d-none');
    checkElements('select');
    checkElements('input[type="checkbox"]');
    if (different) buttonParent.classList.remove('d-none');
};
for (const select of Array.from(document.querySelectorAll('select'))) select.addEventListener('change', checkChange);
for (const checkbox of Array.from(document.querySelectorAll('input[type="checkbox"]'))) checkbox.addEventListener('change', checkChange);
(function() {
    checkChange();
})();