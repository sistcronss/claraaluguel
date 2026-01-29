const { Sale, Piece, Customer, Payment } = require('../models');

class SaleRepository {
  static async create(saleData) {
    return Sale.create(saleData);
  }

  static async findById(id) {
    return Sale.findByPk(id, {
      include: [
        { model: Piece, as: 'piece' },
        { model: Customer, as: 'customer' },
        { model: Payment, as: 'payments' }
      ]
    });
  }

  static async findAll(filters = {}) {
    const where = {};
    if (filters.customerId) where.customerId = filters.customerId;

    return Sale.findAll({
      where,
      include: [
        { model: Piece, as: 'piece' },
        { model: Customer, as: 'customer' }
      ]
    });
  }

  static async findByPiece(pieceId) {
    return Sale.findAll({
      where: { pieceId },
      include: [{ model: Piece, as: 'piece' }]
    });
  }

  static async update(id, data) {
    return Sale.update(data, { where: { id }, returning: true });
  }

  static async delete(id) {
    return Sale.destroy({ where: { id } });
  }
}

module.exports = SaleRepository;
