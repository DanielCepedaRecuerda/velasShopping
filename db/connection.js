const mysql = require("mysql2/promise");

let pool;

const connection = async () => {
  if (!pool) {
    try {
      pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: 3306,
        waitForConnections: true,
        connectionLimit: 10,
      });
    } catch (error) {
      console.error("Error al crear el pool de conexiones:", error);
      throw error;
    }
  }
  return pool;
};
module.exports = connection;
