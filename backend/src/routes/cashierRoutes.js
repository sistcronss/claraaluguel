const express = require('express');
const CashierController = require('../controllers/CashierController');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, CashierController.open);
router.get('/today', authMiddleware, CashierController.getTodayOpen);
router.get('/date/:date', authMiddleware, CashierController.getByDate);
router.get('/', authMiddleware, CashierController.getAll);
router.get('/:id', authMiddleware, CashierController.getById);
router.patch('/:id/rental-income', authMiddleware, CashierController.addRentalIncome);
router.patch('/:id/sale-income', authMiddleware, CashierController.addSaleIncome);
router.patch('/:id/expense', authMiddleware, CashierController.addExpense);
router.patch('/:id/close', authMiddleware, CashierController.close);

module.exports = router;
