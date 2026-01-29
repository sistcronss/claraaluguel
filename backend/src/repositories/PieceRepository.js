const { Piece, Sector } = require('../models');

class PieceRepository {
  static async create(pieceData) {
    return Piece.create(pieceData);
  }

  static async findById(id) {
    return Piece.findByPk(id, {
      include: [{ model: Sector, as: 'sector' }]
    });
  }

  static async findByCode(code) {
    return Piece.findOne({
      where: { code },
      include: [{ model: Sector, as: 'sector' }]
    });
  }

  static async findAll(filters = {}) {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.sectorId) where.sectorId = filters.sectorId;
    if (filters.category) where.category = filters.category;

    return Piece.findAll({
      where,
      include: [{ model: Sector, as: 'sector' }]
    });
  }

  static async findBySector(sectorId) {
    return Piece.findAll({
      where: { sectorId },
      include: [{ model: Sector, as: 'sector' }]
    });
  }

  static async update(id, data) {
    return Piece.update(data, { where: { id }, returning: true });
  }

  static async delete(id) {
    return Piece.destroy({ where: { id } });
  }

  static async countByStatus(status) {
    return Piece.count({ where: { status } });
  }
}

module.exports = PieceRepository;
