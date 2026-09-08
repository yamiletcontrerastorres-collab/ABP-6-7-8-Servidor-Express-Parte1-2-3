// Controlador para verificar el estado del servidor
const getStatus = (req, res) => {

    // Devuelve una respuesta indicando que el servidor funciona correctamente
    res.json({
        status: "success",
        message: "Servidor funcionando correctamente"
    });
};


// Exporta el controlador para utilizarlo en routes.js
module.exports = {
    getStatus
};