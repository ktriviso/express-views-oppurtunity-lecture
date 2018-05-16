module.exports = {

  show404(err, req, res, next) {
    res.sendStatus(404);
  },
  show406(err, req, res, next) {
      console.log(err);
    res.sendStatus(406);
  },
  showQuotes(req, res) {
      // update this to renfer the quote-index.ejs file
      // and send it the data stored in res.lcoals.quote

      // update the quote-index.ejs to render all the quotes
    // res.send('showQuotes')
    res.render('quotes/quotes-index', {
        data: res.locals.quotes
    })
  },
  showOne(req, res) {
    // res.send('showOne')
    res.render('quotes/quotes-single', {
        data: res.locals.quote
    })
  },
  showAddForm(req, res) {
      // do you always have to send data when you use render? no.
    res.render('quotes/quote-add')
  },
  showEditForm(req, res) {
     res.render('quotes/quote-edit', {
         data: res.locals.quote
     })
  },
  handleCreate(req, res) {
    res.redirect('/quotes')
  },
  handleUpdate(req, res) {
     let id = req.params.id
     res.redirect(`/quotes/${id}`)
  },
  handleDelete(req, res) {
     res.redirect('/quotes')
  },
};
