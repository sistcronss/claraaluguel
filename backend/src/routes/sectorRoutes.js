const express = require('express');
const SectorController = require('../controllers/SectorController');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, SectorController.create);
router.get('/', authMiddleware, SectorController.getAll);
router.get('/:id', authMiddleware, SectorController.getById);
router.put('/:id', authMiddleware, adminMiddleware, SectorController.update);
router.delete('/:id', authMiddleware, adminMiddleware, SectorController.delete);

module.exports = router;
