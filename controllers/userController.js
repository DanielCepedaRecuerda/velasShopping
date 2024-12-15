const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const registerUser = async (req, res) => {
  const { nombre, apellido1, apellido2, email, contraseña, telefono } =
    req.body;
  const errors = [];

  // Validaciones
  // Validar el nombre
  if (!nombre) {
    errors.push("El nombre es obligatorio.");
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
    errors.push("El nombre solo puede contener letras y espacios.");
  }

  // Validar el primer apellido
  if (!apellido1) {
    errors.push("El primer apellido es obligatorio.");
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido1)) {
    errors.push("El primer apellido solo puede contener letras y espacios.");
  }

  // Validar el segundo apellido (opcional)
  if (!apellido2) {
    errors.push(
      "El segundo apellido es opcional, pero si se proporciona, debe ser válido."
    );
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido2)) {
    errors.push("El segundo apellido solo puede contener letras y espacios.");
  }
  // Validar el formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.push("El email es obligatorio.");
  } else if (!emailRegex.test(email)) {
    errors.push("El email es inválido.");
  } else if (
    email.toLowerCase().includes("test") ||
    email.toLowerCase().includes("example")
  ) {
    errors.push("El email no puede ser un correo de prueba.");
  }

  // Validar la contraseña
  if (!contraseña) {
    errors.push("La contraseña es obligatoria.");
  } else if (contraseña.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres.");
  } else if (!/[A-Z]/.test(contraseña)) {
    errors.push("La contraseña debe contener al menos una letra mayúscula.");
  } else if (!/[0-9]/.test(contraseña)) {
    errors.push("La contraseña debe contener al menos un número.");
  }

  // Validar el teléfono
  const phoneRegex = /^\d{9}$/;
  if (!telefono) {
    errors.push("El teléfono es obligatorio.");
  } else if (!phoneRegex.test(telefono)) {
    errors.push("El teléfono debe tener 9 dígitos.");
  }

  // Si hay errores, redirigir a la página de registro con los errores
  if (errors.length > 0) {
    // Crear un objeto con los datos del formulario
    const formData = {
      nombre,
      apellido1,
      apellido2,
      email,
      telefono,
    };
    return res.redirect(
    `/register?errors=${encodeURIComponent(JSON.stringify(errors))}&data=${encodeURIComponent(JSON.stringify(formData))}`
  );
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
    if (error.message === "El correo electrónico ya está registrado.") {
      return res.redirect(
        `/register?errors=${encodeURIComponent(
          JSON.stringify([error.message])
        )}`
      );
    }

    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

const loginUser = async (req, res) => {
  const { email, contraseña } = req.body;
  const errors = [];
  // Validar el formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.push("El email es obligatorio.");
  } else if (!emailRegex.test(email)) {
    errors.push("El email es inválido.");
  }

  // Validar la contraseña
  if (!contraseña) {
    errors.push("La contraseña es obligatoria.");
  } else if (contraseña.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres.");
  }

  // Si hay errores, redirigir a la página de inicio de sesión con los errores
  if (errors.length > 0) {
    return res.redirect(
      `/login?errors=${encodeURIComponent(JSON.stringify(errors))}`
    );
  }

  try {
    // Buscar usuario por email
    const user = await userModel.findUserByEmail(email);

    // Verificar contraseña
    const isPasswordValid =
      user && (await bcrypt.compare(contraseña, user.contraseña));
    if (!isPasswordValid) {
      errors.push("Email o contraseña incorrectos"); // Mensaje genérico
    }

    if (errors.length > 0) {
      return res.redirect(
        `/login?errors=${encodeURIComponent(JSON.stringify(errors))}`
      );
    }

    // Si todo es correcto, iniciar sesión
    req.session.user = { id: user._id, email: user.email };
    res.cookie("user_authenticated", "true", {
      maxAge: 900000,
      httpOnly: false,
    });
    res.redirect("/"); // Redirigir al índice
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
    res.clearCookie("connect.sid"); // Limpia la cookie de sesión
    res.clearCookie("user_authenticated"); // Limpia la cookie de sesión
    res.redirect("/"); // Redirige al usuario a la página principal
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
