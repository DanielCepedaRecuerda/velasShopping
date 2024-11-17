const mysql = require('mysql2/promise');

const connection = async () => {
  return mysql.createPool({
    host: 'localhost', // Cambiar según tu configuración
    user: 'root',
    password: 'password',
    database: 'nombre_de_tu_base_de_datos',
    waitForConnections: true,
    connectionLimit: 10,
  });
};

module.exports = connection;
