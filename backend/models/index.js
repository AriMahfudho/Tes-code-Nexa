const Sequelize = require('sequelize');
const sequelize = new Sequelize('penjualan', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.customer = require('./customer.model')(sequelize, Sequelize);
db.transactionH = require('./transactionH.model')(sequelize, Sequelize);
db.transactionD = require('./transactionD.model')(sequelize, Sequelize);
db.counter = require('./counter.model')(sequelize, Sequelize);

// Define associations
db.customer.hasMany(db.transactionH, { foreignKey: 'id_customer' });
db.transactionH.belongsTo(db.customer, { foreignKey: 'id_customer' });

db.transactionH.hasMany(db.transactionD, { foreignKey: 'id_transaksi_h' });
db.transactionD.belongsTo(db.transactionH, { foreignKey: 'id_transaksi_h' });

module.exports = db;
