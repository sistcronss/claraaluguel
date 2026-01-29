const SaleRepository = require('../repositories/SaleRepository');
const PieceRepository = require('../repositories/PieceRepository');

class SaleService {
  static async createSale(saleData) {
    // Validar peça
    const piece = await PieceRepository.findById(saleData.pieceId);
    
    if (!piece) {
      throw new Error('Peça não encontrada');
    }

    if (piece.status !== 'for_sale') {
      throw new Error('Peça deve estar marcada como "À venda"');
    }

    // Criar venda
    const sale = await SaleRepository.create(saleData);

    // Remover peça do estoque (não mostrar mais)
    await PieceRepository.delete(saleData.pieceId);

    return sale;
  }

  static async getSaleById(id) {
    const sale = await SaleRepository.findById(id);
    
    if (!sale) {
      throw new Error('Venda não encontrada');
    }

    return sale;
  }

  static async getAllSales(filters = {}) {
    return SaleRepository.findAll(filters);
  }

  static async updateSale(id, data) {
    const sale = await SaleRepository.findById(id);
    
    if (!sale) {
      throw new Error('Venda não encontrada');
    }

    const [, updated] = await SaleRepository.update(id, data);
    return updated[0];
  }

  static async deleteSale(id) {
    const sale = await SaleRepository.findById(id);
    
    if (!sale) {
      throw new Error('Venda não encontrada');
    }

    await SaleRepository.delete(id);
  }

  static async getSalesByCustomer(customerId) {
    return SaleRepository.findAll({ customerId });
  }
}

module.exports = SaleService;
