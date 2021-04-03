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
const Demerit = require('./models/demerit');
const Drink = require('./models/drink');
const Title = require('./models/title');
const User = require('./models/user');
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

app.use('/games', gameRoutes);

app.get('/', (req, res) => res.render('home'));

// app.get('/:route', (req, res) => res.render(`${req.params.route}/index`));

// app.get('/:route/:id', (req, res) => res.render(`${req.params.route}/${req.params.id}/index`));

app.get('/rules', async (req, res) => {
    const charter = await Charter.findOne().sort({ 'lastModified.date': -1 }).populate('sections');
    const { sections } = charter;
    res.render('rules/index', { sections });
});
app.get('/rules/edit', async (req, res) => {
    const charter = await Charter.findOne().sort({ 'lastModified.date': -1 }).populate('sections');
    const { lastModified, sections } = charter;    
    res.render('rules/edit', { lastModified, sections });
});
app.post('/rules', async (req, res) => {
    // const formKeys = Object.keys(req.body);
    // const sectionKeys = [ ...new Set(formKeys.map(value => value.match(/s\d+|/)[0])) ];
    // const sections = sectionKeys.map(value => {
    //     const description = formKeys.filter(key => {
    //         const regex = new RegExp(`${value}\\|d`);
    //         return regex.test(key)
    //     }).map(key => req.body[key]);
    //     const sections = formKeys.filter(key => {
    //         const regex = new RegExp(`${value}\\|s`);
    //         return regex.test(key)
    //     }).map(key => {
    //         return { description: [req.body[key]] }
    //     });
    //     return {
    //         title: req.body[`${value}|t`],
    //         description,
    //         sections
    //     }
    // });
    // await new Charter({ sections }).save();
    // res.redirect('/rules');
    
    res.send(req.body)

});

app.get('/demerits', async (req, res) => {

    // move to a utilities file
    function formatDate(date) {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    };

    const startDate = new Date(2021, 0, 1);
    const endDate = new Date(2021, 11, 31);

    const users = await User.find().sort({ 'name.knownAs': 1 });
    const demerits = await Demerit.find({ date: { $gte: startDate, $lte: endDate } }).sort({ date: 1 }).populate({ path: 'player' });
    const drinks = await Drink.find({ date: { $gte: startDate, $lte: endDate } }).sort({ date: 1 }).populate({ path: 'player' });
     
    const allTitles = await Title.find({ date: { $gte: startDate, $lte: endDate } });
    const titles = [ ...new Set(allTitles.map(({ name }) => name)) ];

    const demeritDates = [ ...new Set(demerits.map(demerit => formatDate(demerit.date))) ];
    const drinkDates = [ ...new Set(drinks.map(drink => formatDate(drink.date))) ];

    const data = {
        players: users.map(user => {
            return { name: user.name.knownAs, titles: [] };    
        }),
        demerits: demeritDates.map(demeritDate => {
            const demeritsForDate = demerits.filter(demerit => formatDate(demerit.date) === demeritDate);
            return {
                date: demeritDate,
                players: users.map(user => {
                    const player = user.name.knownAs;
                    const demerits = demeritsForDate.filter(demerit => demerit.player.name.knownAs === player).reduce((accumulate, demerit) => accumulate + demerit.value, 0)
                    return { player, demerits };
                })
            };
        }),
        drinks: drinkDates.map(drinkDate => {
            const drinksForDate = drinks.filter(drink => formatDate(drink.date) === drinkDate);
            return {
                date: drinkDate,
                players: users.map(user => {
                    const player = user.name.knownAs;
                    const drinks = drinksForDate.filter(drink => drink.player.name.knownAs === player).reduce((accumulate, drink) => accumulate + drink.value, 0)
                    return { player, drinks };
                })
            };
        }),
    };


    for (const title of titles) {
        const t = await Title.findOne({ name: title }).sort({ date: -1 }).populate({ path: 'holder' });
        data.players.find(({ name }) => t.holder.name.knownAs === name).titles.push(title);
    };

    for (const player of data.players) {
        player.demerits = demerits.filter(demerit => demerit.player.name.knownAs === player.name).reduce((accumulate, drink) => accumulate + drink.value, 0);
        player.bought = drinks.filter(drink => drink.player.name.knownAs === player.name).reduce((accumulate, drink) => accumulate + drink.value, 0);
        player.owed = Math.floor(player.demerits / 5);
        player.balance = player.owed - player.bought
        if (player.demerits >= 20) player.bbq = true;
        else player.bbq = false;
    };

    res.render('demerits/index', { data } );
});
app.get('/demerits/new', async (req, res) => {
    
    function formatDate(date) {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    };

    const date = formatDate(new Date());
    const users = await User.find().sort({ 'name.knownAs': 1 });
    const players = users.map(user => user.name.knownAs);
    res.render('demerits/new', { date, players });
});
app.post('/demerits', async (req, res) => {
    const { demerit } = req.body;
    demerit.player = await User.find({ 'name.knownAs': demerit.player });
    await new Demerit(demerit).save();
    res.redirect('/demerits');
});

app.all('*', (req, res, next) => next(new ExpressError(404, 'Page Not Found')));

app.use((error, req, res, next) => {
    const { status = 500 } = error;
    if (!error.message) error.message = 'Somehing went wrong';
    res.status(status).render('error', { error });
});

app.listen(port, () => console.log(`Serving Codesnames and Golf Society on port ${port}`));