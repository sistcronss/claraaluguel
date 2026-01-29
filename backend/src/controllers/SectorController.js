const SectorService = require('../services/SectorService');
const ApiResponse = require('../utils/apiResponse');

class SectorController {
  static async create(req, res, next) {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json(ApiResponse.error('Nome obrigatório', 400));
      }

      const result = await SectorService.createSector({ name, description });

      return res.status(201).json(
        ApiResponse.success(result, 'Setor criado com sucesso', 201)
      );
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;

      const result = await SectorService.getSectorById(id);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const result = await SectorService.getAllSectors();

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const result = await SectorService.updateSector(id, { name, description });

      return res.status(200).json(
        ApiResponse.success(result, 'Setor atualizado com sucesso')
      );
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      await SectorService.deleteSector(id);

      return res.status(200).json(ApiResponse.success(null, 'Setor deletado com sucesso'));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SectorController;
