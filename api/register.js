// /api/register.js
const mysql = require('mysql2');

module.exports = (req, res) => {
    if (req.method == 'POST') {
      const { nombre, apellido1, apellido2, email, contraseña, telefono } = req.body;
      const query = 'INSERT INTO clientes (nombre, apellido1, apellido2, email, contraseña, telefono, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, NOW())';
  
      connection.query(query, [nombre, apellido1, apellido2, email, contraseña, telefono], (error, results) => {
        if (error) {
          console.error('Error en la consulta: ', error);  // Imprime el error en el log de Vercel
          return res.status(500).json({ error: 'Error al registrar el cliente', details: error.message });
        }
        res.status(201).send('Cliente registrado con éxito');
      });
    } else {
      res.status(405).send('Método no permitido');
    }
  };
  
