const User = require('../models/user');

const createUserObject = require('../utilities/createUserObject');
const { customDate } = require('../utilities/formatDate');

async function checkValues (req, res) {
    function capitalise(word) {
        return word[0].toUpperCase() + word.substring(1);
    };
    const key = Object.keys(req.query)[0];
    const users = await User.find({ [key]: req.query[key] });
    if (users.length > 0) return res.json({ success: false, message: `${capitalise(key)} already exists` });
    return res.json({ success: true, message: `No existing ${capitalise(key)}` });
};

async function show (req, res) {
    let { birthday, formattedBirthday } = await User.findById(req.user._id);
    if (birthday) birthday = formattedBirthday.datePicker;
    res.render('account/index', { date: customDate('yyyy-mm-dd'), birthday });
};

async function update (req, res) {
    const id = req.user._id;
    if (!id) {
        req.flash('error', 'Something went wrong');
        return res.redirect('/account');
    };
    const { username, name, images, email, birthday, gender } = createUserObject(req.body);
    const user = await User.findById(id);
    user.username = username;
    user.name = name;
    user.images = images;
    user.email = email;
    user.birthday = birthday;
    user.gender = gender;    
    await user.save();
    req.flash('success', 'Account updated');
    res.redirect('/account');
};

async function updatePassword (req, res) {
    const user = await User.findById(req.user._id);
    await user.setPassword(req.body['new-password']);
    await user.save();
    req.flash('success', 'Password changed successfully');
    res.redirect('/account');
};

async function remove (req, res) {
    const id = req.user._id;
    req.logout();
    await User.findByIdAndDelete(id);
    req.flash('success', 'Account deleted');
    res.redirect('/');
};

module.exports = { checkValues, show, update, updatePassword, remove };