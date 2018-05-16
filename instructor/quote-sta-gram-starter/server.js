// Required resources always go first
const express = require('express');
const path = require('path');
const logger = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const quotesRouter = require('./routes/quotes');

const PORT = process.env.PORT || 4000;

const app = express();

// TODO: SET UP EJS VIEWS AND VIEW ENGINE

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

// TODO: SETUP METHODOVERRIDE


/* ROUTES */
app.use('/quotes', quotesRouter);

app.get('/', (req, res) => {
 res.send('home page')
});

app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});
