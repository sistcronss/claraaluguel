const { Op } = require('sequelize');
const ReservationRepository = require('../repositories/ReservationRepository');
const SaleRepository = require('../repositories/SaleRepository');
const PaymentRepository = require('../repositories/PaymentRepository');
const CustomerRepository = require('../repositories/CustomerRepository');
const PieceRepository = require('../repositories/PieceRepository');

class ReportService {
  static async getMonthlyRevenue(month, year) {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];

    const reservations = await ReservationRepository.findAll();
    const sales = await SaleRepository.findAll();

    let rentalRevenue = 0;
    let saleRevenue = 0;

    // Calcular receita de aluguéis (pelo status de pagamento)
    for (const reservation of reservations) {
      const payments = await PaymentRepository.findByReservation(reservation.id);
      for (const payment of payments) {
        if (payment.createdAt >= startDate && payment.createdAt <= endDate) {
          rentalRevenue += Number(payment.downPayment || 0);
        }
      }
    }

    // Calcular receita de vendas
    for (const sale of sales) {
      if (sale.saleDate >= startDate && sale.saleDate <= endDate) {
        saleRevenue += Number(sale.salePrice || 0);
      }
    }

    return {
      month,
      year,
      rentalRevenue,
      saleRevenue,
      totalRevenue: rentalRevenue + saleRevenue
    };
  }

  static async getReservationsByPeriod(startDate, endDate) {
    const reservations = await ReservationRepository.findAll();

    return reservations.filter(r => 
      r.withdrawalDate >= startDate && r.returnDate <= endDate
    );
  }

  static async getMostRentedPieces(limit = 10) {
    const reservations = await ReservationRepository.findAll();
    const pieces = {};

    for (const reservation of reservations) {
      if (reservation.status === 'completed' || reservation.status === 'confirmed') {
        if (!pieces[reservation.pieceId]) {
          pieces[reservation.pieceId] = {
            pieceId: reservation.pieceId,
            piece: reservation.piece,
            count: 0
          };
        }
        pieces[reservation.pieceId].count++;
      }
    }

    return Object.values(pieces)
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  static async getSoldPieces() {
    return SaleRepository.findAll();
  }

  static async getMostFrequentCustomers(limit = 10) {
    const customers = await CustomerRepository.findAll();
    
    const customerStats = customers.map(c => ({
      customerId: c.id,
      name: c.name,
      phone: c.phone,
      totalReservations: c.reservations ? c.reservations.length : 0,
      totalPurchases: c.sales ? c.sales.length : 0,
      totalTransactions: (c.reservations ? c.reservations.length : 0) + (c.sales ? c.sales.length : 0)
    }));

    return customerStats
      .filter(c => c.totalTransactions > 0)
      .sort((a, b) => b.totalTransactions - a.totalTransactions)
      .slice(0, limit);
  }

  static async getPendingPayments() {
    const payments = await PaymentRepository.findAll({ status: ['open', 'partial'] });
    return payments;
  }

  static async getStockReport() {
    const pieces = await PieceRepository.findAll();

    const report = {
      available: pieces.filter(p => p.status === 'available').length,
      rented: pieces.filter(p => p.status === 'rented').length,
      maintenance: pieces.filter(p => p.status === 'maintenance').length,
      forSale: pieces.filter(p => p.status === 'for_sale').length,
      total: pieces.length
    };

    return report;
  }
}

module.exports = ReportService;
