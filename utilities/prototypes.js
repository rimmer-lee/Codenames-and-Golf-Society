// move to a shared utility file
// use in controllers/players.js
function getProperty(path) {
    let o = this;
    for (const p of path.split('.')) o = o[p];
    return o;
};

Array.prototype.sortAlphabetically = function(path = '') {
    return this.sort((a, b) => {
        const upperA = getProperty.call(a, path).toUpperCase();
        const upperB = getProperty.call(b, path).toUpperCase();
        if (upperA < upperB) return -1;
        if (upperA > upperB) return 1;
        return 0;
    })
};

Array.prototype.sortBy = function(ascending = true, path = '') {
    return this.sort((a, b) => {
        const aValue = getProperty.call(a, path);
        const bValue = getProperty.call(b, path);
        return ascending ? aValue - bValue : bValue - aValue;
    })
};

String.prototype.capitalize = function() {
    return this[0].toUpperCase() + this.substring(1);
};

String.prototype.replaceLastInstance = function(delimiter = ', ', replacementValue = ' and ') {
    const lastInstance = this.lastIndexOf(delimiter);
    if (lastInstance === -1) return this;
    return `${this.substring(0, lastInstance)}${replacementValue}${this.substring(lastInstance + delimiter.length)}`;
};