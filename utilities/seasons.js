function seasonDates(year) {
    return {
        endDate: new Date(year + 1, 2, 31),
        startDate: new Date (year, year === 0 ? 0 : 3, 1)
    };
};

module.exports = { seasonDates };