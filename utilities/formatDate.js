// update the Date prototype

function customDate(format, date = new Date()) {
    const delimiter = format.match(/\W/);
    const delimiterArray = format.split(delimiter);
    const numberOfDays = delimiterArray.find(value => /d/.test(value)).length;
    const numberOfMonths = delimiterArray.find(value => /m/.test(value)).length;
    const numberOfYears = delimiterArray.find(value => /y/.test(value)).length;
    const days = String(date.getDate()).padStart(numberOfDays, '0');
    const months = String(date.getMonth() + 1).padStart(numberOfMonths, '0');
    const years = String(date.getFullYear()).substring(4 - numberOfYears);
    return format.replace(/d{1,2}/, days).replace(/m{1,2}/, months).replace(/y{2,4}/, years);
};

function fullDate(date = new Date()) {
    const d = new Date(date);
    const weekday = d.toLocaleDateString('en-GB', { weekday: 'long' });
    const day = d.toLocaleDateString('en-GB', { day: 'numeric' });
    const month = d.toLocaleDateString('en-GB', { month: 'long' });
    const year = d.toLocaleDateString('en-GB', { year: '2-digit' });
    const ordinal = (function(day){
        if (day === '11' || day === '12' || day === '13') return 'th';
        switch (day % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th'
        };
    })(day);
    return `${weekday}, ${day}${ordinal} ${month} '${year}`;
};

function time(date = new Date()) {
    return date.toLocaleTimeString([], {
        timeZone: 'UTC',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
    }).toLowerCase();
};

module.exports = { customDate, fullDate, time };