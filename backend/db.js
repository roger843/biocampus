const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // si tienes password aquí la pones, si no, se deja vacío
  database: "biocampus"
});

module.exports = db;
