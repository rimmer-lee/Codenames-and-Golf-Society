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

const Charter = require('./models/charter');
const gameRoutes = require('./routes/games');

const port = process.env.PORT || 3000;
const secret = process.env.SECRET || 'thisshouldbeabettersecret';
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/codenames-and-golf-society';

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
    font: ['https://fonts.gstatic.com'],
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

app.use('/games', gameRoutes);

app.get('/', (req, res) => res.render('home'));

// app.get('/:route', (req, res) => res.render(`${req.params.route}/index`));

// app.get('/:route/:id', (req, res) => res.render(`${req.params.route}/${req.params.id}/index`));

app.get('/rules', async (req, res) => {
    const charter = await Charter.findOne().sort({ 'lastModified.date': -1 }).populate('sections');
    const { sections } = charter;
    console.log(sections)
    res.render('rules/index', { sections });
});
app.get('/rules/edit', async (req, res) => {
    const charter = await Charter.findOne().sort({ 'lastModified.date': -1 }).populate('sections');
    const { lastModified, sections } = charter;    
    res.render('rules/edit', { lastModified, sections });
});
app.post('/rules', (req, res) => {
    function stringToArray(item) {
        if (typeof item === 'string') return [item];
        return item;
    };
    const data = req.body;
    const charter = new Charter();
    for (const key of Object.keys(data)) {
        const section = data[key];
        let sectionsArray = [];
        if (section.sections) {
            sectionsArray = section.sections.map(value => {
                return { description: [value] };
            })
        }
        charter.sections.push({
            title: section.title,
            description: stringToArray(section.description),
            sections: sectionsArray
        });        
    };
    charter.save();
    res.redirect('/rules');
});

app.get('/demerits', (req, res) => {
    
});

app.all('*', (req, res, next) => next(new ExpressError(404, 'Page Not Found')));

app.use((error, req, res, next) => {
    const { status = 500 } = error;
    if (!error.message) error.message = 'Something went wrong';
    res.status(status).render('error', { error });
});

app.listen(port, () => console.log(`Serving Codesnames and Golf Society on port ${port}`));