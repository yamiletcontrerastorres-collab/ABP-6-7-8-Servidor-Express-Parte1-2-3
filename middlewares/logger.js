// Importa los módulos necesarios para trabajar con archivos y rutas
const fs = require("fs");
const path = require("path");


// Define la ubicación de la carpeta logs y del archivo log.txt
const logDirectory = path.join(__dirname, "..", "logs");
const logFile = path.join(logDirectory, "log.txt");


// Crea la carpeta logs si no existe
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}


// Middleware para registrar las solicitudes realizadas al servidor
const registrarVisita = (req, res, next) => {

    // Obtiene la fecha y hora actual
    const fecha = new Date().toISOString();

    // Guarda el método y la ruta de la solicitud
    const mensaje = `${fecha} - Método: ${req.method} - Ruta: ${req.originalUrl}\n`;

    // Agrega la información al archivo log.txt
    fs.appendFile(logFile, mensaje, (error) => {
        if (error) {
            console.error("Error al escribir en el archivo de log:", error);
        }
    });

    // Permite continuar con la siguiente función o ruta
    next();
};


// Exporta el middleware para utilizarlo en index.js
module.exports = registrarVisita;