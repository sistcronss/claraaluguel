const { Reservation, Piece, Customer, User, Sector } = require('../models');
const { Op } = require('sequelize');

class ReservationRepository {
  static async create(reservationData) {
    return Reservation.create(reservationData);
  }

  static async findById(id) {
    return Reservation.findByPk(id, {
      include: [
        { model: Customer, as: 'customer' },
        { model: User, as: 'employee', attributes: ['id', 'login'] },
        { model: Piece, as: 'piece' },
        { model: Sector, as: 'sector' }
      ]
    });
  }

  static async findAll(filters = {}) {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.customerId) where.customerId = filters.customerId;
    if (filters.sectorId) where.sectorId = filters.sectorId;

    return Reservation.findAll({
      where,
      include: [
        { model: Customer, as: 'customer' },
        { model: User, as: 'employee', attributes: ['id', 'login'] },
        { model: Piece, as: 'piece' },
        { model: Sector, as: 'sector' }
      ]
    });
  }

  static async checkConflict(pieceId, withdrawalDate, returnDate, excludeId = null) {
    const where = {
      pieceId,
      status: { [Op.ne]: 'cancelled' },
      withdrawalDate: { [Op.lte]: returnDate },
      returnDate: { [Op.gte]: withdrawalDate }
    };

    if (excludeId) {
      where.id = { [Op.ne]: excludeId };
    }

    return Reservation.findOne({ where });
  }

  static async findByPiece(pieceId) {
    return Reservation.findAll({
      where: { pieceId, status: { [Op.ne]: 'cancelled' } }
    });
  }

  static async update(id, data) {
    return Reservation.update(data, { where: { id }, returning: true });
  }

  static async delete(id) {
    return Reservation.destroy({ where: { id } });
  }
}

module.exports = ReservationRepository;
