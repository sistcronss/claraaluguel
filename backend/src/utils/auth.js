const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class PasswordUtils {
  static async hash(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async compare(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

class TokenUtils {
  static generate(id, role) {
    return jwt.sign(
      { id, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }

  static verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = { PasswordUtils, TokenUtils };
