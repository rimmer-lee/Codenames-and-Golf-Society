const User = require('../models/user');

const { customDate } = require('../utilities/formatDate');

require('../utilities/capitalize');

async function checkValues (req, res) {
    const key = Object.keys(req.query)[0];
    const users = await User.find({ [key]: req.query[key] });
    if (users.length > 0) return res.json({ success: false, message: `${key.capitalize()} already exists` });
    return res.json({ success: true, message: `No existing ${key.capitalize()}` });
};

async function show (req, res) {
    try {
        let { birthday, formattedBirthday } = req.user;
        if (birthday) birthday = formattedBirthday.datePicker;
        return res.render('account/index', { date: customDate('yyyy-mm-dd'), birthday });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Something went wrong');
        return res.redirect('/');
    };
};

async function update (req, res) {
    try {
        const user = await User.findById(req.user.id);
        const { birthday, email, gender, images, name, username } = req.body;
        user.birthday = birthday;
        user.email = email;
        user.gender = gender;
        user.images = images;
        user.name = name;
        user.username = username;
        await user.save();
        req.flash('success', 'Account updated');
        return res.redirect('/account');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Something went wrong');
        return res.redirect('/account');
    };
};

async function updatePassword (req, res) {
    try {
        const user = await User.findById(req.user._id);
        await user.setPassword(req.body['new-password']);
        await user.save();
        req.flash('success', 'Password changed successfully');
        return res.redirect('/account');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Something went wrong');
        return res.redirect('/account');
    };
};

async function remove (req, res) {
    if (req.user.access.access) {
        req.flash('error', 'Your account cannot be deleted');
        return res.redirect('/account');
    };
    try {
        const { id } = req.user;
        req.logout();
        const user = await User.findByIdA(id);
        for (const property of ['email', 'hash', 'salt', 'username']) user[property] = undefined;
        user.save();
        req.flash('success', 'Account deleted');
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Something went wrong');
        return res.redirect('/account');
    }
};

module.exports = { checkValues, show, update, updatePassword, remove };