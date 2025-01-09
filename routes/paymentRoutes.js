const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Ruta para la confirmación de pagos
router.get("/confirmation", paymentController.confirmPayment);

module.exports = router;
