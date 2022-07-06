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

String.prototype.capitalize = function() {
    return this[0].toUpperCase() + this.substring(1);
};

String.prototype.replaceLastInstance = function(delimiter = ', ', replacementValue = ' and ') {
    const lastInstance = this.lastIndexOf(delimiter);
    if (lastInstance === -1) return this;
    return `${this.substring(0, lastInstance)}${replacementValue}${this.substring(lastInstance + delimiter.length)}`;
};