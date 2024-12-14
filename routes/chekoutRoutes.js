const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// Ruta para mostrar la vista de checkout
router.get('/', checkoutController.showCheckout);

// Ruta para procesar el formulario de checkout
router.post('/process', checkoutController.processCheckout);

module.exports = router;