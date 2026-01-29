'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('payments', 'saleId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'sales',
        key: 'id'
      },
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('payments', 'saleId');
  }
};
