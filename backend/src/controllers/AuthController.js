const AuthService = require('../services/AuthService');
const ApiResponse = require('../utils/apiResponse');

class AuthController {
  static async login(req, res, next) {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        return res.status(400).json(ApiResponse.error('Login e senha obrigatórios', 400));
      }

      const result = await AuthService.login(login, password);

      return res.status(200).json(ApiResponse.success(result, 'Login realizado com sucesso'));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
