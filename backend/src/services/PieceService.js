const PieceRepository = require('../repositories/PieceRepository');

class PieceService {
  static async createPiece(pieceData) {
    const existing = await PieceRepository.findByCode(pieceData.code);
    
    if (existing) {
      throw new Error('Código de peça já existe');
    }

    return PieceRepository.create(pieceData);
  }

  static async getPieceById(id) {
    const piece = await PieceRepository.findById(id);
    
    if (!piece) {
      throw new Error('Peça não encontrada');
    }

    return piece;
  }

  static async getPieceByCode(code) {
    const piece = await PieceRepository.findByCode(code);
    
    if (!piece) {
      throw new Error('Peça não encontrada');
    }

    return piece;
  }

  static async getAllPieces(filters = {}) {
    return PieceRepository.findAll(filters);
  }

  static async getPiecesBySector(sectorId) {
    return PieceRepository.findBySector(sectorId);
  }

  static async updatePiece(id, data) {
    const piece = await PieceRepository.findById(id);
    
    if (!piece) {
      throw new Error('Peça não encontrada');
    }

    // Se mudar código, validar unicidade
    if (data.code && data.code !== piece.code) {
      const existing = await PieceRepository.findByCode(data.code);
      if (existing) {
        throw new Error('Código de peça já existe');
      }
    }

    const [, updated] = await PieceRepository.update(id, data);
    return updated[0];
  }

  static async updatePieceStatus(id, status) {
    const piece = await PieceRepository.findById(id);
    
    if (!piece) {
      throw new Error('Peça não encontrada');
    }

    const validStatuses = ['available', 'rented', 'maintenance', 'for_sale'];
    if (!validStatuses.includes(status)) {
      throw new Error('Status inválido');
    }

    const [, updated] = await PieceRepository.update(id, { status });
    return updated[0];
  }

  static async deletePiece(id) {
    const piece = await PieceRepository.findById(id);
    
    if (!piece) {
      throw new Error('Peça não encontrado');
    }

    await PieceRepository.delete(id);
  }

  static async getStockStatus() {
    const available = await PieceRepository.countByStatus('available');
    const rented = await PieceRepository.countByStatus('rented');
    const maintenance = await PieceRepository.countByStatus('maintenance');
    const forSale = await PieceRepository.countByStatus('for_sale');

    return {
      available,
      rented,
      maintenance,
      forSale,
      total: available + rented + maintenance + forSale
    };
  }
}

module.exports = PieceService;
