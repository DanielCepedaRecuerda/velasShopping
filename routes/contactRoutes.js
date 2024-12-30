const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const path = require('path');

// Ruta GET para mostrar el formulario de contacto
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'contacto.html')); // Asegúrate de que la ruta sea correcta
});

// Ruta POST para manejar el envío del formulario
router.post('/contact', contactController.handleContactForm);

module.exports = router;
