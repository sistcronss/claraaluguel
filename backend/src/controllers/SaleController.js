const SaleService = require('../services/SaleService');
const ApiResponse = require('../utils/apiResponse');

class SaleController {
  static async create(req, res, next) {
    try {
      const { pieceId, customerId, salePrice, paymentMethod, saleDate } = req.body;

      if (!pieceId || !salePrice || !paymentMethod) {
        return res.status(400).json(
          ApiResponse.error('Peça, preço de venda e forma de pagamento obrigatórios', 400)
        );
      }

      const result = await SaleService.createSale({
        pieceId,
        customerId: customerId || null,
        salePrice,
        paymentMethod,
        saleDate: saleDate || new Date().toISOString().split('T')[0]
      });

      return res.status(201).json(
        ApiResponse.success(result, 'Venda criada com sucesso', 201)
      );
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;

      const result = await SaleService.getSaleById(id);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { customerId } = req.query;

      const filters = {};
      if (customerId) filters.customerId = customerId;

      const result = await SaleService.getAllSales(filters);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { paymentMethod, salePrice } = req.body;

      const result = await SaleService.updateSale(id, { paymentMethod, salePrice });

      return res.status(200).json(
        ApiResponse.success(result, 'Venda atualizada com sucesso')
      );
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      await SaleService.deleteSale(id);

      return res.status(200).json(ApiResponse.success(null, 'Venda deletada com sucesso'));
    } catch (error) {
      next(error);
    }
  }

  static async getByCustomer(req, res, next) {
    try {
      const { customerId } = req.params;

      const result = await SaleService.getSalesByCustomer(customerId);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SaleController;
