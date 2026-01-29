const UserRepository = require('../repositories/UserRepository');
const { PasswordUtils, TokenUtils } = require('../utils/auth');

class AuthService {
  static async login(login, password) {
    const user = await UserRepository.findByLogin(login);
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (!user.isActive) {
      throw new Error('Usuário inativo');
    }

    const passwordMatch = await PasswordUtils.compare(password, user.password);
    
    if (!passwordMatch) {
      throw new Error('Senha incorreta');
    }

    const token = TokenUtils.generate(user.id, user.role);

    return {
      token,
      user: {
        id: user.id,
        login: user.login,
        role: user.role,
        employee: user.employee
      }
    };
  }

  static async createUser(loginData) {
    const existingUser = await UserRepository.findByLogin(loginData.login);
    
    if (existingUser) {
      throw new Error('Login já existe');
    }

    return UserRepository.create(loginData);
  }
}

module.exports = AuthService;
