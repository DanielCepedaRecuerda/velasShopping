const express = require('express');
const router = express.Router();
const velasController = require('../controllers/velasController');

// Ruta para obtener velas por categoría
router.get('/categoria/:id', velasController.getVelasByCategoria);

// Ruta para las velas aromáticas
router.get('/velasAromaticas', velasController.getVelasByCategoria);

// Ruta para las velas temáticas
router.get('/velasTematicas', velasController.getVelasByCategoria);

// Ruta para las velas decorativas
router.get('/velasDecorativas', velasController.getVelasByCategoria);

module.exports = router;
