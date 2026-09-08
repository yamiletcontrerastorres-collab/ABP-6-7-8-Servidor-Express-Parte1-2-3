// Importa Express y crea el router para organizar las rutas
const express = require("express");
const router = express.Router();

// Middleware para verificar el token JWT
const verificarToken = require("../middlewares/auth");

// Middleware para manejar la subida de archivos con Multer
const upload = require("../middlewares/upload");


// Controlador para consultar el estado del servidor
const { getStatus } = require("../controllers/statusController");

// Controladores relacionados con usuarios e historial
const {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    crearUsuarioConTransaccion,
    obtenerUsuariosORM,
    obtenerUsuariosConHistorial,
    loginUsuario,
    obtenerHistorial,
    crearHistorial,
    actualizarHistorial,
    eliminarHistorial
} = require("../controllers/usuarioController");


// -------------------- ESTADO DEL SERVIDOR --------------------

// Comprueba que el servidor esté funcionando
router.get("/status", getStatus);


// -------------------- USUARIOS --------------------

// Obtener usuarios
// Esta ruta está protegida y necesita un token JWT válido
router.get("/usuarios", verificarToken, obtenerUsuarios);

// Crear usuario
router.post("/usuarios", crearUsuario);

// Actualizar usuario mediante su ID
router.put("/usuarios/:id", actualizarUsuario);

// Eliminar usuario mediante su ID
router.delete("/usuarios/:id", eliminarUsuario);


// -------------------- TRANSACCIONES --------------------

// Crear un usuario utilizando una transacción de PostgreSQL
router.post("/usuarios/transaccion", crearUsuarioConTransaccion);


// -------------------- SEQUELIZE --------------------

// Obtener usuarios utilizando Sequelize
router.get("/usuarios-orm", obtenerUsuariosORM);

// Obtener usuarios junto con su historial utilizando la relación de Sequelize
// Esta ruta también está protegida mediante JWT
router.get(
    "/usuarios-historial",
    verificarToken,
    obtenerUsuariosConHistorial
);


// -------------------- AUTENTICACIÓN --------------------

// Iniciar sesión y obtener un token JWT
router.post("/login", loginUsuario);


// -------------------- HISTORIAL --------------------

// Obtener todos los registros del historial
router.get("/historial", obtenerHistorial);

// Crear un nuevo registro en el historial
router.post("/historial", crearHistorial);

// Actualizar un registro del historial mediante su ID
router.put("/historial/:id", actualizarHistorial);

// Eliminar un registro del historial mediante su ID
router.delete("/historial/:id", eliminarHistorial);


// -------------------- SUBIDA DE ARCHIVOS --------------------

// Recibe un archivo enviado con el nombre "archivo"
router.post("/upload", (req, res) => {

    upload.single("archivo")(req, res, (error) => {

        // Si Multer encuentra un error, devuelve una respuesta controlada
        if (error) {
            return res.status(400).json({
                status: "error",
                message: error.message
            });
        }

        // Comprueba que realmente se haya recibido un archivo
        if (!req.file) {
            return res.status(400).json({
                status: "error",
                message: "No se recibió ningún archivo"
            });
        }

        // Devuelve los datos principales del archivo guardado
        res.status(201).json({
            status: "success",
            message: "Archivo subido correctamente",
            data: {
                nombre: req.file.filename,
                tipo: req.file.mimetype,
                tamaño: req.file.size
            }
        });

    });

});


// Exporta el router para utilizarlo en index.js
module.exports = router;