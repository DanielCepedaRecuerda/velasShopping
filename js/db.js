// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'velasshopping.c94kw4uiss1b.eu-west-2.rds.amazonaws.com', // Tu endpoint
  user: process.env.DB_USER || 'velasShoping', // Tu nombre de usuario
  password: process.env.DB_PASS || 'velasShoping2024', // Tu contraseña
  database: process.env.DB_NAME || 'velasshoping', // Nombre de tu base de datos
  port: 3306, // Puerto MySQL
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando: ' + err.stack);
    return;
  }
  console.log('Conectado como id ' + connection.threadId);
});

// Exportar la conexión para usarla en otros archivos
module.exports = connection;
