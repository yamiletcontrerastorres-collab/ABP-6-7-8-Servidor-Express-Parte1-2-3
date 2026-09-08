// Cargar las variables de entorno desde el archivo .env
require("dotenv").config();

// Conectar la aplicación con la base de datos PostgreSQL
require("./db");

// Cargar la configuración y las relaciones de Sequelize
require("./models/sequelize");
require("./models/relaciones");

// Importar Express y los archivos principales del servidor
const express = require("express");
const registrarVisita = require("./middlewares/logger");
const routes = require("./routes/routes");

// Crear la aplicación de Express
const app = express();

// Definir el puerto del servidor
const PORT = process.env.PORT || 3000;

// Middleware para recibir datos en formato JSON
app.use(express.json());

// Middleware para registrar las visitas en logs/log.txt
app.use(registrarVisita);

// Permitir el acceso a archivos estáticos de la carpeta public
app.use(express.static("public"));

// Permitir acceder desde el navegador a los archivos subidos
app.use("/uploads", express.static("uploads"));

// Ruta principal del servidor
app.get("/", (req, res) => {
    res.send("¡Hola! Mi servidor Express está funcionando correctamente.");
});

// Ruta para comprobar el funcionamiento de la API
app.get("/api", (req, res) => {
    res.json({
        mensaje: "Bienvenido a mi API",
        estado: "funcionando"
    });
});

// Ruta POST básica para recibir datos de un usuario
app.post("/api/usuarios", (req, res) => {
    const usuario = req.body;

    res.json({
        mensaje: "Usuario recibido correctamente",
        usuario: usuario
    });
});

// Utilizar las rutas definidas en routes/routes.js
app.use("/", routes);

// Iniciar el servidor en el puerto configurado
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});