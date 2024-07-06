const { authJwt } = require('../middleware/auth');
const controller = require('../controller/auth.controller');

module.exports = function(app) {
  app.post('/api/auth/register', controller.register);
  app.post('/api/auth/login', controller.login);
};
