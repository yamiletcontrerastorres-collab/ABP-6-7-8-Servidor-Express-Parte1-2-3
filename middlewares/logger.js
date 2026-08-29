const fs = require("fs");
const path = require("path");

const logDirectory = path.join(__dirname, "..", "logs");
const logFile = path.join(logDirectory, "log.txt");

// Crear carpeta logs si no existe
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

// Middleware para registrar las solicitudes
const registrarVisita = (req, res, next) => {
    const fecha = new Date().toISOString();

    const mensaje = `${fecha} - Método: ${req.method} - Ruta: ${req.originalUrl}\n`;

    fs.appendFile(logFile, mensaje, (error) => {
        if (error) {
            console.error("Error al escribir en el archivo de log:", error);
        }
    });

    next();
};

module.exports = registrarVisita;