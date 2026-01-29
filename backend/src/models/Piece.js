'use strict';

module.exports = (sequelize, DataTypes) => {
  const Piece = sequelize.define('Piece', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    sectorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'sectors',
        key: 'id'
      }
    },
    category: {
      type: DataTypes.ENUM('clothing', 'bag', 'accessory'),
      allowNull: false
    },
    size: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rentalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('available', 'rented', 'maintenance', 'for_sale'),
      defaultValue: 'available',
      allowNull: false
    },
    salePrice: {
      type: DataTypes.DECIMAL(10, 2),
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
    tableName: 'pieces',
    timestamps: true
  });

  Piece.associate = (models) => {
    Piece.belongsTo(models.Sector, { foreignKey: 'sectorId', as: 'sector' });
    Piece.hasMany(models.Reservation, { foreignKey: 'pieceId', as: 'reservations' });
    Piece.hasMany(models.Sale, { foreignKey: 'pieceId', as: 'sales' });
  };

  return Piece;
};
