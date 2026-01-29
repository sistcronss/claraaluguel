'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      customerId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'customers',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      reservationId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'reservations',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      totalAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      downPayment: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      },
      remainingAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      paymentMethod: {
        type: Sequelize.ENUM('cash', 'pix', 'credit', 'debit'),
        allowNull: false
      },
      installments: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      status: {
        type: Sequelize.ENUM('open', 'partial', 'paid'),
        defaultValue: 'open',
        allowNull: false
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
    await queryInterface.dropTable('payments');
  }
};
