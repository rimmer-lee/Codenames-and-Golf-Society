const User = require('../models/user');

async function login (req, res) {
    if (req.user.role !== 'super' && req.body.username === req.body.password) {
        req.flash('info', 'Please update your password');
        return res.redirect('/account/change-password');
    };
    req.flash('success', `Welcome ${req.user.name.knownAs}`);
    res.redirect('/account');
};

function logout (req, res) {
    try {
        req.logout();
        req.flash('success', 'Successfully logged out');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Something went wrong');
    };
    return res.redirect('/');
};

async function register (req, res) {
    try {
        const user = await new User(req.body);
        const newUser = await User.register(user, req.body.password);
        req.session.user.id = newUser._id;
        req.flash('success', `Welcome ${user.preferred}`);
        res.redirect(`/account/${newUser._id}`);
    } catch (error) {
        console.error(error)
        req.flash('error', 'Something went wrong');
        res.redirect('/register');
    };
};

async function reset (req, res) {
    try {
        const user = await User.findById(req.body.id);
        if (user) {
            await user.setPassword(user.username);
            await user.save();
            return res.json({ success: true, message: 'Successfully reset password' });
        };
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: 'Unable to reset password' });
    };
};

function showRegistration (req, res) {
    const { customDate } = require('../utilities/formatDate');
    const date = customDate('yyyy-mm-dd');
    res.render('account/register', { date });
};

async function showUsers (req, res) {
    try {
        const allUsers = await User.find().sort({ 'username': 1 });
        const users = allUsers.map(({ username, role, status, email, id }) => ({ username, role, status, email, id }));
        return res.render('users/index', { users });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Something went wrong');
        return res.redirect('/');
    };
};

async function updateUsers (req, res) {
    try {
        for (const id of Object.keys(req.body.users)) {
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
    } catch (error) {
        console.error(error);
        req.flash('error', 'Something went wrong');
        return res.redirect('/users');
    };
};

module.exports = { login, logout, register, reset, showRegistration, showUsers, updateUsers };