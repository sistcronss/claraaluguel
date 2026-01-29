'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    pieceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'pieces',
        key: 'id'
      }
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    salePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.ENUM('cash', 'pix', 'credit', 'debit'),
      allowNull: false
    },
    saleDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
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
    tableName: 'sales',
    timestamps: true
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.Piece, { foreignKey: 'pieceId', as: 'piece' });
    Sale.belongsTo(models.Customer, { foreignKey: 'customerId', as: 'customer' });
    Sale.hasMany(models.Payment, { foreignKey: 'saleId', as: 'payments' });
  };

  return Sale;
};
