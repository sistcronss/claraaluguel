const EmployeeRepository = require('../repositories/EmployeeRepository');
const UserRepository = require('../repositories/UserRepository');

class EmployeeService {
  static async createEmployee(employeeData, userData) {
    try {
      // Criar usuário
      const user = await UserRepository.create(userData);

      // Criar funcionário
      const employeeWithUser = await EmployeeRepository.create({
        ...employeeData,
        userId: user.id
      });

      return employeeWithUser;
    } catch (error) {
      throw new Error(`Erro ao criar funcionário: ${error.message}`);
    }
  }

  static async getEmployeeById(id) {
    const employee = await EmployeeRepository.findById(id);
    
    if (!employee) {
      throw new Error('Funcionário não encontrado');
    }

    return employee;
  }

  static async getAllEmployees() {
    return EmployeeRepository.findAll();
  }

  static async updateEmployee(id, data) {
    const employee = await EmployeeRepository.findById(id);
    
    if (!employee) {
      throw new Error('Funcionário não encontrado');
    }

    const [, updated] = await EmployeeRepository.update(id, data);
    return updated[0];
  }

  static async deleteEmployee(id) {
    const employee = await EmployeeRepository.findById(id);
    
    if (!employee) {
      throw new Error('Funcionário não encontrado');
    }

    await EmployeeRepository.delete(id);
    await UserRepository.delete(employee.userId);
  }
}

module.exports = EmployeeService;
