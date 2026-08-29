require("dotenv").config();

const express = require("express");
const registrarVisita = require("./middlewares/logger");
const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para recibir JSON
app.use(express.json());

// Middleware para registrar las visitas en logs/log.txt
app.use(registrarVisita);

// Archivos estáticos
app.use(express.static("public"));

// Ruta principal
app.get("/", (req, res) => {
    res.send("¡Hola! Mi servidor Express está funcionando correctamente.");
});

// Ruta de API
app.get("/api", (req, res) => {
    res.json({
        mensaje: "Bienvenido a mi API",
        estado: "funcionando"
    });
});

// Ruta POST para recibir usuarios
app.post("/api/usuarios", (req, res) => {
    const usuario = req.body;

    res.json({
        mensaje: "Usuario recibido correctamente",
        usuario: usuario
    });
});

// Rutas externas
app.use("/", routes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});