const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const registerUser = async (req, res) => {
  const { nombre, apellido1, apellido2, email, contraseña, telefono } =
    req.body;
  console.log(req.body);

  if (!nombre || !apellido1 || !email || !contraseña || !telefono) {
    return res
      .status(400)
      .json({ mensaje: "Todos los campos son obligatorios" });
  }

  try {
    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crear usuario
    await userModel.createUser({
      nombre,
      apellido1,
      apellido2,
      email,
      contraseña: hashedPassword,
      telefono,
    });

    // Redirigir al login
    res.redirect("/login");
  } catch (error) {
    console.error("Error al registrar el usuario:", error);

    // Si el error es que el correo ya está registrado
    if (error.message === "El correo electrónico ya está registrado.") {
      return res.status(400).json({ mensaje: error.message });
    }

    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

const loginUser = async (req, res) => {
  const { email, contraseña } = req.body;
  console.log(req.body);
  if (!email || !contraseña) {
    return res
      .status(400)
      .json({ mensaje: "Email y contraseña son obligatorios" });
  }

  try {
    // Buscar usuario por email
    const user = await userModel.findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ mensaje: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);

    if (!isPasswordValid) {
      return res.status(400).json({ mensaje: "Contraseña incorrecta" });
    }

     // Almacenamos la información del usuario en la sesión
     req.session.user = {
      id: user._id,
      email: user.email,
    };
    res.cookie('user_authenticated', 'true', { maxAge: 900000, httpOnly: false }); // No tiene httpOnly, accesible desde JS
    res.redirect("/"); // Esto redirige al cliente al índice
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res.status(500).json({ mensaje: "Error al cerrar sesión" });
    }
    res.clearCookie('connect.sid'); // Limpia la cookie de sesión
    res.clearCookie('user_authenticated'); // Limpia la cookie de sesión
    res.redirect('/'); // Redirige al usuario a la página principal
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
