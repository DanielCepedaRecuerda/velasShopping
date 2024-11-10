// /api/register.js
const connection = require("../db"); // Importar la conexión

module.exports = (req, res) => {
  // if (req.method === 'POST') {
  const { nombre, apellido1, apellido2, email, contraseña, telefono } =
    req.body;
  const query =
    "INSERT INTO clientes (nombre, apellido1, apellido2, email, contraseña, telefono, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, NOW())";

  connection().then((conn) =>
    conn.query(
      query,
      [nombre, apellido1, apellido2, email, contraseña, telefono],
      (error, results) => {
        if (error) {
        return res.status(404).json({mensaje: "Error al crear"}); // Imprime el error en el log de Vercel
          
        }
        return res.status(201).json({mensaje: "Cliente creado"});
        
      }
    )
  );
};
