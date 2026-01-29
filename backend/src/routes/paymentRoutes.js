const express = require('express');
const PaymentController = require('../controllers/PaymentController');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, PaymentController.create);
router.get('/', authMiddleware, PaymentController.getAll);
router.get('/:id', authMiddleware, PaymentController.getById);
router.put('/:id', authMiddleware, PaymentController.update);
router.patch('/:id/record', authMiddleware, PaymentController.recordPayment);
router.delete('/:id', authMiddleware, PaymentController.delete);

module.exports = router;
