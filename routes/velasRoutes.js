const express = require('express');
const router = express.Router();
const velasController = require('../controllers/velasController');

// Ruta para las velas aromáticas
router.get('/velas_aromaticas', velasController.getVelasByCategoria);

// Ruta para las velas temáticas
router.get('/velas_tematicas', velasController.getVelasByCategoria);

// Ruta para las velas decorativas
router.get('/velas_decorativas', velasController.getVelasByCategoria);

module.exports = router;
