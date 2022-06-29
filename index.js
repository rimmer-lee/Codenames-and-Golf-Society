if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const cookieParser = require('cookie-parser');
const ejsMate = require('ejs-mate');
const express = require('express');
const flash = require('connect-flash');

// alternative https://www.youtube.com/watch?v=PNtFSVU-YTI
const helmet = require('helmet');

const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
// const mongoSanitize = require('express-mongo-sanitize');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const path = require('path');
const session = require('express-session');

const ExpressError = require(path.join(__dirname, 'utilities', 'ExpressError'));

const User = require(path.join(__dirname, 'models', 'user'));

const {
    ACTIONS,
    COUNTRY_CODES,
    GAMES,
    GENDERS,
    NAME_TITLES,
    PAR_CLASSES,
    ROLES,
    ROUND_TYPES,
    SAFE_URLS,
    TEE_COLOURS,
    TITLES
} = require(path.join(__dirname, 'constants'));

const { devFeatures } = require(path.join(__dirname, 'middleware'));

const app = express();
const db = mongoose.connection;

const accountRoutes = require(path.join(__dirname, 'routes', 'account'));
const charterRoutes = require(path.join(__dirname, 'routes', 'charter'));
const courseRoutes = require(path.join(__dirname, 'routes', 'courses'));
const demeritRoutes = require(path.join(__dirname, 'routes', 'demerits'));
const drinkRoutes = require(path.join(__dirname, 'routes', 'drinks'));
// const gameRoutes = require(path.join(__dirname, 'routes', 'games'));
const playerRoutes = require(path.join(__dirname, 'routes', 'players'));
const roundRoutes = require(path.join(__dirname, 'routes', 'rounds'));
const userRoutes = require(path.join(__dirname, 'routes', 'users'));

const port = process.env.PORT;
const secret = process.env.SECRET;
const dbUrl = process.env.DB_URL;
// const dbUrl = 'mongodb+srv://Admin:admin@prod.g9azw.mongodb.net/prod?retryWrites=true&w=majority';
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
    useFindAndModify: false,
    // ssl: true,
    // sslValidate: true
});

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Database connected'));

store.on('error', e => console.error('Session store error', e));

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", ...SAFE_URLS.connect],
        scriptSrc: ["'unsafe-inline'", "'self'", ...SAFE_URLS.script],
        styleSrc: ["'self'", "'unsafe-inline'", ...SAFE_URLS.style],
        workerSrc: ["'self'", "blob:", ...SAFE_URLS.worker],
        objectSrc: [...SAFE_URLS.object],
        imgSrc: ["'self'", "blob:", "data:", ...SAFE_URLS.image],
        fontSrc: ["'self'", ...SAFE_URLS.font]
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
    res.locals.actions = ACTIONS;
    res.locals.countryCodes = COUNTRY_CODES;
    res.locals.GAMES = GAMES;
    res.locals.genders = GENDERS;
    res.locals.nameTitles = NAME_TITLES;
    res.locals.parClasses = PAR_CLASSES;
    res.locals.roles = ROLES;
    res.locals.ROUND_TYPES = ROUND_TYPES;
    res.locals.teeColours = TEE_COLOURS;
    res.locals.titles = TITLES;
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.info = req.flash('info');
    res.locals.error = req.flash('error');
    next();
});

app.use('/account', accountRoutes);
app.use('/charter', charterRoutes);
app.use('/demerits', demeritRoutes);
app.use('/demerits/drinks', drinkRoutes);
app.use('/players', playerRoutes);
app.use('/rounds/courses', courseRoutes);
app.use('/rounds', roundRoutes);
app.use('/', userRoutes);

app.get('/', (req, res) => res.render('home'));

app.get('/set-cookie', (req, res) => {
    const { name, value = true} = req.query;
    if (name) res.cookie(name, value, { maxAge: 24 * 60 * 60 * 1000 });
    res.redirect('/');
});

// below routes are available only locally or with cookie 'testing'

app.use(devFeatures)

// these should be moved to a separate route file

// app.get('/delete-rules', async (req, res) => {
//     const Charter = require(path.join(__dirname, 'models', 'charter'));
//     const Rule = require(path.join(__dirname, 'models', 'rule'));
//     const charters = await Charter.find();
//     const rules = await Rule.find();
//     const charterRules = charters.map(({ sections }) => sections.filter(({ rules }) => rules.length > 0).map(({ rules }) => rules)).flat(3);
//     for (const rule of rules) {
//         if (!charterRules.some(id => id == rule.id)) await rule.delete();
//     };
//     res.redirect('/')
// });

// app.get('/test/course/:id', async (req, res) => {
//     const Course = require(path.join(__dirname, 'models', 'course'));
//     const course = await Course.findById(req.params.id);
//     await course.save();
//     req.flash('success', `${course.name} saved`);
//     return res.redirect('/');
// });

