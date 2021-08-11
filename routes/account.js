const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Demerit = require('../models/demerit');
const Title = require('../models/title');

const createUserObject = require('../utilities/createUserObject');
const formatDate = require('../utilities/formatDate');

// get ID from session cookie
// res.locals.currentUser

router.get('/:id', async (req, res) => {    

    const { id, name, email, birthday, gender, image } = await User.findById(req.params.id);
    const demerits = await Demerit.find({ player: id }).populate('rule').populate('action.titles');
    const allTitles = await Title.find().sort({ 'when.date': -1, 'when.hole': -1, 'when.created': -1 });
    const titles = res.locals.titles.map(({ value }) => value);
    const user = {
        name: name.friendly,
        email,
        birthday: formatDate('yyyy-mm-dd', birthday),
        gender,
        image: image ? image : '',
        demerits: demerits.map(({ when, action, rule }) => {
            return {
                date: when.formattedDate.friendly,
                hole: when.hole,
                action: {
                    demerits: action.demerits,
                    titles: action.titles.map(({ method, name }) => {
                        return { method, name };
                    })
                },
                rule: {
                    description: rule.description,
                    index: rule.index,
                    breakdown: rule.breakdown
                }
            };
        }),
        titles: []
    };
    for (const title of titles) {
        const filterTitles = allTitles.filter(({ name }) => name === title);
        if (!filterTitles) continue;
        for (const [index, filterTitle] of filterTitles.entries()) {
            if (filterTitle.method === 'award') {
                if (!filterTitles.slice(0, index).filter(({ player }) => String(player) === String(filterTitle.player)).find(({ method }) => method === 'revoke')) {
                    if (id === String(filterTitle.player)) user.titles.push(filterTitle);
                };
                break;
            };
        };
    };
    user.titles = user.titles.map(({ when, method, name }) => ({ date: when.formattedDate.friendly, method, name }));
    
    return res.send(user)
    
    res.render('account/index', { user });
});

router.get('/:id/edit', async (req, res) => {

    const date = formatDate('yyyy-mm-dd');

    const { id, name, email, birthday, gender, image } = await User.findById(req.params.id);

    const user = {
        id,
        name,
        email,
        birthday: formatDate('yyyy-mm-dd', birthday),
        gender,
        image: image ? image : ''
    };

    res.render('account/edit', { date, user });
});

router.put('/:id', async (req, res) => {
    const { user } = req.body;
    if (!user) {
        req.flash('error', 'Something went wrong');
        return res.redirect('/');
        // return res.redirect(`/account/${id}`);
    };
    const id = Object.keys(user)[0];
    const U = await User.findById(id);
    await U.save(createUserObject(user[id]));
    req.flash('success', 'Account updated');
    res.redirect(`/account/${id}`);
});

router.delete('/:id', (req, res) => {
    return res.send(req.body)
});

module.exports = router;