const User = require('../models/user');

const createUserObject = require('../utilities/createUserObject');

async function login (req, res) {
    if (req.user.role !== 'super' && req.body.username === req.body.password) {
        req.flash('info', 'Please update your password');
        return res.redirect('/account/change-password');
    };
    req.flash('success', `Welcome ${req.user.name.knownAs}`);
    res.redirect('/account');
};

function logout (req, res) {
    req.logout();
    res.redirect('/');
};

async function register (req, res) {
    try {
        const user = await new User(createUserObject(req.body));
        const newUser = await User.register(user, req.body.password);
        req.session.user.id = newUser._id;
        req.flash('success', `Welcome ${user.preferred}`);
        res.redirect(`/account/${newUser._id}`);
    } catch (e) {
        req.flash('e', e.message);
        res.redirect('/register');
    };
};

async function reset (req, res) {
    // can we trigger a flash message
    if (!req.user || req.user.role !== 'super') return res.json({ success: false, message: 'You don\'t have the necessary permissions to reset passwords' });
    const user = await User.findById(req.body.id);
    if (user) {
        await user.setPassword(user.username);
        await user.save();
        return res.json({ success: true, message: 'Successfully reset password' });
    };
    res.json({ success: false, message: 'Unable to reset password' });
};

function showRegistration (req, res) {
    const formatDate = require('../utilities/formatDate');
    const date = formatDate('yyyy-mm-dd');
    res.render('account/register', { date });
};

async function showUsers (req, res) {
    const U = await User.find().sort({ 'name.preferred': 1 });
    const users = U.map(({ username, role, status, email, id }) => ({ username, role, status, email, id }));
    res.render('users/index', { users });
};

async function updateUsers (req, res) {
    const users = req.body.users;
    if (!users) {
        req.flash('error', 'Something went wrong');
        return res.redirect('/users');
    };    
    for (const id of Object.keys(users)) {
        const user = await User.findById(id);
        const status = users[id].status;
        if (status === 'super' || status === 'founder') continue;
        user.role = users[id].role;
        if (status && status === 'on') user.status = 'active';
        else user.status = 'inactive';
        await user.save();
    };
    req.flash('success', 'Users updated');
    res.redirect('/users');
};

module.exports = { login, logout, register, reset, showRegistration, showUsers, updateUsers };