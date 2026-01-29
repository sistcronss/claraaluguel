const SectorRepository = require('../repositories/SectorRepository');

class SectorService {
  static async createSector(sectorData) {
    const existing = await SectorRepository.findByName(sectorData.name);
    
    if (existing) {
      throw new Error('Setor já existe');
    }

    return SectorRepository.create(sectorData);
  }

  static async getSectorById(id) {
    const sector = await SectorRepository.findById(id);
    
    if (!sector) {
      throw new Error('Setor não encontrado');
    }

    return sector;
  }

  static async getAllSectors() {
    return SectorRepository.findAll();
  }

  static async updateSector(id, data) {
    const sector = await SectorRepository.findById(id);
    
    if (!sector) {
      throw new Error('Setor não encontrado');
    }

    if (data.name && data.name !== sector.name) {
      const existing = await SectorRepository.findByName(data.name);
      if (existing) {
        throw new Error('Setor já existe');
      }
    }

    const [, updated] = await SectorRepository.update(id, data);
    return updated[0];
  }

  static async deleteSector(id) {
    const sector = await SectorRepository.findById(id);
    
    if (!sector) {
      throw new Error('Setor não encontrado');
    }

    await SectorRepository.delete(id);
  }
}

module.exports = SectorService;
