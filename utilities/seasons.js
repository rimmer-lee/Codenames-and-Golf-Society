function dates(year) {
    return {
        endDate: new Date(year + 1, 2, 31),
        startDate: new Date (year, year === 0 ? 0 : 3, 1)
    };
};

function years() {
    const currentYear = new Date().getFullYear();
    const startYear = 2021;
    return Array.from({ length: currentYear - startYear + 1 }, (v, i) => currentYear - i)
        .map(year => ({ year, current: year === currentYear }));
};

module.exports = { dates, years };