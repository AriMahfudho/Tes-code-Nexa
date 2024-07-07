const { authJwt } = require('../middleware/auth');
const controller = require('../controller/customer.controller');

// module.exports = function(app) {
//   app.get('/api/customers', [authJwt.verifyToken], controller.getAll);
//   app.post('/api/customers', [authJwt.verifyToken], controller.create);
//   app.put('/api/customers/:id', [authJwt.verifyToken], controller.update);
//   app.delete('/api/customers/:id', [authJwt.verifyToken], controller.delete);
// };

module.exports = function(app) {
  app.get('/api/customers',  controller.getAll);
  app.post('/api/customers', controller.create);
  app.put('/api/customers/:id',  controller.update);
  app.delete('/api/customers/:id',  controller.delete);
};
