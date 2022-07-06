String.prototype.capitalize = function() {
    return this[0].toUpperCase() + this.substring(1);
};

String.prototype.replaceLastInstance = function(delimiter = ', ', replacementValue = ' and ') {
    const lastInstance = this.lastIndexOf(delimiter);
    if (lastInstance === -1) return this;
    return `${this.substring(0, lastInstance)}${replacementValue}${this.substring(lastInstance + delimiter.length)}`;
};