// app.get('/add-user-passwords', async (req, res) => {
//    const users = await User.find();
//    for (const user of users) {
//        const u = await user.setPassword(user.username);
//        await u.save();
//    };
//    return res.redirect('/');
// });

// app.get('/update/machine', async (req, res) => {
//     const theMachine = await User.findOne({ 'username': 'machine' });
//     for (const property of ['birthday', 'gender', 'handicap', 'images', 'name']) theMachine[property] = undefined;
//     await theMachine.save();
//     res.redirect('/');
// });

// app.get('/update/courses', async (req, res) => {
//     const Course = require(path.join(__dirname, 'models', 'course'));
//     const Round = require(path.join(__dirname, 'models', 'round'));
//     const Tee = require(path.join(__dirname, 'models', 'tee'));
//     const courses = await Course.find();
//     for (const course of courses) {
//         const rounds = await Round.find({ 'course': course._id }).populate('course');
//         for (const round of rounds) {
//             const tee = course.tees.find(({ name }) => name.toLowerCase() == round.tee.toLowerCase());
//             round.tee = `${tee.name}|${tee.gender}`;
//         };
//         course.tees = await Promise.all(course.tees.map(async tee => {
//             tee._id = undefined;
//             return await new Tee(tee).save();
//         }));
//         for (const round of rounds) {
//             round.tee = course.tees.find(({ gender, name }) => `${name}|${gender}` === round.tee);
//             await round.save();
//         };
//         await course.save();
//     };
//     return res.redirect('/');
// });

// app.get('/update/rounds', async (req, res) => {
//     const Round = require(path.join(__dirname, 'models', 'round'));
//     const rounds = await Round.find().populate('course');
//     for (const round of rounds) await round.save();
//     res.redirect('/');
// });

// app.get('/update/users', async (req, res) => {
//     const users = await User.find();
//     for (const user of users) {
//         const { first = '', middle = [], last = '' } = user.name;
//         user.name.full = `${first} ${middle.join(' ')} ${last}`;
//         await user.save();
//     };
//     res.redirect('/');
// });

// above routes are available only locally or with cookie 'testing'

if (process.env.NODE_ENV !== 'production') {
    app.get('/reseed', async (req, res) => {
        const { seed } = require('./seeds/seed');
        await seed();
        res.redirect('/');
    });
};

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

app.listen(port, () => console.log(`Serving Codenames and Golf Society on port ${port}`));

// https://ncrdb.usga.org/

// set width of options to equal width of select - useful for any drop down
// https://stackoverflow.com/questions/36676701/set-width-at-option-of-select-box
// https://stackoverflow.com/questions/29508534/fix-width-of-drop-down-menu-in-select-option
// https://stackoverflow.com/questions/10672586/how-to-make-select-elements-shrink-to-max-width-percent-style-within-fieldset


// https://rapidapi.com/golfambit-golfambit-default/api/golf-course-finder/


// async function readImage() {
//     const Jimp = require('jimp');
//     const tesseract = require('node-tesseract-ocr');

//     const config = {
//         lang: 'eng',
//         oem: 1,
//         psm: 3,
//         tessedit_char_whitelist: '0123456789',
//         preserve_interword_spaces: '0',
//     };

//     const image = Jimp.read('windmill hill.jpeg')
//         .then(image => {
//             image
//                 // .color([{apply: 'desaturate', params: [90]}])
//                 .greyscale()
//                 .contrast(1)
//                 .write('image.jpg');
//         })
//         .then(async () => {
//             const result = await tesseract.recognize('image.jpg', config);
//             console.log(result);

//         })
//         .catch(error => console.error(error));
// };

// readImage();


// for rounds/new
//      - add feature to name teams
//      - for handicap enabled, offer standard or competition (deduct lower handicap from others - applicable for Stableford and match play)

// should utilities files be combined in a utilities.js???

// enable sorting and filtering on /rounds

// implement functionality for /rounds/edit

// there's a bug on /rounds/new where the course select isn't always selected

// tidy .css files

// update Course.name to be Course.name = { long, name, short }, or something similar

// consolidate rounds on the same day, same course, same tee
//    - capture the playing ID (marker, player-a, etc.) and the playing group to the scores schema

// handle non-connectivity in externalApis

// resolve birthday date issue in /account

// for courses edit and new, add labels for tee and tee display colour

// Calculate handicaps

// Tabbed input is shown on /rounds/new

// Voting/Approval required for submitted demerits

// Sort functionality in tables

// Push notifications

// get scorecard and geo location data - see course controller

// add save/submit buttons to top of form
//    - have them floating?

// put flash message in container on home screen i.e. for when logging out