const bcrypt = require('bcryptjs');
const userModel = require('../models/UserModel');

const registerUser = async (req, res) => {
  const { nombre, apellido1, apellido2, email, contraseña, telefono } = req.body;

  if (!nombre || !apellido1 || !email || !contraseña || !telefono) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
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

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = {
  registerUser,
};
