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

require(path.join(__dirname, 'utilities', 'prototypes'));

const ExpressError = require(path.join(__dirname, 'utilities', 'ExpressError'));

const User = require(path.join(__dirname, 'models', 'user'));

const {
    ACTIONS,
    GAMES,
    GENDERS,
    NAME_TITLES,
    NAVBAR_LINKS,
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

const {
    DB_URL: mongoUrl,
    NODE_ENV: ENV,
    PORT,
    SECRET: secret
} = process.env;

const sessionDuration = 1000 * 60 * 60 * 24 * 728;

const store = MongoStore.create({
    mongoUrl,
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

mongoose.connect(mongoUrl, {
    // keepAlive: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // reconnectTries: 5,
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
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        connectSrc: [...SAFE_URLS.connect, "'self'"],
        scriptSrc: [...SAFE_URLS.script, "'unsafe-inline'", "'self'"],
        styleSrc: [ ...SAFE_URLS.style, "'self'", "'unsafe-inline'"],
        workerSrc: [...SAFE_URLS.worker, "'self'", "blob:"],
        objectSrc: [...SAFE_URLS.object],
        imgSrc: [...SAFE_URLS.image, "'self'", "blob:", "data:"],
        fontSrc: [...SAFE_URLS.font, "'self'"]
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
    // const { user } = req;

    res.locals.NAVBAR_LINKS = NAVBAR_LINKS.sortBy(true, 'order');

    // Constants
    res.locals.actions = ACTIONS;
    res.locals.GAMES = (function() {
        for (const key of Object.keys(GAMES)) {
            GAMES[key].map(i => {
                i.description = i.description.replace(/'/g, '`');
                return i;
            });
        };
        return GAMES;
    })();
    res.locals.genders = GENDERS;
    res.locals.nameTitles = NAME_TITLES;
    res.locals.parClasses = PAR_CLASSES;
    res.locals.roles = ROLES;
    res.locals.ROUND_TYPES = ROUND_TYPES;
    res.locals.teeColours = TEE_COLOURS;
    res.locals.titles = TITLES;

    // Flash messages
    res.locals.success = req.flash('success');
    res.locals.info = req.flash('info');
    res.locals.error = req.flash('error');

    // User variables
    res.locals.currentUser = req.user;
    res.locals.ADMIN_ACCESS = !!(req?.user?.access?.admin);
    res.locals.EDIT_ACCESS = !!(req?.user?.access?.edit);

    // res.locals.USER = {
    //     ...user,
    //     ACCESS: {
    //         ADMIN: !!(user?.access?.admin),
    //         EDIT: !!(user?.access?.edit)
    //     }
    // };

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

if (ENV !== 'production') {
    app.get('/reseed', async (req, res) => {
        if (mongoose.connection._connectionString !== mongoUrl) {
            req.flash('error', 'You\'re not connected to the dev database');
            return res.redirect('home');
        };
        const { seed } = require(path.join(__dirname, 'seeds', 'seed'));
        await seed();
        res.redirect('/');
    });
};

app.all('*', (req, res, next) => {
    if (ENV !== 'production') return next(new ExpressError(404, 'Page Not Found'));
    req.flash('error', 'Page not found');
    res.redirect('/');
});

app.use((error, req, res, next) => {
    const { status = 500 } = error;
    if (!error.message) error.message = 'Something went wrong';
    res.status(status).render('error', { error });
});

app.listen(PORT, () => console.log(`Serving Codenames and Golf Society on port ${PORT}`));

// https://ncrdb.usga.org/

// set width of options to equal width of select - useful for any drop down
// https://stackoverflow.com/questions/36676701/set-width-at-option-of-select-box
// https://stackoverflow.com/questions/29508534/fix-width-of-drop-down-menu-in-select-option
// https://stackoverflow.com/questions/10672586/how-to-make-select-elements-shrink-to-max-width-percent-style-within-fieldset


// https://rapidapi.com/golfambit-golfambit-default/api/golf-course-finder/


// (async function readImage() {
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
// })();


// live scoring with socket.io()

// prevent users from navigating away from the reset password page when forced to reset password i.e. login for first time with default password or reset password

// should utilities files be combined in a utilities.js???

// implement functionality for /rounds/edit

// there's a bug on /rounds/new where the course select isn't always selected

// tidy .css files

// handle non-connectivity in externalApis

// resolve birthday date issue in /account

// for courses edit and new, add labels for tee and tee display colour
//  - change default tee for course

// Tabbed input is shown on /rounds/new i.e. input for next hole then that hole is shown

// Voting/Approval required for submitted demerits

// Sort and filter functionality in tables

// Push notifications

// geo location data - see course controller

// add save/submit buttons to top of form
//    - have them floating?

// put flash message in container on home screen i.e. for when logging out

// show hole by hole game result in scorecard when viewing round

// ace instead of eagle on hole in ones

// graphs/charts