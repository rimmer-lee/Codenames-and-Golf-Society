// move to a shared utility file
// use in controllers/players.js
function getProperty(path) {
    if (!path) return this;
    let o = this;
    for (const p of path.split('.')) o = o[p];
    return o;
};

Array.prototype.sortAlphabetically = function(path = false) {
    return this.sort((a, b) => {
        const upperA = getProperty.call(a, path).toUpperCase();
        const upperB = getProperty.call(b, path).toUpperCase();
        if (upperA < upperB) return -1;
        if (upperA > upperB) return 1;
        return 0;
    });
};

Array.prototype.sortBy = function(ascending = true, path = '') {
    return this.sort((a, b) => {
        const aValue = getProperty.call(a, path);
        const bValue = getProperty.call(b, path);
        return ascending ? aValue - bValue : bValue - aValue;
    });
};

Date.prototype.custom = function(format) {
    const delimiter = format.match(/\W/);
    const delimiterArray = format.split(delimiter);
    const numberOfDays = delimiterArray.find(value => /d/.test(value)).length;
    const numberOfMonths = delimiterArray.find(value => /m/.test(value)).length;
    const numberOfYears = delimiterArray.find(value => /y/.test(value)).length;
    const days = String(this.getDate()).padStart(numberOfDays, '0');
    const months = String(this.getMonth() + 1).padStart(numberOfMonths, '0');
    const years = String(this.getFullYear()).substring(4 - numberOfYears);
    return format.replace(/d{1,2}/, days).replace(/m{1,2}/, months).replace(/y{2,4}/, years);
};

Date.prototype.full = function() {
    const weekday = this.toLocaleDateString('en-GB', { weekday: 'long' });
    const day = this.toLocaleDateString('en-GB', { day: 'numeric' });
    const month = this.toLocaleDateString('en-GB', { month: 'long' });
    const year = this.toLocaleDateString('en-GB', { year: '2-digit' });
    const ordinal = (function(day){
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
    })(day);
    return `${weekday}, ${day}${ordinal} ${month} '${year}`;
};

Date.prototype.time = function() {
    return this.toLocaleTimeString([], {
        timeZone: 'UTC',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
    }).toLowerCase();
};

Date.prototype.weekday = function() {
    return this.toLocaleDateString('en-GB', { weekday: 'long' });
};

Number.prototype.toLetter = function() {
    return String.fromCharCode(97 + this);
};

String.prototype.capitalize = function() {
    return this[0].toUpperCase() + this.substring(1);
};

String.prototype.replaceLastInstance = function(delimiter = ', ', replacementValue = ' and ') {
    const lastInstance = this.lastIndexOf(delimiter);
    if (lastInstance === -1) return this;
    return `${this.substring(0, lastInstance)}${replacementValue}${this.substring(lastInstance + delimiter.length)}`;
};

String.prototype.replaceWhiteSpace = function(replacementValue = '') {
    return this.replace(/\s/g, replacementValue);
};