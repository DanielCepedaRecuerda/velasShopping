const express = require('express');
const router = express.Router();
const velasController = require('../controllers/velasController');

// Rutas para cada categoría
router.get('/velasAromaticas', (req, res) => {
    req.params.categoria = 'Aromaticas';
    velasController.getVelasByCategoria(req, res);
  });
  
  router.get('/velasTematicas', (req, res) => {
    req.params.categoria = 'Tematicas';
    velasController.getVelasByCategoria(req, res);
  });
  
  router.get('/velasDecorativas', (req, res) => {
    req.params.categoria = 'Decorativas';
    velasController.getVelasByCategoria(req, res);
  });
module.exports = router;
