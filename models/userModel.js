const connection = require("../db/Connection");

const createUser = async (userData) => {
  const { nombre, apellido1, apellido2, email, contraseña, telefono } = userData;

  const conn = await connection();

  // Primero verificamos si el email ya está en la base de datos
  const [rows] = await conn.execute("SELECT * FROM clientes WHERE email = ?", [email]);

  if (rows.length > 0) {
    throw new Error("El correo electrónico ya está registrado.");
  }

  // Si el email no existe, insertamos el nuevo usuario
  const query =
    "INSERT INTO clientes (nombre, apellido1, apellido2, email, contraseña, telefono, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, NOW())";

  await conn.execute(query, [
    nombre,
    apellido1,
    apellido2,
    email,
    contraseña,
    telefono,
  ]);
};

module.exports = {
  createUser,
};
