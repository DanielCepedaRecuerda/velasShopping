const paymentModel = require("../models/paymentModel");
const nodemailer = require("nodemailer");

exports.processPayment = async (req, res) => {
  const { numeroTarjeta, nombreTitular, fechaExpiracion, cvv } = req.body;

  try {
    // Validar los datos de entrada
    if (!numeroTarjeta || !nombreTitular || !fechaExpiracion || !cvv) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    // Lógica para procesar el pago
    console.log("Procesando pago con los siguientes datos:", {
      numeroTarjeta,
      nombreTitular,
      fechaExpiracion,
      cvv,
    });
    // Configurar el transportador de Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const successMessage = "Pago procesado exitosamente.";

    // Redirigir a la vista de confirmación
    res.render("confirmation", { message: successMessage });
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    res.status(500).json({ error: "Hubo un error al procesar el pago." });
  }
};
