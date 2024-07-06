module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('ms_customer', {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      freezeTableName: true,
    });
  
    return Customer;
  };
  