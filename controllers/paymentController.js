const paymentModel = require('../models/paymentModel'); // Asegúrate de tener un modelo para manejar la base de datos
const nodemailer = require('nodemailer');

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
      // Configurar el transportador de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Puedes usar otro servicio de correo
      auth: {
        user: process.env.EMAIL_USER, // Tu correo electrónico
        pass: process.env.EMAIL_PASS, // Tu contraseña de correo
      },
    });
     // Configurar el contenido del correo
     const mailOptions = {
      from: process.env.EMAIL_USER, // Remitente
      to: email, // Destinatario
      subject: 'Confirmación de Pago',
      text: 'Su pago ha sido procesado exitosamente. Gracias por su compra.',
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

  
      // Almacenar mensaje en la sesión o pasar directamente
      const successMessage = "Pago procesado exitosamente.";
  
      // Redirigir a la nueva vista de confirmación
      res.render('confirmation', { message: successMessage });
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      res.status(500).json({ error: "Hubo un error al procesar el pago." });
    }
  };