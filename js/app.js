// app.js
const express = require('express');
const connection = require('../db'); // Importar la conexión
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Usar CORS si es necesario
app.use(cors());

// Ruta para obtener datos de la base de datos
app.get('/api/prueba', (req, res) => {
  connection.query('SELECT * FROM clientes', (error, results) => {
    if (error) {
      console.error('Error en la consulta: ', error);
      return res.status(500).json({ error: 'Error en la consulta' });
    }
    res.json(results);
  });
});


// app.post('/api/post', (req, res) => {

//   res.json(result);
// })

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
