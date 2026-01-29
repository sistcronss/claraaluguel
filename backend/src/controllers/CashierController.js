const CashierService = require('../services/CashierService');
const ApiResponse = require('../utils/apiResponse');

class CashierController {
  static async open(req, res, next) {
    try {
      const { initialAmount } = req.body;

      const result = await CashierService.openCashier(initialAmount || 0);

      return res.status(201).json(
        ApiResponse.success(result, 'Caixa aberto com sucesso', 201)
      );
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;

      const result = await CashierService.getCashierById(id);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getTodayOpen(req, res, next) {
    try {
      const result = await CashierService.getTodayOpen();

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const result = await CashierService.getAllCashiers();

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getByDate(req, res, next) {
    try {
      const { date } = req.params;

      const result = await CashierService.getCashierByDate(date);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async addRentalIncome(req, res, next) {
    try {
      const { id } = req.params;
      const { amount } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json(ApiResponse.error('Valor deve ser maior que zero', 400));
      }

      const result = await CashierService.addRentalIncome(id, Number(amount));

      return res.status(200).json(
        ApiResponse.success(result, 'Entrada de aluguel registrada com sucesso')
      );
    } catch (error) {
      next(error);
    }
  }

  static async addSaleIncome(req, res, next) {
    try {
      const { id } = req.params;
      const { amount } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json(ApiResponse.error('Valor deve ser maior que zero', 400));
      }

      const result = await CashierService.addSaleIncome(id, Number(amount));

      return res.status(200).json(
        ApiResponse.success(result, 'Entrada de venda registrada com sucesso')
      );
    } catch (error) {
      next(error);
    }
  }

  static async addExpense(req, res, next) {
    try {
      const { id } = req.params;
      const { type, amount } = req.body;

      if (!type || !amount || amount <= 0) {
        return res.status(400).json(
          ApiResponse.error('Tipo e valor de despesa obrigatórios', 400)
        );
      }

      const result = await CashierService.addExpense(id, type, Number(amount));

      return res.status(200).json(
        ApiResponse.success(result, 'Despesa registrada com sucesso')
      );
    } catch (error) {
      next(error);
    }
  }

  static async close(req, res, next) {
    try {
      const { id } = req.params;

      const result = await CashierService.closeCashier(id);

      return res.status(200).json(
        ApiResponse.success(result, 'Caixa fechado com sucesso')
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CashierController;
