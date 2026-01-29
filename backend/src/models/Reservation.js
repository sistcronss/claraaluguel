'use strict';

module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    pieceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'pieces',
        key: 'id'
      }
    },
    sectorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'sectors',
        key: 'id'
      }
    },
    reservationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    withdrawalDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    returnDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
      defaultValue: 'pending',
      allowNull: false
    },
    observations: {
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
    tableName: 'reservations',
    timestamps: true
  });

  Reservation.associate = (models) => {
    Reservation.belongsTo(models.Customer, { foreignKey: 'customerId', as: 'customer' });
    Reservation.belongsTo(models.User, { foreignKey: 'employeeId', as: 'employee' });
    Reservation.belongsTo(models.Piece, { foreignKey: 'pieceId', as: 'piece' });
    Reservation.belongsTo(models.Sector, { foreignKey: 'sectorId', as: 'sector' });
    Reservation.hasMany(models.Payment, { foreignKey: 'reservationId', as: 'payments' });
  };

  return Reservation;
};
