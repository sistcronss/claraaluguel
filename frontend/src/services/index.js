import api from './api';

export const authService = {
  login: (login, password) => api.post('/auth/login', { login, password }),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getUser: () => JSON.parse(localStorage.getItem('user') || 'null'),
  getToken: () => localStorage.getItem('token'),
};

export const employeeService = {
  getAll: () => api.get('/employees'),
  getById: (id) => api.get(`/employees/${id}`),
  create: (data) => api.post('/employees', data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`),
};

export const customerService = {
  getAll: () => api.get('/customers'),
  getById: (id) => api.get(`/customers/${id}`),
  getHistory: (id) => api.get(`/customers/${id}/history`),
  create: (data) => api.post('/customers', data),
  update: (id, data) => api.put(`/customers/${id}`, data),
  delete: (id) => api.delete(`/customers/${id}`),
};

export const sectorService = {
  getAll: () => api.get('/sectors'),
  getById: (id) => api.get(`/sectors/${id}`),
  create: (data) => api.post('/sectors', data),
  update: (id, data) => api.put(`/sectors/${id}`, data),
  delete: (id) => api.delete(`/sectors/${id}`),
};

export const pieceService = {
  getAll: (filters) => api.get('/pieces', { params: filters }),
  getById: (id) => api.get(`/pieces/${id}`),
  getByCode: (code) => api.get(`/pieces/code/${code}`),
  getBySector: (sectorId) => api.get(`/pieces/sector/${sectorId}`),
  getStockStatus: () => api.get('/pieces/stock/status'),
  create: (data) => api.post('/pieces', data),
  update: (id, data) => api.put(`/pieces/${id}`, data),
  updateStatus: (id, status) => api.patch(`/pieces/${id}/status`, { status }),
  delete: (id) => api.delete(`/pieces/${id}`),
};

export const reservationService = {
  getAll: (filters) => api.get('/reservations', { params: filters }),
  getById: (id) => api.get(`/reservations/${id}`),
  create: (data) => api.post('/reservations', data),
  update: (id, data) => api.put(`/reservations/${id}`, data),
  cancel: (id) => api.patch(`/reservations/${id}/cancel`),
  complete: (id) => api.patch(`/reservations/${id}/complete`),
  delete: (id) => api.delete(`/reservations/${id}`),
};

export const paymentService = {
  getAll: (filters) => api.get('/payments', { params: filters }),
  getById: (id) => api.get(`/payments/${id}`),
  create: (data) => api.post('/payments', data),
  update: (id, data) => api.put(`/payments/${id}`, data),
  recordPayment: (id, amount) => api.patch(`/payments/${id}/record`, { amount }),
  delete: (id) => api.delete(`/payments/${id}`),
};

export const saleService = {
  getAll: (filters) => api.get('/sales', { params: filters }),
  getById: (id) => api.get(`/sales/${id}`),
  getByCustomer: (customerId) => api.get(`/sales/customer/${customerId}`),
  create: (data) => api.post('/sales', data),
  update: (id, data) => api.put(`/sales/${id}`, data),
  delete: (id) => api.delete(`/sales/${id}`),
};

export const cashierService = {
  open: (initialAmount) => api.post('/cashier', { initialAmount }),
  getAll: () => api.get('/cashier'),
  getById: (id) => api.get(`/cashier/${id}`),
  getTodayOpen: () => api.get('/cashier/today'),
  getByDate: (date) => api.get(`/cashier/date/${date}`),
  addRentalIncome: (id, amount) => api.patch(`/cashier/${id}/rental-income`, { amount }),
  addSaleIncome: (id, amount) => api.patch(`/cashier/${id}/sale-income`, { amount }),
  addExpense: (id, type, amount) => api.patch(`/cashier/${id}/expense`, { type, amount }),
  close: (id) => api.patch(`/cashier/${id}/close`),
};

export const reportService = {
  getMonthlyRevenue: (month, year) => api.get(`/reports/monthly-revenue/${month}/${year}`),
  getReservationsByPeriod: (startDate, endDate) => 
    api.get('/reports/reservations-period', { params: { startDate, endDate } }),
  getMostRentedPieces: (limit) => api.get('/reports/most-rented', { params: { limit } }),
  getSoldPieces: () => api.get('/reports/sold-pieces'),
  getMostFrequentCustomers: (limit) => api.get('/reports/frequent-customers', { params: { limit } }),
  getPendingPayments: () => api.get('/reports/pending-payments'),
  getStockReport: () => api.get('/reports/stock'),
};
