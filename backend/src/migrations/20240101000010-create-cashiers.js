'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cashiers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      openingDate: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      closingDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      initialAmount: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      },
      rentalIncome: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      },
      saleIncome: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      },
      maintenanceExpense: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      },
      purchaseExpense: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      },
      finalAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      isClosed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('cashiers');
  }
};
