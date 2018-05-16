// Required resources always go first
const express = require('express');
const path = require('path');
const logger = require('morgan');
// this is for the delete. we dont want our form to submit like it does naturally
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const quotesRouter = require('./routes/quotes');

const PORT = process.env.PORT || 4000;

const app = express();

// TODO: SET UP EJS VIEWS AND VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
// use this specific views engine
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

// TODO: SETUP METHODOVERRIDE
app.use(methodOverride('_method'))

/* ROUTES */
app.use('/quotes', quotesRouter);

app.get('/', (req, res) => {
    res.render('index', {
        message: 'hello from render',
        title: 'something',
        quoteAuthors: ['unknown', 'krista', 'mom', 'ghost']
    })
 // res.send('home page')
 // you can only send out one thing
});

app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});
