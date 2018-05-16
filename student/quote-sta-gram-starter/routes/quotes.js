const express = require('express');
const controller = require('../controllers/quotesController');
const views = require('../controllers/viewController');

const quotesRouter = express.Router();

quotesRouter.get('/:id/edit', controller.getOne, views.showEditForm, views.show404);

quotesRouter.get('/new', views.showAddForm);

quotesRouter.route('/:id')
  .get(controller.getOne, views.showOne, views.show404)
  .put(controller.update, views.handleUpdate, views.show406)
  .delete(controller.destroy, views.handleDelete, views.show404);


quotesRouter.route('/')
  .get(controller.index, views.showQuotes, views.show404)
  .post(controller.create, views.handleCreate, views.show406);

module.exports = quotesRouter;

