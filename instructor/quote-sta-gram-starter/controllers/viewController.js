module.exports = {

  show404(err, req, res, next) {
    res.sendStatus(404);
  },
  show406(err, req, res, next) {
    res.sendStatus(406);
  },
  showQuotes(req, res) {
    res.send('showQuotes')
  },
  showOne(req, res) {
    res.send('showOne')
  },
  showAddForm(req, res) {
     res.send('showAddForm')
  },
  showEditForm(req, res) {
     res.send('showEditForm')
  },
  handleCreate(req, res) {
    res.send('showHandleCreate')
  },
  handleUpdate(req, res) {
     res.send('showHandleUpdate')
  },
  handleDelete(req, res) {
     res.send('showHandleDelete')
  },
};

