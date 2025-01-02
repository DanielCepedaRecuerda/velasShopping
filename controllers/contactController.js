const nodemailer = require("nodemailer");

const handleContactForm = async (req, res) => {
  console.log("Datos recibidos en el controlador:", req.body);
  const { name, email, message } = req.body;
  console.log(name, email, message);

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
}
  try {
    // Lógica de enviar un correo electrónico
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: "tusvelasshopping@gmail.com",
      subject: `Nuevo mensaje de ${name}`,
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.redirect("/");

  } catch (error) {
    console.error("Error al procesar el formulario:", error);
    res.status(500).json({ error: "Hubo un error al enviar el mensaje." });
  }
};

module.exports = { handleContactForm };