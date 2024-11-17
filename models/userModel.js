const connection = require('../db/connection');

const createUser = async (userData) => {
  const { nombre, apellido1, apellido2, email, contraseña, telefono } = userData;

  const query =
    'INSERT INTO clientes (nombre, apellido1, apellido2, email, contraseña, telefono, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, NOW())';

  const conn = await connection();
  await conn.execute(query, [nombre, apellido1, apellido2, email, contraseña, telefono]);
};

module.exports = {
  createUser,
};
