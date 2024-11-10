// db.js
const mysql = require('mysql2/promise');

const getConnection =  () => {
  return  mysql.createConnection({
    host: "velasshopping.c94kw4uiss1b.eu-west-2.rds.amazonaws.com",
    user: "velasShoping",
    password: "velasShoping2024",
    database: "velasshoping",
    port: 3306,
  });
};

module.exports = getConnection;
