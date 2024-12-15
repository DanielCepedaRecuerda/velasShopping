const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// Ruta para registrar usuarios
router.post("/register", userController.registerUser);
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
  });
// Ruta para login
router.post("/login", userController.loginUser);
// Ruta para logout
router.get("/logout", userController.logoutUser);

module.exports = router;
