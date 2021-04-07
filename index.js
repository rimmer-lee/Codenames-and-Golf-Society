if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');
const express = require('express');
// const flash = require('connect-flash');
const helmet = require('helmet');
// const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
// const mongoSanitize = require('express-mongo-sanitize');
const MongoStore = require('connect-mongo').default;
// const passport = require('passport');
const path = require('path');
const session = require('express-session');

const ExpressError = require('./utilities/ExpressError');

const app = express();
const db = mongoose.connection;

const charterRoutes = require('./routes/charter');
const demeritRoutes = require('./routes/demerits');
const drinkRoutes = require('./routes/drinks');
// const titleRoutes = require('./routes/titles');
const gameRoutes = require('./routes/games');

const port = process.env.PORT || 3000;
const secret = process.env.SECRET || 'thisshouldbeabettersecret';
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/codenames-and-golf-society'; // DB_URL=mongodb+srv://Admin:admin@prod.g9azw.mongodb.net/prod?retryWrites=true&w=majority

const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

const sessionConfig = {
    store,
    // name: 'sessions',
    secret,
    resave: false,
    saveUninitialized: true
    // , cookie: {
    //     httpOnly: true,
    //     secure: false,
    //     expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    //     maxAge: 1000 * 60 * 60 * 24 * 7
    // }
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sessionConfig));
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

app.get('/', (req, res) => res.render('home'));

app.use('/games', gameRoutes);

// app.get('/:route', (req, res) => res.render(`${req.params.route}/index`));

// app.get('/:route/:id', (req, res) => res.render(`${req.params.route}/${req.params.id}/index`));

app.use('/charter', charterRoutes);

app.use('/demerits', demeritRoutes);

app.use('/demerits/drinks', drinkRoutes);

// app.use('/demerits/titles', titleRoutes);

app.all('*', (req, res, next) => next(new ExpressError(404, 'Page Not Found')));

app.use((error, req, res, next) => {
    const { status = 500 } = error;
    if (!error.message) error.message = 'Somehing went wrong';
    res.status(status).render('error', { error });
});

app.listen(port, () => console.log(`Serving Codesnames and Golf Society on port ${port}`));