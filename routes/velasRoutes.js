const express = require('express');
const router = express.Router();
const velasController = require('../controllers/velasController');

// Rutas para cada categoría
router.get('/velasAromaticas', velasController.getVelasByCategoria);
router.get('/velasTematicas', velasController.getVelasByCategoria);
router.get('/velasDecorativas', velasController.getVelasByCategoria);

module.exports = router;
