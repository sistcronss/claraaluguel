'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pieces', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false
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
      category: {
        type: Sequelize.ENUM('clothing', 'bag', 'accessory'),
        allowNull: false
      },
      size: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      color: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      rentalPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('available', 'rented', 'maintenance', 'for_sale'),
        defaultValue: 'available',
        allowNull: false
      },
      salePrice: {
        type: Sequelize.DECIMAL(10, 2),
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
    await queryInterface.dropTable('pieces');
  }
};
