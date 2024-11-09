// api/data.js
const getConnection = require('../db.js');

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).send('Método no permitido');
    }

    try {
        const connection = await getConnection();
        
        const [results] = await connection.execute('SELECT * FROM clientes');
        
        await connection.end();
        res.status(200).json(results);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}
