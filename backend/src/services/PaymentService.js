const PaymentRepository = require('../repositories/PaymentRepository');
const ReservationRepository = require('../repositories/ReservationRepository');

class PaymentService {
  static async createPayment(paymentData) {
    // Validar dados
    if (paymentData.totalAmount <= 0) {
      throw new Error('Valor total deve ser maior que zero');
    }

    if (paymentData.downPayment > paymentData.totalAmount) {
      throw new Error('Entrada não pode ser maior que o valor total');
    }

    // Se houver reserva, validar
    if (paymentData.reservationId) {
      const reservation = await ReservationRepository.findById(paymentData.reservationId);
      if (!reservation) {
        throw new Error('Reserva não encontrada');
      }
    }

    const remainingAmount = paymentData.totalAmount - (paymentData.downPayment || 0);
    const status = remainingAmount === 0 ? 'paid' : (paymentData.downPayment > 0 ? 'partial' : 'open');

    return PaymentRepository.create({
      ...paymentData,
      remainingAmount,
      status
    });
  }

  static async getPaymentById(id) {
    const payment = await PaymentRepository.findById(id);
    
    if (!payment) {
      throw new Error('Pagamento não encontrado');
    }

    return payment;
  }

  static async getAllPayments(filters = {}) {
    return PaymentRepository.findAll(filters);
  }

  static async updatePayment(id, data) {
    const payment = await PaymentRepository.findById(id);
    
    if (!payment) {
      throw new Error('Pagamento não encontrado');
    }

    const totalAmount = data.totalAmount || payment.totalAmount;
    const downPayment = data.downPayment || payment.downPayment;
    const remainingAmount = totalAmount - downPayment;
    
    if (remainingAmount < 0) {
      throw new Error('Entrada não pode ser maior que o valor total');
    }

    const status = remainingAmount === 0 ? 'paid' : (downPayment > 0 ? 'partial' : 'open');

    const updateData = {
      ...data,
      remainingAmount,
      status
    };

    const [, updated] = await PaymentRepository.update(id, updateData);
    return updated[0];
  }

  static async recordPayment(id, amount) {
    const payment = await PaymentRepository.findById(id);
    
    if (!payment) {
      throw new Error('Pagamento não encontrado');
    }

    if (payment.status === 'paid') {
      throw new Error('Pagamento já foi quitado');
    }

    const newRemaining = payment.remainingAmount - amount;
    
    if (newRemaining < 0) {
      throw new Error('Valor de pagamento não pode ser superior ao saldo devedor');
    }

    const newStatus = newRemaining === 0 ? 'paid' : 'partial';

    const [, updated] = await PaymentRepository.update(id, {
      remainingAmount: newRemaining,
      status: newStatus
    });

    return updated[0];
  }

  static async deletePayment(id) {
    const payment = await PaymentRepository.findById(id);
    
    if (!payment) {
      throw new Error('Pagamento não encontrado');
    }

    if (payment.status === 'paid') {
      throw new Error('Não é possível deletar pagamento quitado');
    }

    await PaymentRepository.delete(id);
  }
}

module.exports = PaymentService;
