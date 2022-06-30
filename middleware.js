function devFeatures (req, res, next) {
    if (process.env.NODE_ENV !== 'production' ||
        req.cookies['testing'] ||
        (req.user || {})._id == '606ddbb40a13b832a50cdc15') return next();
    req.flash('info', 'You do not have permissions to view that page');
    return res.redirect('/')
};

function isAdmin (req, res, next) {
    if (res.locals.ADMIN_ACCESS) return next();
    req.flash('info', 'You do not have permissions to view that page');
    return res.redirect('/')
};

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) return next();
    req.flash('info', 'Please sign in');
    return res.redirect('/login')
};

module.exports = { devFeatures, isAdmin, isLoggedIn };