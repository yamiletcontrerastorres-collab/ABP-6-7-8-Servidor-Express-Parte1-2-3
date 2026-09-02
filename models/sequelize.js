console.log("sequelize.js se está ejecutando");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: "postgres",
        logging: false
    }
);

sequelize.authenticate()
    .then(() => {
        console.log("Sequelize conectado correctamente a PostgreSQL.");
    })
    .catch((error) => {
        console.error("Error al conectar Sequelize:", error.message);
    });

module.exports = sequelize;
