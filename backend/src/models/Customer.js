'use strict';

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING(14),
      unique: true,
      allowNull: true
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cep: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'customers',
    timestamps: true
  });

  Customer.associate = (models) => {
    Customer.hasMany(models.Reservation, { foreignKey: 'customerId', as: 'reservations' });
    Customer.hasMany(models.Sale, { foreignKey: 'customerId', as: 'sales' });
    Customer.hasMany(models.Payment, { foreignKey: 'customerId', as: 'payments' });
  };

  return Customer;
};
