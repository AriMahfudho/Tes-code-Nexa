module.exports = (sequelize, DataTypes) => {
  const Counter = sequelize.define('counter', {
    bulan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tahun: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
  });

  return Counter;
};
