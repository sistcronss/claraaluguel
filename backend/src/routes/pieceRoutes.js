const express = require('express');
const PieceController = require('../controllers/PieceController');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, PieceController.create);
router.get('/code/:code', authMiddleware, PieceController.getByCode);
router.get('/sector/:sectorId', authMiddleware, PieceController.getBySector);
router.get('/stock/status', authMiddleware, PieceController.getStockStatus);
router.get('/', authMiddleware, PieceController.getAll);
router.get('/:id', authMiddleware, PieceController.getById);
router.put('/:id', authMiddleware, PieceController.update);
router.patch('/:id/status', authMiddleware, PieceController.updateStatus);
router.delete('/:id', authMiddleware, PieceController.delete);

module.exports = router;
