const CashierRepository = require('../repositories/CashierRepository');

class CashierService {
  static async openCashier(initialAmount = 0) {
    // Verificar se já existe caixa aberto hoje
    const todayOpen = await CashierRepository.findTodayOpen();
    
    if (todayOpen) {
      throw new Error('Caixa já está aberto para hoje');
    }

    return CashierRepository.create({
      initialAmount,
      isClosed: false
    });
  }

  static async getCashierById(id) {
    const cashier = await CashierRepository.findById(id);
    
    if (!cashier) {
      throw new Error('Caixa não encontrado');
    }

    return cashier;
  }

  static async getTodayOpen() {
    const cashier = await CashierRepository.findTodayOpen();
    
    if (!cashier) {
      throw new Error('Caixa não está aberto');
    }

    return cashier;
  }

  static async getAllCashiers() {
    return CashierRepository.findAll();
  }

  static async getCashierByDate(date) {
    const cashier = await CashierRepository.findByDate(date);
    
    if (!cashier) {
      throw new Error('Caixa não encontrado para essa data');
    }

    return cashier;
  }

  static async addRentalIncome(cashierId, amount) {
    const cashier = await this.getCashierById(cashierId);

    if (cashier.isClosed) {
      throw new Error('Caixa já foi fechado');
    }

    const newAmount = cashier.rentalIncome + amount;

    const [, updated] = await CashierRepository.update(cashierId, {
      rentalIncome: newAmount
    });

    return updated[0];
  }

  static async addSaleIncome(cashierId, amount) {
    const cashier = await this.getCashierById(cashierId);

    if (cashier.isClosed) {
      throw new Error('Caixa já foi fechado');
    }

    const newAmount = cashier.saleIncome + amount;

    const [, updated] = await CashierRepository.update(cashierId, {
      saleIncome: newAmount
    });

    return updated[0];
  }

  static async addExpense(cashierId, type, amount) {
    const cashier = await this.getCashierById(cashierId);

    if (cashier.isClosed) {
      throw new Error('Caixa já foi fechado');
    }

    const updateData = {};

    if (type === 'maintenance') {
      updateData.maintenanceExpense = cashier.maintenanceExpense + amount;
    } else if (type === 'purchase') {
      updateData.purchaseExpense = cashier.purchaseExpense + amount;
    } else {
      throw new Error('Tipo de despesa inválido');
    }

    const [, updated] = await CashierRepository.update(cashierId, updateData);
    return updated[0];
  }

  static async closeCashier(cashierId) {
    const cashier = await this.getCashierById(cashierId);

    if (cashier.isClosed) {
      throw new Error('Caixa já foi fechado');
    }

    const finalAmount = 
      cashier.initialAmount + 
      cashier.rentalIncome + 
      cashier.saleIncome - 
      cashier.maintenanceExpense - 
      cashier.purchaseExpense;

    const [, updated] = await CashierRepository.update(cashierId, {
      closingDate: new Date().toISOString().split('T')[0],
      finalAmount,
      isClosed: true
    });

    return updated[0];
  }
}

module.exports = CashierService;
