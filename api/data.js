// /api/data.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = (req, res) => {
    
  if (req.method === 'GET' || req.method ==='POST') {
     
    // Si la solicitud es GET, obtiene los datos
    connection.query('SELECT * FROM clientes', (error, results) => {
      if (error) {
        console.error('Error en la consulta: ', error);
        return res.status(500).json({ error: 'Error en la consulta' });
      }
      res.json(results);
    });
  } else {
    // Si no es un GET, responde con un 405 (Método no permitido)
    res.status(405).send('Método no permitido');
  }
};
