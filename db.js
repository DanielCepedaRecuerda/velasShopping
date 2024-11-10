// db.js
const mysql = require('mysql2/promise');

const getConnection =  () => {
  return  mysql.createConnection({
    host: "velasshopping.c94kw4uiss1b.eu-west-2.rds.amazonaws.com",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3306,
  });
};

module.exports = getConnection;
