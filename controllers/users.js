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
    if (!user) req.flash('error', 'Something went wrong');    
    else {
        if (user.name.middle) user.name.middle = user.name.middle.split(' ');
        await new User(user).save();
        req.flash('success', 'User saved');
    };
    res.redirect('/users');
};

async function show (req, res) {
    const users = await User.find().sort({ 'name.preferred': 1 });
    res.render('users/index', { users });
};

async function update (req, res) {
    const id = req.query.u;
    const { operation } = req.body.user;
    const user = await User.findById(id);
    if (!user) {
        req.flash('error', 'Something went wrong');
        return res.redirect('/users');
    };    
    if (/Restore/.test(operation)) await User.findByIdAndDelete(id);
    else if (/Remove/.test(operation)) {
        const { name, email, role } = req.body.user;
        if (name && name.middle) name.middle = name.middle.split(' ');
        user.name = name;
        user.email = email;
        user.role = role;
        await user.save();
    };
    req.flash('success', 'User updated');
    res.redirect('/users');
};

module.exports = { create, edit, save, show, update };