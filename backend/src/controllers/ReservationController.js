const ReservationService = require('../services/ReservationService');
const ApiResponse = require('../utils/apiResponse');

class ReservationController {
  static async create(req, res, next) {
    try {
      const { customerId, pieceId, sectorId, withdrawalDate, returnDate, observations } = req.body;
      const employeeId = req.userId;

      if (!customerId || !pieceId || !sectorId || !withdrawalDate || !returnDate) {
        return res.status(400).json(
          ApiResponse.error('Cliente, peça, setor, data de retirada e devolução obrigatórios', 400)
        );
      }

      const result = await ReservationService.createReservation({
        customerId,
        employeeId,
        pieceId,
        sectorId,
        reservationDate: new Date().toISOString().split('T')[0],
        withdrawalDate,
        returnDate,
        observations,
        status: 'pending'
      });

      return res.status(201).json(
        ApiResponse.success(result, 'Reserva criada com sucesso', 201)
      );
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;

      const result = await ReservationService.getReservationById(id);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { status, customerId, sectorId } = req.query;

      const filters = {};
      if (status) filters.status = status;
      if (customerId) filters.customerId = customerId;
      if (sectorId) filters.sectorId = sectorId;

      const result = await ReservationService.getAllReservations(filters);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { withdrawalDate, returnDate, observations } = req.body;

      const result = await ReservationService.updateReservation(id, {
        withdrawalDate, returnDate, observations
      });

      return res.status(200).json(
        ApiResponse.success(result, 'Reserva atualizada com sucesso')
      );
    } catch (error) {
      next(error);
    }
  }

  static async cancel(req, res, next) {
    try {
      const { id } = req.params;

      await ReservationService.cancelReservation(id);

      return res.status(200).json(ApiResponse.success(null, 'Reserva cancelada com sucesso'));
    } catch (error) {
      next(error);
    }
  }

  static async complete(req, res, next) {
    try {
      const { id } = req.params;

      await ReservationService.completeReservation(id);

      return res.status(200).json(ApiResponse.success(null, 'Reserva concluída com sucesso'));
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      await ReservationService.deleteReservation(id);

      return res.status(200).json(ApiResponse.success(null, 'Reserva deletada com sucesso'));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReservationController;
