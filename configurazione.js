const mysql = require("mysql2");

const port = process.env.HOST_PORT;
const domain = process.env.HOST_DOMAIN;
const frontendUrl = process.env.FRONTEND_URL;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

module.exports = connection;
