const express = require('express');
const userController = require('../Controllers/UserController');

const router = express.Router();

// Ruta para registrar usuarios
router.post('/register', userController.registerUser);

module.exports = router;
