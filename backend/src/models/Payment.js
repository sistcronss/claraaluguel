'use strict';

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    reservationId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'reservations',
        key: 'id'
      }
    },
    saleId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'sales',
        key: 'id'
      }
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    downPayment: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    remainingAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.ENUM('cash', 'pix', 'credit', 'debit'),
      allowNull: false
    },
    installments: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    status: {
      type: DataTypes.ENUM('open', 'partial', 'paid'),
      defaultValue: 'open',
      allowNull: false
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
    tableName: 'payments',
    timestamps: true
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Customer, { foreignKey: 'customerId', as: 'customer' });
    Payment.belongsTo(models.Reservation, { foreignKey: 'reservationId', as: 'reservation' });
    Payment.belongsTo(models.Sale, { foreignKey: 'saleId', as: 'sale' });
  };

  return Payment;
};
