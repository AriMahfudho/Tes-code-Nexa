module.exports = (sequelize, DataTypes) => {
    const TransactionD = sequelize.define('transaksi_d', {
      id_barang: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nama_barang: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    }, {
      freezeTableName: true,
    });
  
    return TransactionD;
  };
  