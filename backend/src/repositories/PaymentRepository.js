const { Payment, Reservation, Sale, Customer } = require('../models');

class PaymentRepository {
  static async create(paymentData) {
    return Payment.create(paymentData);
  }

  static async findById(id) {
    return Payment.findByPk(id, {
      include: [
        { model: Customer, as: 'customer' },
        { model: Reservation, as: 'reservation' },
        { model: Sale, as: 'sale' }
      ]
    });
  }

  static async findAll(filters = {}) {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.customerId) where.customerId = filters.customerId;
    if (filters.reservationId) where.reservationId = filters.reservationId;

    return Payment.findAll({
      where,
      include: [
        { model: Customer, as: 'customer' },
        { model: Reservation, as: 'reservation' },
        { model: Sale, as: 'sale' }
      ]
    });
  }

  static async findByReservation(reservationId) {
    return Payment.findAll({
      where: { reservationId },
      include: [{ model: Reservation, as: 'reservation' }]
    });
  }

  static async update(id, data) {
    return Payment.update(data, { where: { id }, returning: true });
  }

  static async delete(id) {
    return Payment.destroy({ where: { id } });
  }
}

module.exports = PaymentRepository;
