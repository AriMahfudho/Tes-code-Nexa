const { authJwt } = require('../middleware/auth');
const controller = require('../controller/transaction.controller');

module.exports = function(app) {
  app.get('/api/transactions',  controller.getAll);
  app.post('/api/transactions',  controller.create);
  app.put('/api/transactions/:id',  controller.update);
  app.delete('/api/transactions/:id',  controller.delete);
};
