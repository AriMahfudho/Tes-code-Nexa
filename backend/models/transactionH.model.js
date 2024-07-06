module.exports = (sequelize, DataTypes) => {
  const TransactionH = sequelize.define('transaksi_h', {
    nomor_transaksi: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    tanggal_transaksi: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_transaksi: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    freezeTableName: true,
  });

  return TransactionH;
};
