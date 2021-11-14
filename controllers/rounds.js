const path = require('path');

const User = require('../models/user');
const Rule = require('../models/rule');
const Course = require('../models/course');
const Round = require('../models/round');

const { customDate } = require('../utilities/formatDate');

async function create (req, res) {
    const date = customDate('yyyy-mm-dd');
    const players = await User.find({ role: { $ne: 'super' }, status: 'active' });
    const rules = await Rule.find();
    const courses = await Course.find();
    res.render('rounds/new', { players, rules, courses, date });
};

function edit (req, res) {
    res.send(req.originalUrl)
};

async function remove (req, res) {
    res.send(req.originalUrl)
};

async function save (req, res) {
    const { body } = req;
    const created = { by: await User.findById(body.marker.id) };
    const round = {
        created,
        lastModified: created,
        date: body.round.date,
        course: await Course.findById(body.course.id),
        tee: body.course.tee,
        scores: []
    };
    for (const key of Object.keys(body)) {
        if (!/(?:marker|^player-)/.test(key)) continue;
        const team = body[key].team;
        const score = {
            player: await User.findById(body[key].id),
            shots: body[key].hole.map(Number),
            team
        };
        round.scores.push(score);
    }
    await new Round(round).save();
    return res.redirect('/rounds');
};

function serviceWorker (req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'scripts', 'rounds', 'service-worker.js'));
};

async function show (req, res) {
    const rounds = await Round.find().sort({ 'date': -1 }).populate('scores.player').populate('course');
    res.render('rounds/index', { rounds });
};

function submit (req, res) {
    res.send(req.originalUrl)
};

async function update (req, res) {
    console.log(JSON.parse(Object.keys(req.body)[0]).a)
    res.json({ success: true, message: req.params.id });
};

async function view (req, res) {
    const round = await Round.findById(req.params.id).populate('scores.player').populate('course');
    const players = await User.find({ role: { $ne: 'super' }, status: 'active' });
    res.render('rounds/edit', { round, staticPlayers: ['Marker', 'Player A', 'Player B', 'Player C'], players });
}; 

module.exports = { create, edit, remove, save, serviceWorker, show, submit, update, view };