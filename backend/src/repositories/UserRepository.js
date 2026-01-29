const { User, Employee } = require('../models');
const { PasswordUtils } = require('../utils/auth');

class UserRepository {
  static async create(loginData) {
    const hashedPassword = await PasswordUtils.hash(loginData.password);
    
    return User.create({
      login: loginData.login,
      password: hashedPassword,
      role: loginData.role || 'employee',
      isActive: true
    });
  }

  static async findByLogin(login) {
    return User.findOne({ 
      where: { login },
      include: [{ model: Employee, as: 'employee' }]
    });
  }

  static async findById(id) {
    return User.findByPk(id, {
      include: [{ model: Employee, as: 'employee' }]
    });
  }

  static async findAll() {
    return User.findAll({
      include: [{ model: Employee, as: 'employee' }]
    });
  }

  static async update(id, data) {
    if (data.password) {
      data.password = await PasswordUtils.hash(data.password);
    }
    
    return User.update(data, { where: { id }, returning: true });
  }

  static async delete(id) {
    return User.destroy({ where: { id } });
  }
}

module.exports = UserRepository;
