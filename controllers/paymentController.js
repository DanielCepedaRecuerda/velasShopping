// controllers/paymentController.js
const cartModel = require("../models/cartModel");

const paymentController = async (req, res) => {
  try {
    // Recuperar los datos del formulario
    const { numeroTarjeta, nombreTitular, fechaExpiracion, cvv } = req.body;
    console.log("Form: " + numeroTarjeta, nombreTitular, fechaExpiracion, cvv);
    
    // Recuperar la cookie "cart" (cartId o los datos del carrito)
    const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : []; // Recuperar los datos del carrito desde la cookie
    console.log("Cookie: " + cart);

    // Si no se encuentra un carrito o no se envían los datos del formulario, retornar un error
    if (!cart || !numeroTarjeta || !nombreTitular || !fechaExpiracion || !cvv) {
      return res.status(400).json({ success: false, error: "Faltan datos." });
    }

    // Si todo es correcto, responde con un mensaje de éxito y redirigir a confirmation
    res.status(200).json({
      success: true,
      message: "Pago procesado correctamente. Redirigiendo a la confirmación.",
      cartItems: cart,
    });

    // Aquí podrías agregar la lógica de inserción a base de datos o procesamiento del pago
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    res.status(500).json({
      success: false,
      error: "Ocurrió un error al procesar el pago. Inténtalo de nuevo más tarde.",
    });
  }
};

module.exports = { paymentController };
