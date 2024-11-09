// api/register.js
const getConnection = require('../db.js');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Método no permitido');
    }

    const { nombre, apellido1, apellido2, email, contraseña, telefono } = req.body;

    try {
        const connection = await getConnection();

        const query = `
            INSERT INTO clientes (nombre, apellido1, apellido2, email, contraseña, telefono, fecha_registro)
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        `;
        await connection.execute(query, [nombre, apellido1, apellido2, email, contraseña, telefono]);

        await connection.end();
        res.status(201).send('Cliente registrado con éxito');
    } catch (error) {
        console.error('Error al registrar el cliente:', error);
        res.status(500).send('Error al registrar el cliente');
    }
}
