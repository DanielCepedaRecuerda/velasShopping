const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Ruta para registrar usuarios
router.post('/register', userController.registerUser);
// Ruta para login
router.post("/api/login", userController.loginUser);
// Ruta para logout
router.get('/logout', userController.logoutUser);

module.exports = router;
