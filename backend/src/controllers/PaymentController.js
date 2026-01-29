const PaymentService = require('../services/PaymentService');
const ApiResponse = require('../utils/apiResponse');

class PaymentController {
  static async create(req, res, next) {
    try {
      const { customerId, reservationId, saleId, totalAmount, downPayment, paymentMethod, installments } = req.body;

      if (!totalAmount || !paymentMethod) {
        return res.status(400).json(
          ApiResponse.error('Valor total e forma de pagamento obrigatórios', 400)
        );
      }

      const result = await PaymentService.createPayment({
        customerId,
        reservationId,
        saleId,
        totalAmount,
        downPayment: downPayment || 0,
        paymentMethod,
        installments: installments || 1
      });

      return res.status(201).json(
        ApiResponse.success(result, 'Pagamento criado com sucesso', 201)
      );
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;

      const result = await PaymentService.getPaymentById(id);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { status, customerId, reservationId } = req.query;

      const filters = {};
      if (status) filters.status = status;
      if (customerId) filters.customerId = customerId;
      if (reservationId) filters.reservationId = reservationId;

      const result = await PaymentService.getAllPayments(filters);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { totalAmount, downPayment, paymentMethod, installments } = req.body;

      const result = await PaymentService.updatePayment(id, {
        totalAmount, downPayment, paymentMethod, installments
      });

      return res.status(200).json(
        ApiResponse.success(result, 'Pagamento atualizado com sucesso')
      );
    } catch (error) {
      next(error);
    }
  }

  static async recordPayment(req, res, next) {
    try {
      const { id } = req.params;
      const { amount } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json(
          ApiResponse.error('Valor de pagamento obrigatório e deve ser maior que zero', 400)
        );
      }

      const result = await PaymentService.recordPayment(id, amount);

      return res.status(200).json(
        ApiResponse.success(result, 'Pagamento registrado com sucesso')
      );
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      await PaymentService.deletePayment(id);

      return res.status(200).json(ApiResponse.success(null, 'Pagamento deletado com sucesso'));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PaymentController;
