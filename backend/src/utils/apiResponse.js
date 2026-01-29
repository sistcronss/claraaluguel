class ApiResponse {
  static success(data, message = 'Sucesso', statusCode = 200) {
    return {
      statusCode,
      success: true,
      message,
      data
    };
  }

  static error(message = 'Erro', statusCode = 400, errors = null) {
    return {
      statusCode,
      success: false,
      message,
      ...(errors && { errors })
    };
  }
}

module.exports = ApiResponse;
