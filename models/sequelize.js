// Importa Sequelize para trabajar con PostgreSQL mediante un ORM
const { Sequelize } = require("sequelize");


// -------------------- CONFIGURACIÓN DE SEQUELIZE --------------------

// Crea la conexión utilizando los datos almacenados en el archivo .env
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),

        // Indica que la base de datos utilizada es PostgreSQL
        dialect: "postgres",

        // Evita que Sequelize muestre cada consulta SQL en la consola
        logging: false
    }
);


// -------------------- COMPROBAR CONEXIÓN --------------------

// Comprueba que Sequelize pueda conectarse correctamente a PostgreSQL
sequelize.authenticate()

    // Si la conexión funciona, muestra un mensaje en la consola
    .then(() => {
        console.log("Sequelize conectado correctamente a PostgreSQL.");
    })

    // Si ocurre un problema, muestra el error en la consola
    .catch((error) => {
        console.error("Error al conectar Sequelize:", error.message);
    });


// Exporta la conexión para utilizarla en los modelos
module.exports = sequelize;