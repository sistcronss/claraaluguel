const EmployeeService = require('../services/EmployeeService');
const ApiResponse = require('../utils/apiResponse');

class EmployeeController {
  static async create(req, res, next) {
    try {
      const { name, position, phone, hireDate, login, password } = req.body;

      if (!name || !position || !login || !password) {
        return res.status(400).json(
          ApiResponse.error('Nome, cargo, login e senha obrigatórios', 400)
        );
      }

      const employeeData = { name, position, phone, hireDate };
      const userData = { login, password, role: 'employee' };

      const result = await EmployeeService.createEmployee(employeeData, userData);

      return res.status(201).json(
        ApiResponse.success(result, 'Funcionário criado com sucesso', 201)
      );
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;

      const result = await EmployeeService.getEmployeeById(id);

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const result = await EmployeeService.getAllEmployees();

      return res.status(200).json(ApiResponse.success(result));
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, position, phone, hireDate } = req.body;

      const result = await EmployeeService.updateEmployee(id, {
        name, position, phone, hireDate
      });

      return res.status(200).json(
        ApiResponse.success(result, 'Funcionário atualizado com sucesso')
      );
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      await EmployeeService.deleteEmployee(id);

      return res.status(200).json(ApiResponse.success(null, 'Funcionário deletado com sucesso'));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = EmployeeController;
