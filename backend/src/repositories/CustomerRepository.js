const { Customer, Reservation, Sale } = require('../models');

class CustomerRepository {
  static async create(customerData) {
    return Customer.create(customerData);
  }

  static async findById(id) {
    return Customer.findByPk(id, {
      include: [
        { model: Reservation, as: 'reservations' },
        { model: Sale, as: 'sales' }
      ]
    });
  }

  static async findAll() {
    return Customer.findAll({
      include: [
        { model: Reservation, as: 'reservations' },
        { model: Sale, as: 'sales' }
      ]
    });
  }

  static async findByCPF(cpf) {
    return Customer.findOne({ where: { cpf } });
  }

  static async update(id, data) {
    return Customer.update(data, { where: { id }, returning: true });
  }

  static async delete(id) {
    return Customer.destroy({ where: { id } });
  }
}

module.exports = CustomerRepository;
