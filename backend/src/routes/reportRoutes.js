const express = require('express');
const ReportController = require('../controllers/ReportController');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.get('/monthly-revenue/:month/:year', authMiddleware, ReportController.getMonthlyRevenue);
router.get('/reservations-period', authMiddleware, ReportController.getReservationsByPeriod);
router.get('/most-rented', authMiddleware, ReportController.getMostRentedPieces);
router.get('/sold-pieces', authMiddleware, ReportController.getSoldPieces);
router.get('/frequent-customers', authMiddleware, ReportController.getMostFrequentCustomers);
router.get('/pending-payments', authMiddleware, ReportController.getPendingPayments);
router.get('/stock', authMiddleware, ReportController.getStockReport);

module.exports = router;
