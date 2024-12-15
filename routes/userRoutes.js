const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// Ruta para mostrar el formulario de registro
router.get("/register", userController.getRegisterPage);
// Ruta para registrar usuarios
router.post("/register", userController.registerUser);
// Ruta para login
router.post("/login", userController.loginUser);
// Ruta para logout
router.get("/logout", userController.logoutUser);

module.exports = router;
