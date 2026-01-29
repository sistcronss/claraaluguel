const express = require('express');
const SaleController = require('../controllers/SaleController');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, SaleController.create);
router.get('/', authMiddleware, SaleController.getAll);
router.get('/customer/:customerId', authMiddleware, SaleController.getByCustomer);
router.get('/:id', authMiddleware, SaleController.getById);
router.put('/:id', authMiddleware, SaleController.update);
router.delete('/:id', authMiddleware, SaleController.delete);

module.exports = router;
