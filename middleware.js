function isAdmin (req, res, next) {
    if (['super', 'founder', 'admin'].some(role => role === req.user.role)) return next();
    // dynamically insert page from req.currentUrl
    req.flash('info', 'You do not have permissions to view that page');
    return res.redirect('/')
};

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) return next();
    req.flash('info', 'Please sign in');
    return res.redirect('/login')
};

module.exports = { isAdmin, isLoggedIn };