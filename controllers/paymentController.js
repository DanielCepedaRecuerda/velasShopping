const paymentModel = require('../models/paymentModel'); // Asegúrate de tener un modelo para manejar la base de datos

exports.processPayment = async (req, res) => {
    const { numeroTarjeta, nombreTitular, fechaExpiracion, cvv } = req.body;
  
    try {
      // Validar los datos de entrada
      if (!numeroTarjeta || !nombreTitular || !fechaExpiracion || !cvv) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
      }
  
      // Lógica para procesar el pago
      console.log('Procesando pago con los siguientes datos:', {
        numeroTarjeta,
        nombreTitular,
        fechaExpiracion,
        cvv,
      });
  
      // Redirigir a la página de confirmación
      res.redirect('/confirmation');
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      res.status(500).json({ error: "Hubo un error al procesar el pago." });
    }
  };