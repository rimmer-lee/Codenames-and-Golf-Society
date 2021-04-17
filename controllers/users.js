const User = require('../models/user');

function create (req, res) {
    res.render('users/new')
};

async function edit (req, res) {
    const user = await User.findById(req.params.id);
    const founder = user.role === 'founder';
    res.render('users/edit', { founder, user });
};

async function save (req, res) {
    const { user } = req.body;
    if (user.name.middle) user.name.middle = user.name.middle.split(' ');
    await new User(user).save();
    res.redirect('/users');
};

async function show (req, res) {
    const users = await User.find().sort({ 'name.friendly': 1 });
    res.render('users/index', { users });
};

async function update (req, res) {
    const id = req.query.u;
    const { operation } = req.body.user;
    const user = await User.findById(id);

    // or should we delete users from the database?
    if (/Restore/.test(operation)) user.status = 'inactive';

    else if (/Remove/.test(operation)) {
        const { name, email, role } = req.body.user;
        if (name && name.middle) name.middle = name.middle.split(' ');
        user.name = name;
        user.email = email;
        console.log(req.body.user)
        user.role = role;
    } else return res.redirect('/users');
    await user.save();
    res.redirect('/users');
};

module.exports = { create, edit, save, show, update };