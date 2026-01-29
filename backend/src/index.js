require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const errorHandler = require('./middlewares/errorHandler');

// Routes
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const customerRoutes = require('./routes/customerRoutes');
const pieceRoutes = require('./routes/pieceRoutes');
const sectorRoutes = require('./routes/sectorRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const saleRoutes = require('./routes/saleRoutes');
const cashierRoutes = require('./routes/cashierRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/pieces', pieceRoutes);
app.use('/api/sectors', sectorRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/cashier', cashierRoutes);
app.use('/api/reports', reportRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor Clara Aluguel funcionando' });
});

// Error handling middleware
app.use(errorHandler);

// Sincronizar banco de dados e iniciar servidor
const PORT = process.env.PORT || 3001;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`✓ Servidor rodando na porta ${PORT}`);
    console.log(`✓ Ambiente: ${process.env.NODE_ENV || 'development'}`);
  });
}).catch((err) => {
  console.error('Erro ao conectar ao banco de dados:', err);
  process.exit(1);
});

module.exports = app;
