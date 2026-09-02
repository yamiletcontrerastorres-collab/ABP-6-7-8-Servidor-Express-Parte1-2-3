const pool = require("../db");

const {
    Usuario,
    Historial
} = require("../models/relaciones");


// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const resultado = await pool.query(
            "SELECT id, nombre, correo, fecha_creacion FROM usuarios ORDER BY id"
        );

        res.json({
            status: "success",
            message: "Usuarios obtenidos correctamente",
            data: resultado.rows
        });

    } catch (error) {
        console.error("Error al obtener usuarios:", error.message);

        res.status(500).json({
            status: "error",
            message: "Error al obtener los usuarios"
        });
    }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
    try {
        const { nombre, correo, contrasena } = req.body;

        // Validar que los campos tengan datos
        if (!nombre || !correo || !contrasena) {
            return res.status(400).json({
                status: "error",
                message: "Todos los campos son obligatorios"
            });
        }

        const resultado = await pool.query(
            `INSERT INTO usuarios (nombre, correo, contrasena)
             VALUES ($1, $2, $3)
             RETURNING id, nombre, correo, fecha_creacion`,
            [nombre, correo, contrasena]
        );

        res.status(201).json({
            status: "success",
            message: "Usuario creado correctamente",
            data: resultado.rows[0]
        });

    } catch (error) {
        console.error("Error al crear usuario:", error.message);

        res.status(500).json({
            status: "error",
            message: "Error al crear el usuario"
        });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo } = req.body;

        const resultado = await pool.query(
            `UPDATE usuarios
             SET nombre = $1, correo = $2
             WHERE id = $3
             RETURNING id, nombre, correo, fecha_creacion`,
            [nombre, correo, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }

        res.json({
            status: "success",
            message: "Usuario actualizado correctamente",
            data: resultado.rows[0]
        });

    } catch (error) {
        console.error("Error al actualizar usuario:", error.message);

        res.status(500).json({
            status: "error",
            message: "Error al actualizar el usuario"
        });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            "DELETE FROM usuarios WHERE id = $1 RETURNING id, nombre, correo",
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }

        res.json({
            status: "success",
            message: "Usuario eliminado correctamente",
            data: resultado.rows[0]
        });

    } catch (error) {
        console.error("Error al eliminar usuario:", error.message);

        res.status(500).json({
            status: "error",
            message: "Error al eliminar el usuario"
        });
    }
};

// Crear usuario usando una transacción
const crearUsuarioConTransaccion = async (req, res) => {
    const client = await pool.connect();

    try {
        const { nombre, correo, contrasena, forzarError } = req.body;

        if (!nombre || !correo || !contrasena) {
            return res.status(400).json({
                status: "error",
                message: "Todos los campos son obligatorios"
            });
        }

        await client.query("BEGIN");

        const usuario = await client.query(
            `INSERT INTO usuarios (nombre, correo, contrasena)
             VALUES ($1, $2, $3)
             RETURNING id, nombre, correo`,
            [nombre, correo, contrasena]
        );

        const accion = forzarError
            ? null
            : "Usuario creado mediante transacción";

        await client.query(
            `INSERT INTO historial_usuarios (usuario_id, accion)
             VALUES ($1, $2)`,
            [usuario.rows[0].id, accion]
        );

        await client.query("COMMIT");

        console.log("Transacción completada correctamente");

        res.status(201).json({
            status: "success",
            message: "Transacción realizada correctamente",
            data: usuario.rows[0]
        });

    } catch (error) {
        await client.query("ROLLBACK");

        console.error("Transacción revertida:", error.message);

        res.status(500).json({
            status: "error",
            message: "La transacción falló y se realizó ROLLBACK"
        });

    } finally {
        client.release();
    }
};

// Obtener usuarios utilizando Sequelize
const obtenerUsuariosORM = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ["id", "nombre", "correo", "fecha_creacion"]
        });

        res.json({
            status: "success",
            message: "Usuarios obtenidos correctamente con Sequelize",
            data: usuarios
        });

    } catch (error) {
        console.error("Error al obtener usuarios con Sequelize:", error.message);

        res.status(500).json({
            status: "error",
            message: "Error al obtener los usuarios con Sequelize"
        });
    }
};

// Obtener usuarios junto con su historial usando Sequelize
const obtenerUsuariosConHistorial = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ["id", "nombre", "correo", "fecha_creacion"],
            include: {
                model: Historial,
                as: "historial",
                attributes: ["id", "accion", "fecha"]
            }
        });

        res.json({
            status: "success",
            message: "Usuarios e historial obtenidos correctamente",
            data: usuarios
        });

    } catch (error) {
        console.error("Error al obtener usuarios con historial:", error.message);

        res.status(500).json({
            status: "error",
            message: "Error al obtener usuarios con historial"
        });
    }
};


module.exports = {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    crearUsuarioConTransaccion,
    obtenerUsuariosORM,
    obtenerUsuariosConHistorial
};