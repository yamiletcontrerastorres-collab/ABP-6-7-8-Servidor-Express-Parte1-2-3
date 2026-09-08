const express = require("express");
const verificarToken = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const router = express.Router();


const { getStatus } = require("../controllers/statusController");

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

// Estado del servidor
router.get("/status", getStatus);

// Obtener usuarios
router.get("/usuarios", verificarToken, obtenerUsuarios);

// Crear usuario
router.post("/usuarios", crearUsuario);

// Actualizar usuario
router.put("/usuarios/:id", actualizarUsuario);

// Eliminar usuario
router.delete("/usuarios/:id", eliminarUsuario);

// Crear usuario con transacción
router.post("/usuarios/transaccion", crearUsuarioConTransaccion);

// Obtener usuarios utilizando Sequelize
router.get("/usuarios-orm", obtenerUsuariosORM);

// Obtener usuarios junto con su historial
router.get("/usuarios-historial", verificarToken, obtenerUsuariosConHistorial);

// Login de usuario
router.post("/login", loginUsuario);

// Obtener todo el historial
router.get("/historial", obtenerHistorial);

// Crear un nuevo historial
router.post("/historial", crearHistorial);

// Actualizar historial
router.put("/historial/:id", actualizarHistorial);

// Eliminar historial
router.delete("/historial/:id", eliminarHistorial);

// Ruta para subir archivos
router.post("/upload", (req, res) => {

    upload.single("archivo")(req, res, (error) => {

        if (error) {
            return res.status(400).json({
                status: "error",
                message: error.message
            });
        }

        if (!req.file) {
            return res.status(400).json({
                status: "error",
                message: "No se recibió ningún archivo"
            });
        }

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

module.exports = router;