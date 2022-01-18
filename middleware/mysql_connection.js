const mysql = require("mysql");

//Mysql connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  database: "db_inss",
  port: 3340,
  dateStrings: true, //pour formater les dates
});
module.exports = connection;
