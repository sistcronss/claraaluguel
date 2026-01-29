'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reservations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      customerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      employeeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'RESTRICT'
      },
      pieceId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'pieces',
          key: 'id'
        },
        onDelete: 'RESTRICT'
      },
      sectorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sectors',
          key: 'id'
        },
        onDelete: 'RESTRICT'
      },
      reservationDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      withdrawalDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      returnDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
        defaultValue: 'pending',
        allowNull: false
      },
      observations: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('reservations');
  }
};
