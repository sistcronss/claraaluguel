const express = require('express');
const ReservationController = require('../controllers/ReservationController');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, ReservationController.create);
router.get('/', authMiddleware, ReservationController.getAll);
router.get('/:id', authMiddleware, ReservationController.getById);
router.put('/:id', authMiddleware, ReservationController.update);
router.patch('/:id/cancel', authMiddleware, ReservationController.cancel);
router.patch('/:id/complete', authMiddleware, ReservationController.complete);
router.delete('/:id', authMiddleware, ReservationController.delete);

module.exports = router;
