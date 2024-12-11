const express = require('express');
const router = express.Router();
const velasController = require('../controllers/velasController');

// Ruta dinámica que captura el parámetro 'categoria' y pasa al controlador
router.get('/:categoria', velasController.getVelasByCategoria);

module.exports = router;
