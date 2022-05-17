const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Charter = require('./charter');

const { TITLES, ACTIONS } = require('../constants');
const seasonDates = require('../utilities/seasonDates');

const BreakdownSchema = new Schema({
    description: [ String ],
    breakdown: [ this ]
});

const RuleSchema = new Schema({
    index: Number,
    description: [ String ],
    action: {
        demerits: Number,
        titles: [
            {
                method: {
                    type: String,
                    enum: ACTIONS.map(({ method }) => method)
                },
                title: {
                    type: String,
                    enum: TITLES.map(({ value }) => value)
                }
            }
        ]
    },
    breakdown: [ BreakdownSchema ]
});

RuleSchema.statics.getAll = async function() {
    const charters = await Charter.find().sort({ 'version': -1 }).populate('sections.rules');
    const rules = [];
    for (const charter of charters) {
        const { sections, version } = charter;
        const year = +version.split('.')[0];
        const versionYear = new RegExp(year);
        if (rules.some(({ version }) => versionYear.test(version))) continue;
        const { endDate: end, startDate: start } = seasonDates(year);
        rules.push({
            date: { end, start },

            // duplicated in getLatest static
            rules: sections.find(({ rules }) => rules && rules.length > 0).rules.map(rule => {
                rule.description = rule.description.map(description => encodeURI(description.replace(/'/g, '`')));
                return rule;
            }),

            version
        });
    };
    return rules;
};

RuleSchema.statics.getLatest = async function() {
    const charter = await Charter.findLatest();

    // duplicated in getAll static
    return charter.sections.find(({ rules }) => rules.length > 0).rules.map(rule => {
        rule.description = rule.description.map(description => encodeURI(description.replace(/'/g, '`')));
        return rule;
    });

};

module.exports = mongoose.model('Rule', RuleSchema);