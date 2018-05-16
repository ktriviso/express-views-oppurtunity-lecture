/**
 * @module controllers/quotesController
 * @author Jason Seminara <js@ga.co>
 */

const quoteDB = require('../models/quoteDB');

/**
 * Create a QuoteController
 */
module.exports = {
  /**
   * Create a blank Quote and set it in res.locals
   * @param {req} req - Node's Request Object
   * @param {res} res - Node's Response Object
   * @param {next} next - The next middleware function in our route
   * @return {undefined}
   */
  makeBlankQuote(req, res, next) {
    const blankQuote = {
      id:         null,
      content:    null,
      author:     null,
      genre_type: null,
    };
    res.locals.quote = blankQuote;
    next();
  },


  /**
   * Middleware function:
   * Get all the quotes and set them in res.locals
   * @param {req} req - Node's Request Object
   * @param {res} res - Node's Response Object
   * @param {next} next - The next middleware function in our route
   * @return {undefined}
   */
  index(req, res, next) {
    quoteDB.findAll()
      .then((quotes) => {
        console.log('this is quotes: ', quotes)
        res.locals.quotes = quotes;
        next();
      })
      .catch(err => next(err));
  },

  /**
   * Read One Middleware:
   * Get a quote from the DB and set it in res.locals
   * @param {req} req - Node's Request Object
   * @param {res} res - Node's Response Object
   * @param {next} next - The next middleware function in our route
   * @return {undefined}
   */
  getOne(req, res, next) {
    quoteDB.findById(req.params.id)
      .then((quote) => {
        console.log(quote);
        // let obj = {...quote, "id": req.params.id}
        res.locals.quote = quote;
        next();
      })
      .catch(err => next(err));
  },

  /**
   * Create Middleware:
   * Get quote data from the front-end and set it in the DB
   * Sets the results of the insertion into res.locals.quote
   * @param {req} req - Node's Request Object
   * @param {res} res - Node's Response Object
   * @param {next} next - The next middleware function in our route
   * @return {undefined}
   */
  create(req, res, next) {
    quoteDB.save(req.body)
      .then((quote) => {
        res.locals.quote = quote;
        next();
      })
      .catch(err => next(err));
  },

  /**
   * Update Middleware:
   * Get quote data from the DB;
   * Merge the data from the front-end;
   * Set it in the DB;
   * @param {req} req - Node's Request Object
   * @param {res} res - Node's Response Object
   * @param {next} next - The next middleware function in our route
   * @return {undefined}
   */
  update(req, res, next) {
    console.log(req.body, 'update controller');
    quoteDB.update(req.body)
      .then((quote) => {
        res.locals.quote = quote;
        next();
      })
      .catch(err => next(err));
  },

  /**
   * @func destroy
   * @desc Destroy the quote at this id
   * @param {req} req - Node's Request Object
   * @param {res} res - Node's Response Object
   * @param {next} next - The next middleware function in our route
   * @return {undefined}
   */
  destroy(req, res, next) {
    quoteDB.destroy(req.params.id)
      .then(() => next())
      .catch(err => next(err));
  },


  /**
   * @func showNewForm
   * @desc Show a blank HTML form
   * @param {req} req - Node's Request Object
   * @param {res} res - Node's Response Object
   * @param {next} next - The next middleware function in our route
   * @return {undefined}
   */
  showQuoteForm: (req, res) => {
    res.json({
      message: 'I’m the HTML form for new quotes. I post to /quotes',
    });
  },


};
