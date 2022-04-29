const Charter = require('../models/charter');
const Rule = require('../models/rule');
const User = require('../models/user');

function create (req, res) {
    res.render('charter/new');
};

async function edit (req, res) {
    const charter = await Charter.findLatest();
    res.render('charter/edit', { charter });
};

async function save (req, res) {
    const created = { by: await User.findById(req.user._id) };

    // set value for now
    const status = 'Approved';

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
                const method = res.locals.actions.find(({ method }) => method[0] === key.match('t(a|r)-')[1]).method;
                const title = res.locals.titles.find(({ id }) => id === key.match('(?:ta|tr)-(.*)')[1]).value;
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
    await new Charter({ created, sections, status }).save();
    res.redirect('/charter');
};

async function show (req, res) {
    const charter = await Charter.findLatest();
    res.render('charter/index', { charter });
};

module.exports = { create, edit, save, show };