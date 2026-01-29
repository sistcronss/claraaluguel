const { Employee, User } = require('../models');

class EmployeeRepository {
  static async create(employeeData) {
    return Employee.create(employeeData);
  }

  static async findById(id) {
    return Employee.findByPk(id, {
      include: [{ model: User, as: 'user', attributes: ['id', 'login', 'role'] }]
    });
  }

  static async findAll() {
    return Employee.findAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'login', 'role'] }]
    });
  }

  static async findByUserId(userId) {
    return Employee.findOne({
      where: { userId },
      include: [{ model: User, as: 'user' }]
    });
  }

  static async update(id, data) {
    return Employee.update(data, { where: { id }, returning: true });
  }

  static async delete(id) {
    return Employee.destroy({ where: { id } });
  }
}

module.exports = EmployeeRepository;
