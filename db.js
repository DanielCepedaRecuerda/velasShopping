// db.js
const mysql = require('mysql2/promise');

const getConnection =  () => {

  console.log(process.env.DB_HOST);
  console.log(process.env.DB_USER);
  console.log(process.env.DB_PASS);
  console.log(process.env.DB_NAME);

  return  mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3306,
  });
};

module.exports = getConnection;
