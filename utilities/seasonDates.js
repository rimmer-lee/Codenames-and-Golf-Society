module.exports = (year) => {
    const startMonth = (function() {
        if (year === 2021) return 0;
        return 3;
    })();
    return {
        endDate: new Date(year + 1, 2, 31),
        startDate: new Date (year, startMonth, 1)
    };
};