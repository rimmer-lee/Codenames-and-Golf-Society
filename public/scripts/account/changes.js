function checkChange() {
    function checkElements (selector) {
        if (different) return;
        for (const element of document.querySelectorAll(selector)) {
            different = checkElementValue(element);
            if (different) return;
        };
    };
    function checkElementValue (element) {
        function checkDifference(elementValue, userValue) {
            return elementValue !== (userValue ? userValue : '');
        };
        const id = element.id;
        switch (id) {
            case 'username':
                return checkDifference(element.value, user.username);
            case 'email':
                return checkDifference(element.value, user.email);
            case 'title':
                return checkDifference(element.value, user.name.title);
            case 'full-name':
                return checkDifference(element.value, user.name.full);
            case 'preferred-name':
                return checkDifference(element.value, user.name.preferred);
            case 'image':
                return checkDifference(element.value, user.image);
            case 'birthday':
                return checkDifference(formatDate(element.value), formatDate(user.birthday));
        };
        if (/gender/.test(id)) return checkDifference(element.value, user.gender);
        return false;
    };
    const undoButton = document.getElementById('undo');
    const saveButton = document.getElementById('save');
    let different = false;
    undoButton.classList.add('d-none');
    saveButton.classList.add('d-none');
    checkElements('input:not([type="button"]):not([type="submit"]):not([type="radio"]):not([id*="password"]):not([id="undo"])');
    checkElements('select');
    checkElements('input[type="radio"]:checked');
    // password
    if (different) {
        undoButton.classList.remove('d-none');
        saveButton.classList.remove('d-none');
    };
};

function formatDate(date) {
    const d = new Date(date);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
};

for (const input of document.querySelectorAll('input:not([type="submit"]):not([type="radio"]):not([id*="password"]):not([id="undo"])')) input.addEventListener('change', checkChange);
for (const select of document.querySelectorAll('select')) select.addEventListener('change', checkChange);
for (const radio of document.querySelectorAll('input[type="radio"]')) radio.addEventListener('change', checkChange);

document.getElementById('undo').addEventListener('click', () => {
    document.getElementById('undo').classList.add('d-none');
    document.getElementById('save').classList.add('d-none');
    for (const input of document.querySelectorAll('input:not([type="submit"]):not([type="radio"]):not([id*="password"]):not([id="undo"])')) {
        switch (input.id) {
            case 'username':
                input.value = user.username;
                break;
            case 'email':
                input.value = user.email;
                break;
            case 'title':
                input.value = user.name.title;
                break;
            case 'full-name':
                input.value = user.name.full;
                break;
            case 'preferred-name':
                input.value = user.name.preferred;
                break;
            case 'image':
                input.value = user.image ? user.image : '';
                break;
            case 'birthday':
                input.value = formatDate(user.birthday);
                break;
        };
    };
    for (const select of document.querySelectorAll('select')) select.value = user.name.title ? user.name.title : '';
    for (const radio of document.querySelectorAll('input[type="radio"]')) {
        if (radio.value === user.gender) {
            radio.checked = true;
            break;
        };
    };
    // for (const password of document.querySelectorAll('[id*="password"]')) password.value = '';
});

checkChange();