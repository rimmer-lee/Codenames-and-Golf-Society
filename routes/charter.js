const express = require('express');
const router = express.Router();

const Charter = require('../models/charter');

router.get('/', async (req, res) => {
    const charter = await Charter.findOne().sort({ 'lastModified.date': -1 }).populate('sections.rules');
    const { sections } = charter;
    res.render('charter/index', { sections });
});

router.get('/edit', async (req, res) => {
    const charter = await Charter.findOne().sort({ 'lastModified.date': -1 }).populate('sections.rules');
    const { lastModified, sections } = charter;    
    res.render('charter/edit', { lastModified, sections });
});

router.post('/', async (req, res) => {
    // const formKeys = Object.keys(req.body);
    // const sectionKeys = [ ...new Set(formKeys.map(value => value.match(/s\d+|/)[0])) ];
    // const sections = sectionKeys.map(value => {
    //     const description = formKeys.filter(key => {
    //         const regex = new RegExp(`${value}\\|d`);
    //         return regex.test(key)
    //     }).map(key => req.body[key]);
    //     const sections = formKeys.filter(key => {
    //         const regex = new RegExp(`${value}\\|s`);
    //         return regex.test(key)
    //     }).map(key => {
    //         return { description: [req.body[key]] }
    //     });
    //     return {
    //         title: req.body[`${value}|t`],
    //         description,
    //         sections
    //     }
    // });
    // await new Charter({ sections }).save();
    // res.redirect('/charter');
    
    res.send(req.body)

});

module.exports = router;