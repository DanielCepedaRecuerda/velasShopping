const express = require("express");
const router = express.Router();
const {paymentController} = require("../controllers/paymentController");
const path = require("path");

// Ruta para mostrar la pasarela de pago
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "pasarelaPago.html"));
});
// Ruta para procesar el pago
router.post("/procesar-pago", paymentController);

router.get("/confirmation", (req, res) => {
  const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  res.render("confirmation", {
    message: "Gracias por tu compra. Tu pago se procesó exitosamente.",
    cartItems: cart,
    formularioDatos,
  });
});
module.exports = router;
