if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const ejsMate = require('ejs-mate');
const express = require('express');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

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
// const catchAsync = require('./utilities/catchAsync');
// const createUserObject = require('./utilities/createUserObject');

const User = require('./models/user');

const constants = require('./constants');
const { devFeatures } = require('./middleware');

const app = express();
const db = mongoose.connection;

const accountRoutes = require('./routes/account');
const charterRoutes = require('./routes/charter');
const courseRoutes = require('./routes/courses');
const demeritRoutes = require('./routes/demerits');
const drinkRoutes = require('./routes/drinks');
// const gameRoutes = require('./routes/games');
const playerRoutes = require('./routes/players');
const roundRoutes = require('./routes/rounds');
const userRoutes = require('./routes/users');

const port = process.env.PORT || 3000;
const secret = process.env.SECRET || 'thisshouldbeabettersecret';
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/codenames-and-golf-society'; // DB_URL=mongodb+srv://Admin:admin@prod.g9azw.mongodb.net/prod?retryWrites=true&w=majority
const sessionDuration = 1000 * 60 * 60 * 24 * 728;

const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

const sessionConfig = {
    store,
    name: 'cgs',
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

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Database connected'));

store.on('error', e => console.error('Session store error', e));

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", ...constants.SAFE_URLS.connect],
        scriptSrc: ["'unsafe-inline'", "'self'", ...constants.SAFE_URLS.script],
        styleSrc: ["'self'", "'unsafe-inline'", ...constants.SAFE_URLS.style],
        workerSrc: ["'self'", "blob:", ...constants.SAFE_URLS.worker],
        objectSrc: [...constants.SAFE_URLS.object],
        imgSrc: ["'self'", "blob:", "data:", ...constants.SAFE_URLS.image],
        fontSrc: ["'self'", ...constants.SAFE_URLS.font]
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use('/games', gameRoutes);

// app.get('/:route', (req, res) => res.render(`${req.params.route}/index`));

// app.get('/:route/:id', (req, res) => res.render(`${req.params.route}/${req.params.id}/index`));

app.use(async (req, res, next) => {
    res.locals.titles = constants.TITLES;
    res.locals.actions = constants.ACTIONS;
    res.locals.nameTitles = constants.NAME_TITLES;
    res.locals.genders = constants.GENDERS;
    res.locals.roles = constants.ROLES;
    res.locals.teeColours = constants.TEE_COLOURS
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.info = req.flash('info');
    res.locals.error = req.flash('error');
    next();
});

app.use('/charter', charterRoutes);
app.use('/demerits', demeritRoutes);
app.use('/demerits/drinks', drinkRoutes);
app.use('/players', playerRoutes);

app.get('/', (req, res) => res.render('home'));

// below routes are available only locally or with cookie 'testing'

app.use(devFeatures)

app.use('/account', accountRoutes);
app.use('/rounds', roundRoutes);
app.use('/rounds/courses', courseRoutes);
app.use('/', userRoutes);
app.get('/reseed', async (req, res) => {
    const { seed } = require('./seeds/seed');
    await seed();
    res.redirect('/');
});

// above routes are available only locally or with cookie 'testing'

app.get('/set-cookie', (req, res) => {
    const { name, value = true} = req.query;
    if (name) res.cookie(name, value); 
    res.redirect('/');
});

app.all('*', (req, res, next) => {
    if (process.env.NODE_ENV !== 'production') return next(new ExpressError(404, 'Page Not Found'));
    req.flash('error', 'Page not found');
    res.redirect('/');    
});

app.use((error, req, res, next) => {
    const { status = 500 } = error;
    if (!error.message) error.message = 'Something went wrong';
    res.status(status).render('error', { error });
});

app.listen(port, () => console.log(`Serving Codesnames and Golf Society on port ${port}`));

// accordion table - might be useful in display individual played rounds
// https://stackoverflow.com/questions/24148631/creating-accordion-table-with-bootstrap/47527536
// https://stackoverflow.com/questions/16389775/twitter-bootstrap-use-collapse-js-on-table-cells-almost-done

// https://ncrdb.usga.org/

// set width of options to equal width of select - useful for any drop down
// https://stackoverflow.com/questions/36676701/set-width-at-option-of-select-box
// https://stackoverflow.com/questions/29508534/fix-width-of-drop-down-menu-in-select-option
// https://stackoverflow.com/questions/10672586/how-to-make-select-elements-shrink-to-max-width-percent-style-within-fieldset