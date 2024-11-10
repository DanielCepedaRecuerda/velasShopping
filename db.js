// db.js
const mysql = require('mysql2/promise');

const getConnection =  () => {
  return  mysql.createConnection({
    // host: process.env.DB_HOST,
    host: "hola",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3306,
  });
};

module.exports = getConnection;
