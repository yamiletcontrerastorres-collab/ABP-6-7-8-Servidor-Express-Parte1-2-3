const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.query("SELECT NOW()")
    .then(() => {
        console.log("Conexión a PostgreSQL establecida correctamente.");
    })
    .catch((error) => {
        console.error("Error al conectar con PostgreSQL:", error.message);
    });

module.exports = pool;