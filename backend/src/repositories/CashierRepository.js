const { Cashier } = require('../models');
const { Op } = require('sequelize');

class CashierRepository {
  static async create(cashierData) {
    return Cashier.create(cashierData);
  }

  static async findById(id) {
    return Cashier.findByPk(id);
  }

  static async findAll() {
    return Cashier.findAll();
  }

  static async findTodayOpen() {
    const today = new Date().toISOString().split('T')[0];
    return Cashier.findOne({
      where: {
        openingDate: today,
        isClosed: false
      }
    });
  }

  static async findByDate(date) {
    return Cashier.findOne({
      where: { openingDate: date }
    });
  }

  static async update(id, data) {
    return Cashier.update(data, { where: { id }, returning: true });
  }

  static async delete(id) {
    return Cashier.destroy({ where: { id } });
  }
}

module.exports = CashierRepository;
