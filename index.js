// login tutorial
// https://www.youtube.com/watch?v=-RCnNyD0L-s

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');
const express = require('express');
const flash = require('connect-flash');

// alternative
// https://www.youtube.com/watch?v=PNtFSVU-YTI
const helmet = require('helmet');

const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
// const mongoSanitize = require('express-mongo-sanitize');
const MongoStore = require('connect-mongo').default;
const passport = require('passport');
const path = require('path');
const session = require('express-session');

const ExpressError = require('./utilities/ExpressError');

const User = require('./models/user');

const { TITLES, ACTIONS, NAME_TITLES, GENDERS } = require('./constants');

const app = express();
const db = mongoose.connection;

const charterRoutes = require('./routes/charter');
const demeritRoutes = require('./routes/demerits');
const drinkRoutes = require('./routes/drinks');
// const gameRoutes = require('./routes/games');
const accountRoutes = require('./routes/account');
const userRoutes = require('./routes/users');
const user = require('./models/user');

const port = process.env.PORT || 3000;
const secret = process.env.SECRET || 'thisshouldbeabettersecret';
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/codenames-and-golf-society'; // DB_URL=mongodb+srv://Admin:admin@prod.g9azw.mongodb.net/prod?retryWrites=true&w=majority
const sessionDuration = 60 * 60 * 24 * 7;

const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        expires: Date.now() + sessionDuration,
        maxAge: sessionDuration
    }
};

const safeUrls = {
    connect: [],
    font: [
        'https://cdn.jsdelivr.net/',
        'https://fonts.gstatic.com'
    ],
    image: [],
    object: [],
    style: [
        'https://cdn.jsdelivr.net/',
        'https://stackpath.bootstrapcdn.com/',
        'https://fonts.googleapis.com/'
    ],
    script: [
        'https://cdn.jsdelivr.net/',
        'https://stackpath.bootstrapcdn.com/',
    ],
    worker: []
};

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Database connected'));

store.on('error', (e) => console.error('Session store error', e));

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", ...safeUrls.connect],
        scriptSrc: ["'unsafe-inline'", "'self'", ...safeUrls.script],
        styleSrc: ["'self'", "'unsafe-inline'", ...safeUrls.style],
        workerSrc: ["'self'", "blob:", ...safeUrls.worker],
        objectSrc: [...safeUrls.object],
        imgSrc: ["'self'", "blob:", "data:", ...safeUrls.image],
        fontSrc: ["'self'", ...safeUrls.font]
    }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use('/games', gameRoutes);

// app.get('/:route', (req, res) => res.render(`${req.params.route}/index`));

// app.get('/:route/:id', (req, res) => res.render(`${req.params.route}/${req.params.id}/index`));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.titles = TITLES;
    res.locals.actions = ACTIONS;
    res.locals.nameTitles = NAME_TITLES;
    res.locals.genders = GENDERS;
    res.locals.success = req.flash('success');
    res.locals.info = req.flash('info');
    res.locals.error = req.flash('error');
    next();
});

app.use('/charter', charterRoutes);

app.use('/demerits', demeritRoutes);

app.use('/demerits/drinks', drinkRoutes);

app.use('/account', accountRoutes);

app.use('/users', userRoutes);

app.get('/login', (req, res) => {
    res.render('account/login', { from: '/' });
});

app.post('/login', (req, res) => {
    return res.send(req.body)
});

app.get('/register', (req, res) => {
    const formatDate = require('./utilities/formatDate');
    const date = formatDate('yyyy-mm-dd');
    res.render('account/register', { date, from: '/' });
});

app.post('/register', async (req, res) => {

    const { email, title, name, image, birthday, gender } = req.body.register;
    const { full, preferred } = name;
    const names = full.split(' ');
    const user = {
        name: { title, preferred },
        // image,
        email,
        birthday: birthday,
        gender
    };
    if (names.length > 0) user.name.first = names[0];
    if (names.length > 1) user.name.last = names[names.length - 1];
    if (names.length > 2) user.name.middle = names.slice(1, -1);
    const u = await new User(user).save();
    req.flash('success', `Welcome ${preferred}`);
    res.redirect(`/account/${u.id}`);
});

app.get('/', (req, res) => res.render('home'));

if (process.env.NODE_ENV !== 'production') {
    app.get('/reseed', async (req, res) => {
        const { seed } = require('./seeds/seed');
        await seed();
        res.redirect('/');
    });
};

app.all('*', (req, res, next) => next(new ExpressError(404, 'Page Not Found')));

app.use((error, req, res, next) => {
    const { status = 500 } = error;
    if (!error.message) error.message = 'Something went wrong';
    res.status(status).render('error', { error });
});

app.listen(port, () => console.log(`Serving Codesnames and Golf Society on port ${port}`));