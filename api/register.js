// /api/register.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = (req, res) => {
  if (req.method === 'POST') {
    // Si la solicitud es POST, registra al cliente
    const { nombre, apellido1, apellidos2, email, contraseña, telefono } = req.body;
    const query = 'INSERT INTO clientes (nombre, apellido1, apellidos2, email, contraseña, telefono, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, NOW())';
    
    connection.query(query, [nombre, apellido1, apellidos2, email, contraseña, telefono], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Error al registrar el cliente');
      }
      res.status(201).send('Cliente registrado con éxito');
    });
  } else {
    // Si no es un POST, responde con un 405 (Método no permitido)
    res.status(405).send('Método no permitido');
  }
};
