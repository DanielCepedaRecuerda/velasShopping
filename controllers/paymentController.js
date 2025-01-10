// controllers/paymentController.js
const cartModel = require("../models/cartModel");

const confirmPayment = async (req, res) => {
  // Leer el cartId de la cookie o de la sesión

  const cartId = req.cookies.cart || req.session.cart;

  if (!cartId) {
    return res.status(400).send("No se encontró un carrito activo.");
  }

  try {
    // Obtener los artículos del carrito desde la base de datos
    const cartItems = await cartModel.getCart(cartId);

    // Vaciar el carrito después del pago
    await cartModel.clearCart(cartId);

    // Renderizar la vista de confirmación con los artículos del carrito
    res.render("confirmation", {
      message: "Tu pago se procesó exitosamente.",
      cartItems: cartItems,
    });
  } catch (error) {
    console.error("Error al confirmar el pago:", error);
    res.status(500).send("Ocurrió un error al procesar tu pago.");
  }
};

module.exports = { confirmPayment };
