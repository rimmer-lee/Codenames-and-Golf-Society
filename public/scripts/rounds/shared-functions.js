// shared with utilities/prototype.js
Array.prototype.sortAlphabetically = function(property = '') {
    function getProperty(property) {
        let object = this;
        for (const p of property.split('.')) object = object[p];
        return object;
    };
    return this.sort((a, b) => {
        const upperA = getProperty.call(a, property).toUpperCase();
        const upperB = getProperty.call(b, property).toUpperCase();
        if (upperA < upperB) return -1;
        if (upperA > upperB) return 1;
        return 0;
    })
};

// shared with utilities/prototype.js
Date.prototype.full = function() {
    const weekday = this.toLocaleDateString('en-GB', { weekday: 'long' });
    const day = this.toLocaleDateString('en-GB', { day: 'numeric' });
    const month = this.toLocaleDateString('en-GB', { month: 'long' });
    const year = this.toLocaleDateString('en-GB', { year: '2-digit' });
    const ordinal = (function(){
        if (day === '11' || day === '12' || day === '13') return 'th';
        switch (day % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th'
        };
    })();
    return `${weekday}, ${day}${ordinal} ${month} '${year}`;
};

// shared with utilities/prototype.js
String.prototype.capitalize = function() {
    return this[0].toUpperCase() + this.substring(1);
};

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

// shared with controllers/rounds.js
// now refactored in utilities/prototype.js
function letterFromNumber(number) {
    return String.fromCharCode(97 + number);
};

// change name to showgGrandparentElement() as default is to show element
function toggleGrandparentVisibility(element, show = true) {
    const grandparent = element.parentElement.parentElement;
    return toggleVisibility(grandparent, show);
};

// change name to showElement() as default is to show element
function toggleVisibility(element, show = true) {
    element.classList.toggle('d-none', !show);
    if (show) return element.removeAttribute('visibility');
    return element.setAttribute('visibility', 'hidden');
};

function closestColumn(element) {
    return element.closest('[class*="col"]');
};

function removeChildren(element, index = 0) {
    while (element.children.length > index) element.children[index].remove();
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