module.exports = (array, path = '') => {
    return array.sort((a, b) => {
        let aValue = a;
        let bValue = b;
        for (const property of path.split('.')) {
            aValue = aValue[property] || aValue;
            bValue = bValue[property] || bValue;
        };
        const upperA = aValue.toUpperCase();
        const upperB = bValue.toUpperCase();
        if (upperA < upperB) return -1;
        if (upperA > upperB) return 1;
        return 0;
    })
};