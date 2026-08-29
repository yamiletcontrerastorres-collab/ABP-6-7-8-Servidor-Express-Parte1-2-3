//controlador para verificar el estado del servidor

const getStatus = (req, res) => {
    res.json({
        status: "success",
        message: "Servidor funcionando correctamente"
    });
};

module.exports = {
    getStatus
};