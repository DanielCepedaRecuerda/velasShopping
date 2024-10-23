const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Para permitir solicitudes de otros dominios

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Para analizar solicitudes JSON

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Endpoint para registrar un nuevo cliente
app.post('/api/register', (req, res) => {
    const { nombre, apellido1, apellidos2, email, contraseña, telefono } = req.body;

    const query = 'INSERT INTO clientes (nombre, apellido1, apellidos2, email, contraseña, telefono, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, NOW())';
    connection.query(query, [nombre, apellido1, apellidos2, email, contraseña, telefono], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al registrar el cliente');
        }
        res.status(201).send('Cliente registrado con éxito');
    });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
