const CustomerRepository = require('../repositories/CustomerRepository');

class CustomerService {
  static async createCustomer(customerData) {
    // Validar CPF se fornecido
    if (customerData.cpf) {
      const existing = await CustomerRepository.findByCPF(customerData.cpf);
      if (existing) {
        throw new Error('CPF já cadastrado');
      }
    }

    return CustomerRepository.create(customerData);
  }

  static async getCustomerById(id) {
    const customer = await CustomerRepository.findById(id);
    
    if (!customer) {
      throw new Error('Cliente não encontrado');
    }

    return customer;
  }

  static async getAllCustomers() {
    return CustomerRepository.findAll();
  }

  static async updateCustomer(id, data) {
    const customer = await CustomerRepository.findById(id);
    
    if (!customer) {
      throw new Error('Cliente não encontrado');
    }

    // Se mudar CPF, validar unicidade
    if (data.cpf && data.cpf !== customer.cpf) {
      const existing = await CustomerRepository.findByCPF(data.cpf);
      if (existing) {
        throw new Error('CPF já cadastrado');
      }
    }

    const [, updated] = await CustomerRepository.update(id, data);
    return updated[0];
  }

  static async deleteCustomer(id) {
    const customer = await CustomerRepository.findById(id);
    
    if (!customer) {
      throw new Error('Cliente não encontrado');
    }

    if (customer.reservations && customer.reservations.length > 0) {
      throw new Error('Cliente possui reservas associadas');
    }

    await CustomerRepository.delete(id);
  }

  static async getCustomerHistory(customerId) {
    const customer = await CustomerRepository.findById(customerId);
    
    if (!customer) {
      throw new Error('Cliente não encontrado');
    }

    return {
      reservations: customer.reservations || [],
      sales: customer.sales || []
    };
  }
}

module.exports = CustomerService;
