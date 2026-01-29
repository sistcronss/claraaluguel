const CustomerService = require('../services/CustomerService');
const ApiResponse = require('../utils/apiResponse');

class CustomerController {
  static async create(req, res, next) {
    try {
      const { name, cpf, birthDate, phone, address, cep } = req.body;

      if (!name) {
        return res.status(400).json(ApiResponse.error('Nome obrigatório', 400));
      }

      const result = await CustomerService.createCustomer({
        name, cpf, birthDate, phone, address, cep
      });

      return res.status(201).json(
        ApiResponse.success(result, 'Cliente criado com sucesso', 201)
      );
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;

      const result = await CustomerService.getCustomerById(id);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const result = await CustomerService.getAllCustomers();

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, cpf, birthDate, phone, address, cep } = req.body;

      const result = await CustomerService.updateCustomer(id, {
        name, cpf, birthDate, phone, address, cep
      });

      return res.status(200).json(
        ApiResponse.success(result, 'Cliente atualizado com sucesso')
      );
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      await CustomerService.deleteCustomer(id);

      return res.status(200).json(ApiResponse.success(null, 'Cliente deletado com sucesso'));
    } catch (error) {
      next(error);
    }
  }

  static async getHistory(req, res, next) {
    try {
      const { id } = req.params;

      const result = await CustomerService.getCustomerHistory(id);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
