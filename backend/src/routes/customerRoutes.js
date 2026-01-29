const express = require('express');
const CustomerController = require('../controllers/CustomerController');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, CustomerController.create);
router.get('/', authMiddleware, CustomerController.getAll);
router.get('/:id', authMiddleware, CustomerController.getById);
router.get('/:id/history', authMiddleware, CustomerController.getHistory);
router.put('/:id', authMiddleware, CustomerController.update);
router.delete('/:id', authMiddleware, CustomerController.delete);

module.exports = router;
