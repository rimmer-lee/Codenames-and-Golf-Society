module.exports = (format, date = new Date()) => {
    const delimiter = format.match(/\W/);
    const numberOfDays = format.split(delimiter).find(value => /d/.test(value)).length;
    const numberOfMonths = format.split(delimiter).find(value => /m/.test(value)).length;
    const numberOfYears = format.split(delimiter).find(value => /y/.test(value)).length;
    const days = String(date.getDate()).padStart(numberOfDays, '0');
    const months = String(date.getMonth() + 1).padStart(numberOfMonths, '0');
    const years = String(date.getFullYear()).substring(4 - numberOfYears);
    return format.replace(/d{1,2}/, days).replace(/m{1,2}/, months).replace(/y{2,4}/, years);
};