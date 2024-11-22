const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

// Ruta para registrar usuarios
router.post('/register', userController.registerUser);
// Ruta para login
router.post("/api/login", userController.loginUser);

module.exports = router;
