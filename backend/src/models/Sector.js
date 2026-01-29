'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sector = sequelize.define('Sector', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
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
    tableName: 'sectors',
    timestamps: true
  });

  Sector.associate = (models) => {
    Sector.hasMany(models.Piece, { foreignKey: 'sectorId', as: 'pieces' });
    Sector.hasMany(models.Reservation, { foreignKey: 'sectorId', as: 'reservations' });
  };

  return Sector;
};
