function appendOption(text, parentElement, attributes = []) {
    parentElement.appendChild(createOption(text, attributes));
    return true;
};

function createOption(innerText, attributes = []) {
    return createElement({
        type: 'option',
        attributes,
        innerText
    });
};

function letterFromNumber(number) {
    return String.fromCharCode(97 + number);
};

function toggleGrandparentVisibility(element, show = true) {
    const grandparent = element.parentElement.parentElement;
    return toggleVisibility(grandparent, show);
};

function toggleVisibility(element, show = true) {
    element.classList.toggle('d-none', !show);
    if (show) return element.removeAttribute('visibility');
    return element.setAttribute('visibility', 'hidden');
};

// function updateAttributes(attributes, oldValue, newValue) {
//     for (const attribute of attributes) {
//         for (const element of document.querySelectorAll(`[${attribute}*="${oldValue}"]`)) {
//             let value = '';
//             if (element[attribute]) {
//                 value = element[attribute].replaceAll(oldValue, newValue);
//                 element[attribute] = value;
//             } else {
//                 value = element.attributes[attribute].value.replaceAll(oldValue, newValue);
//                 element.attributes[attribute].value = value;
//             };
//             if (element.innerText.toLowerCase() === oldValue.replace('-', ' ')) element.innerText = newValue.replace('-', ' ');
//             if (element.innerText.toLowerCase() !== `game ${oldValue}`) element.innerText = `Game ${newValue}`
//         };
//     };
// };