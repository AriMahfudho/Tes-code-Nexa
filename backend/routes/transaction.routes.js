const { authJwt } = require('../middleware/auth');
const controller = require('../controller/transaction.controller');

// module.exports = function(app) {
//   app.get('/api/transactions', [authJwt.verifyToken], controller.getAll);
//   app.post('/api/transactions', [authJwt.verifyToken], controller.create);
//   app.put('/api/transactions/:id', [authJwt.verifyToken], controller.update);
//   app.delete('/api/transactions/:id', [authJwt.verifyToken], controller.delete);
// };
module.exports = function(app) {
  app.get('/api/transactions',  controller.getAll);
  app.post('/api/transactions',  controller.create);
  app.put('/api/transactions/:id',  controller.update);
  app.delete('/api/transactions/:id',  controller.delete);
};
