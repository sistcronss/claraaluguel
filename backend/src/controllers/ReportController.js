const ReportService = require('../services/ReportService');
const ApiResponse = require('../utils/apiResponse');

class ReportController {
  static async getMonthlyRevenue(req, res, next) {
    try {
      const { month, year } = req.params;

      const result = await ReportService.getMonthlyRevenue(Number(month), Number(year));

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getReservationsByPeriod(req, res, next) {
    try {
      const { startDate, endDate } = req.query;

      const result = await ReportService.getReservationsByPeriod(startDate, endDate);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getMostRentedPieces(req, res, next) {
    try {
      const { limit } = req.query;

      const result = await ReportService.getMostRentedPieces(limit ? Number(limit) : 10);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getSoldPieces(req, res, next) {
    try {
      const result = await ReportService.getSoldPieces();

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getMostFrequentCustomers(req, res, next) {
    try {
      const { limit } = req.query;

      const result = await ReportService.getMostFrequentCustomers(limit ? Number(limit) : 10);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getPendingPayments(req, res, next) {
    try {
      const result = await ReportService.getPendingPayments();

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getStockReport(req, res, next) {
    try {
      const result = await ReportService.getStockReport();

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReportController;
