// hard code 2021 as start year for now
const startOfTime = 2021;

function dates(year) {
    return {
        endDate: new Date(Date.UTC(year + 1, 2, 31)),
        startDate: new Date(Date.UTC(year, year === startOfTime ? 0 : 3, 1))
    };
};

function years() {
    const currentYear = new Date().getFullYear();
    const currentSeason = currentYear - +(new Date() < new Date(Date.UTC(currentYear, 2, 31)));
    return Array.from({ length: currentSeason - startOfTime + 1 }, (_, i) => currentSeason - i)
        .map(year => ({ year, current: year === currentSeason }));
};

module.exports = { dates, years };