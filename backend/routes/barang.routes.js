const controller = require('../controller/barang.controller');

module.exports = function(app) {
    app.get('/api/barang',  controller.getAll);
    app.post('/api/barang', controller.create);
    app.put('/api/barang/:id',  controller.update);
    app.delete('/api/barang/:id',  controller.delete);
  };