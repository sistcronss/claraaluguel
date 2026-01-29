const { Sector } = require('../models');

class SectorRepository {
  static async create(sectorData) {
    return Sector.create(sectorData);
  }

  static async findById(id) {
    return Sector.findByPk(id);
  }

  static async findAll() {
    return Sector.findAll();
  }

  static async findByName(name) {
    return Sector.findOne({ where: { name } });
  }

  static async update(id, data) {
    return Sector.update(data, { where: { id }, returning: true });
  }

  static async delete(id) {
    return Sector.destroy({ where: { id } });
  }
}

module.exports = SectorRepository;
