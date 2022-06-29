const { TEE_COLOURS } = require('../constants');

function courseNames(gender, name, tees) {
    const multiple = gender && tees.filter(tee => tee.name === name).length > 1;
    return {
        long: `${name}${multiple ? ` (${gender.capitalize()})` : ''}`,
        short: `${name.split((function(value) {
            if (/\s/.test(value)) return ' ';
            if (/\//.test(value)) return '/';
            return;
        })(name)).map(value => {
            if (!/\D/.test(value)) return value;
            for (const v of value) {
                if (/\w/.test(v)) return v.toUpperCase();
            };
        }).join('')}${multiple ? ` (${gender[0].toUpperCase()})` : ''}`,
        value: `${name.toLowerCase()}${multiple ? `-${gender.toLowerCase()}` : ''}`
    };
};

function findTeeColour(tee) {
    const byTeeColour = TEE_COLOURS.find(({ colour }) => colour.toLowerCase() === (tee.colour && tee.colour.colour || tee.colour || '').toLowerCase());
    if (byTeeColour) return byTeeColour;
    const byTeeName = TEE_COLOURS.find(({ colour }) => colour.toLowerCase() === tee.name.split(' ')[0].toLowerCase());
    if (byTeeName) return byTeeName;
    return TEE_COLOURS.find(({ colour }) => colour === 'white');
};

module.exports = { courseNames, findTeeColour };