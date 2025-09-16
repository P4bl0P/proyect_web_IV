import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "user$yo", // Coloca tu contraseña de MySQL
  database: "grupoiv",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default connection;
