function customDate(format, date = new Date()) {
    const delimiter = format.match(/\W/);
    const delimiterArray = format.split(delimiter);
    const numberOfDays = delimiterArray.find(value => /d/.test(value)).length;
    const numberOfMonths = delimiterArray.find(value => /m/.test(value)).length;
    const numberOfYears = delimiterArray.find(value => /y/.test(value)).length;
    const days = String(date.getUTCDate()).padStart(numberOfDays, '0');
    const months = String(date.getUTCMonth() + 1).padStart(numberOfMonths, '0');
    const years = String(date.getUTCFullYear()).substring(4 - numberOfYears);
    return format.replace(/d{1,2}/, days).replace(/m{1,2}/, months).replace(/y{2,4}/, years);
};

function fullDate(date = new Date()) {
    const d = new Date(date);
    const weekday = d.toLocaleDateString('en-GB', { weekday: 'long' });
    const day = d.toLocaleDateString('en-GB', { day: 'numeric' });
    const month = d.toLocaleDateString('en-GB', { month: 'long' });
    const year = d.toLocaleDateString('en-GB', { year: '2-digit' });
    let ordinal = 'th';
    switch (day % 10) {
        case 1:
            ordinal = 'st';
            break;
        case 2:
            ordinal = 'nd';
            break;
        case 3:
            ordinal = 'rd';
            break;
    };
    return `${weekday}, ${day}${ordinal} ${month} '${year}`;
};

function time(date = new Date()) {
    return date.toLocaleTimeString([], {
        timeZone: 'UTC',
        hour12: true,
        hour: 'numeric',
        minute: '2-digit'
    }).toLowerCase();
};

module.exports = { customDate, fullDate, time };