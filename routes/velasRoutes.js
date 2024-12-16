const express = require('express');
const router = express.Router();
const velasController = require('../controllers/velasController');

// Rutas para cada categoría
router.get('/velasAromaticas', (req, res) => {
  req.params.categoria = 'velasAromaticas';
  velasController.getVelasByCategoria(req, res, req.originalUrl); // Pasando req.originalUrl
});
  
router.get('/velasTematicas', (req, res) => {
  req.params.categoria = 'velasTematicas';
  velasController.getVelasByCategoria(req, res, req.originalUrl); // Pasando req.originalUrl
});
  
router.get('/velasDecorativas', (req, res) => {
  req.params.categoria = 'velasDecorativas';
  velasController.getVelasByCategoria(req, res, req.originalUrl); // Pasando req.originalUrl
});

module.exports = router;