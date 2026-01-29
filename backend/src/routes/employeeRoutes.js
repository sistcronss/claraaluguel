const express = require('express');
const EmployeeController = require('../controllers/EmployeeController');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, EmployeeController.create);
router.get('/', authMiddleware, EmployeeController.getAll);
router.get('/:id', authMiddleware, EmployeeController.getById);
router.put('/:id', authMiddleware, adminMiddleware, EmployeeController.update);
router.delete('/:id', authMiddleware, adminMiddleware, EmployeeController.delete);

module.exports = router;
