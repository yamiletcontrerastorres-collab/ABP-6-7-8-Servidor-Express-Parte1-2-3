// Importa JSON Web Token para verificar los tokens de autenticación
const jwt = require("jsonwebtoken");


// Middleware encargado de verificar el token JWT
const verificarToken = (req, res, next) => {

    // Obtiene el encabezado Authorization enviado por el cliente
    const authHeader = req.headers.authorization;

    // Comprueba si se envió el encabezado Authorization
    if (!authHeader) {
        return res.status(401).json({
            status: "error",
            message: "Token no proporcionado"
        });
    }

    // Extrae solamente el token del formato: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    // Comprueba que exista un token después de "Bearer"
    if (!token) {
        return res.status(401).json({
            status: "error",
            message: "Token no válido"
        });
    }

    try {

        // Verifica que el token sea válido utilizando la clave de .env
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Guarda los datos del token para poder utilizarlos en la solicitud
        req.usuario = decoded;

        // Si el token es válido, permite continuar hacia la ruta
        next();

    } catch (error) {

        // Si el token es incorrecto o expiró, se rechaza el acceso
        return res.status(401).json({
            status: "error",
            message: "Token inválido o expirado"
        });
    }
};


// Exporta el middleware para utilizarlo en las rutas protegidas
module.exports = verificarToken;