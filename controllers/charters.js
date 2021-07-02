const Charter = require('../models/charter');
const Rule = require('../models/rule');
const User = require('../models/user');

// move constants to database
const titles = [{ id: 'ace', value: 'Ace', icon: 'bi-suit-spade-fill' }, { id: 'flag-bitch', value: 'flag bitch', icon: 'bi-flag-fill' }, { id: 'karen', value: 'Karen', icon: 'bi-cone-striped' }];
const actions = [{ method: 'award', title: 'Award', class: 'success', tooltip: 'top' }, { method: 'revoke', title: 'Revoke', class: 'danger', tooltip: 'bottom' }];

async function getLatestCharter() {
    const charter = await (await Charter.findOne().sort({ 'created.date': -1 }).populate('sections.rules'));
    return charter;
};

async function edit (req, res) {
    const charter = await getLatestCharter();
    res.render('charter/edit', { charter, actions, titles });
};

async function save (req, res) {
    const formKeys = Object.keys(req.body);
    const sectionKeys = [ ...new Set(formKeys.map(formKey => formKey.match(/s\d+|/)[0])) ];
    const sections = sectionKeys.map(sectionKey => {
        const description = formKeys.filter(formKey => {
            const regex = new RegExp(`${sectionKey}\\|d`);
            return regex.test(formKey);
        }).map(key => req.body[key]);
        const allRuleKeys = formKeys.filter(formKey => {
            const regex = new RegExp(`${sectionKey}\\|r`);
            return regex.test(formKey);
        });
        const ruleKeys = [ ...new Set(allRuleKeys.map(ruleKey => {
            const regex = new RegExp(`${sectionKey}\\|r\\d+`);
            return ruleKey.match(regex)[0];
        })) ];
        const rules = ruleKeys.map(ruleKey => {            

            function createBreakdownObject(key) {
                const allBreakdowns = formKeys.filter(formKey => {
                    const regex = new RegExp(`${key}\\|b`);
                    return regex.test(formKey);
                });
                const breakdown = [ ...new Set(allBreakdowns.map(breakdownKey => {
                    const regex = new RegExp(`${key}\\|b\\d+`);
                    return breakdownKey.match(regex)[0];
                })) ].map(b => {
                    const breakdownKey = b.replace(/\|/g, '\\|');
                    const breakdownObject = {
                        description: formKeys.filter(formKey => {
                            const regex = new RegExp(`${breakdownKey}\\|d`);
                            return regex.test(formKey);
                        }).map(key => req.body[key])
                    };
                    if (formKeys.some(formKey => {
                        const regex = new RegExp(`${breakdownKey}\\|b`);
                        return regex.test(formKey);
                    })) breakdownObject.breakdown = createBreakdownObject(breakdownKey);
                    return breakdownObject;
                });
                return breakdown;
            };
            
            const regexRuleKey = ruleKey.replace(/\|/g, '\\|');
            const description = formKeys.filter(formKey => {
                const regex = new RegExp(`${regexRuleKey}\\|d`);
                return regex.test(formKey);
            }).map(key => req.body[key]);
            const demerits = req.body[`${ruleKey}|v`];
            const titles = formKeys.filter(formKey => {
                const regex = new RegExp(`${regexRuleKey}\\|t`);
                return regex.test(formKey);
            }).map(key => {
                const titlesMap = {
                    a: 'award',
                    r: 'revoke',
                    'flag-bitch': 'flag bitch',
                    karen: 'Karen',
                    ace: 'Ace'
                };
                const method = titlesMap[key.match('t(a|r)-')[1]];
                const title = titlesMap[key.match('(?:ta|tr)-(.*)')[1]];
                return { method, title };
            });
            const action = { demerits };
            if (titles.length > 0) action.titles = titles;
            const ruleObject = {
                index: parseInt(ruleKey.match(/r(\d+)/)[1]) + 1,
                description,
                action
            }
            if (formKeys.some(formKey => {
                const regex = new RegExp(`${regexRuleKey}\\|b`);
                return regex.test(formKey);
            })) ruleObject.breakdown = createBreakdownObject(regexRuleKey);
            return ruleObject;
        });
        return {
            title: req.body[`${sectionKey}|t`],
            description,
            rules
        };
    });
    for (const section of sections) {
        if (section.rules && section.rules.length > 0) {
            section.rules = await Promise.all(section.rules.map(async rule => await new Rule(rule).save()));
        };
    };
    
    // set values for now
    const y = new Date().getFullYear();
    const startDate = new Date(y, 0, 1).setHours(0, 0, 0, 0);
    const endDate = new Date(y, 11, 31).setHours(23, 59, 59, 999);
    const charters = await Charter.find({ 'created.date': { $gte: startDate, $lte: endDate } });
    const created = {
        by: await User.findOne({ 'name.knownAs': 'Lee' }),
        version: `${y}.${charters.length}`
    };
    const status = 'Approved';

    await new Charter({ created, sections, status }).save();
    res.redirect('/charter');
};

async function show (req, res) {
    const charter = await getLatestCharter();
    res.render('charter/index', { charter, actions, titles });
};

module.exports = { edit, save, show };