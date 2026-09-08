// Importa Pool desde PostgreSQL para manejar las conexiones a la base de datos
const { Pool } = require("pg");


// -------------------- CONEXIÓN A POSTGRESQL --------------------

// Crea un pool de conexiones utilizando los datos guardados en el archivo .env
const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


// Realiza una consulta simple para comprobar la conexión con PostgreSQL
pool.query("SELECT NOW()")

    // Si la consulta funciona, la conexión fue establecida correctamente
    .then(() => {
        console.log("Conexión a PostgreSQL establecida correctamente.");
    })

    // Si ocurre un problema, muestra el error en la consola
    .catch((error) => {
        console.error("Error al conectar con PostgreSQL:", error.message);
    });


// Exporta el pool para utilizar la conexión en otros archivos del proyecto
module.exports = pool;