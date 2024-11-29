const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Ruta POST para manejar el envío del formulario
router.post('/', contactController.handleContactForm);

module.exports = router;
