'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cashier = sequelize.define('Cashier', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    openingDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    closingDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    initialAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    rentalIncome: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    saleIncome: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    maintenanceExpense: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    purchaseExpense: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    finalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    isClosed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    tableName: 'cashiers',
    timestamps: true
  });

  return Cashier;
};
