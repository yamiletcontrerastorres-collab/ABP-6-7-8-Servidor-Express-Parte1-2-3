const express = require("express");
const router = express.Router();

const { getStatus } = require("../controllers/statusController");

const {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    crearUsuarioConTransaccion,
    obtenerUsuariosORM,
    obtenerUsuariosConHistorial
} = require("../controllers/usuarioController");

// Estado del servidor
router.get("/status", getStatus);

// Obtener usuarios
router.get("/usuarios", obtenerUsuarios);

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
router.get("/usuarios-historial", obtenerUsuariosConHistorial);

module.exports = router;