// /api/register.js
const mysql = require('mysql2');

module.exports = (req, res) => {
  if (req.method === 'POST') {
    // Crear una nueva conexión dentro de la solicitud
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Extraer los datos del cliente del cuerpo de la solicitud
    const { nombre, apellido1, apellido2, email, contraseña, telefono } = req.body;

    // Consulta para insertar el nuevo cliente
    const query = 'INSERT INTO clientes (nombre, apellido1, apellido2, email, contraseña, telefono, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, NOW())';
    
    // Ejecutar la consulta
    connection.query(query, [nombre, apellido1, apellido2, email, contraseña, telefono], (error, results) => {
      // Cerrar la conexión después de la consulta
      connection.end();

      if (error) {
        console.error('Error en la consulta SQL:', error);
        return res.status(500).send('Error al registrar el cliente: ' + error.message);
      }

      // Responder con éxito si no hubo errores
      res.status(201).send('Cliente registrado con éxito');
    });
  } else {
    // Si el método no es POST, devolver un error 405
    res.status(405).send('Método no permitido');
  }
};
