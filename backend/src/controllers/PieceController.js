const PieceService = require('../services/PieceService');
const ApiResponse = require('../utils/apiResponse');

class PieceController {
  static async create(req, res, next) {
    try {
      const { code, description, sectorId, category, size, color, rentalPrice, salePrice } = req.body;

      if (!code || !description || !sectorId || !category || !rentalPrice) {
        return res.status(400).json(
          ApiResponse.error('Código, descrição, setor, categoria e preço de aluguel obrigatórios', 400)
        );
      }

      const result = await PieceService.createPiece({
        code, description, sectorId, category, size, color, rentalPrice, salePrice
      });

      return res.status(201).json(
        ApiResponse.success(result, 'Peça criada com sucesso', 201)
      );
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;

      const result = await PieceService.getPieceById(id);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getByCode(req, res, next) {
    try {
      const { code } = req.params;

      const result = await PieceService.getPieceByCode(code);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { status, sectorId, category } = req.query;

      const filters = {};
      if (status) filters.status = status;
      if (sectorId) filters.sectorId = sectorId;
      if (category) filters.category = category;

      const result = await PieceService.getAllPieces(filters);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getBySector(req, res, next) {
    try {
      const { sectorId } = req.params;

      const result = await PieceService.getPiecesBySector(sectorId);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { code, description, category, size, color, rentalPrice, salePrice, status } = req.body;

      const result = await PieceService.updatePiece(id, {
        code, description, category, size, color, rentalPrice, salePrice, status
      });

      return res.status(200).json(
        ApiResponse.success(result, 'Peça atualizada com sucesso')
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const result = await PieceService.updatePieceStatus(id, status);

      return res.status(200).json(
        ApiResponse.success(result, 'Status da peça atualizado com sucesso')
      );
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      await PieceService.deletePiece(id);

      return res.status(200).json(ApiResponse.success(null, 'Peça deletada com sucesso'));
    } catch (error) {
      next(error);
    }
  }

  static async getStockStatus(req, res, next) {
    try {
      const result = await PieceService.getStockStatus();

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PieceController;
