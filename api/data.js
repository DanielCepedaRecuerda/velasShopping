// /api/data.js
const mysql = require('mysql2');

// Configura la conexión solo una vez
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Verifica la conexión
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos establecida');
  }
});

module.exports = (req, res) => {
  // Confirma si el método es GET
  if (req.method === 'GET') {
    // Realiza la consulta a la base de datos
    connection.query('SELECT * FROM clientes', (error, results) => {
      if (error) {
        console.error('Error en la consulta:', error);
        return res.status(500).json({ error: 'Error en la consulta' });
      }
      res.status(200).json(results);
    });
  } else {
    // Responde con un 405 si el método no es GET
    res.status(405).send('Método no permitido');
  }
};
