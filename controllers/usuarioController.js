// Importa la conexión con PostgreSQL
const pool = require("../db");

// Importa JWT para generar tokens de autenticación
const jwt = require("jsonwebtoken");

// Importa los modelos y sus relaciones de Sequelize
const {
    Usuario,
    Historial
} = require("../models/relaciones");


// -------------------- USUARIOS --------------------

// Obtener todos los usuarios o filtrarlos por nombre
const obtenerUsuarios = async (req, res) => {
    try {
        // Obtiene el nombre enviado como parámetro en la URL
        const { nombre } = req.query;

        // Consulta base para obtener los usuarios
        let consulta = `
            SELECT id, nombre, correo, fecha_creacion
            FROM usuarios
        `;

        let valores = [];

        // Si se envía un nombre, se agrega un filtro a la consulta
        if (nombre) {
            consulta += " WHERE nombre ILIKE $1";
            valores.push(`%${nombre}%`);
        }

        // Ordena los resultados por ID
        consulta += " ORDER BY id";

        const resultado = await pool.query(consulta, valores);

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

        // Inserta el nuevo usuario en PostgreSQL
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


// Actualizar un usuario mediante su ID
const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo } = req.body;

        // Actualiza el nombre y correo del usuario
        const resultado = await pool.query(
            `UPDATE usuarios
             SET nombre = $1, correo = $2
             WHERE id = $3
             RETURNING id, nombre, correo, fecha_creacion`,
            [nombre, correo, id]
        );

        // Comprueba si el usuario existe
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


// Eliminar un usuario mediante su ID
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        // Elimina el usuario de PostgreSQL
        const resultado = await pool.query(
            "DELETE FROM usuarios WHERE id = $1 RETURNING id, nombre, correo",
            [id]
        );

        // Comprueba si el usuario existe
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


// -------------------- TRANSACCIONES --------------------

// Crear usuario usando una transacción
const crearUsuarioConTransaccion = async (req, res) => {

    // Obtiene una conexión individual del pool
    const client = await pool.connect();

    try {
        const { nombre, correo, contrasena, forzarError } = req.body;

        // Comprueba que los campos obligatorios tengan datos
        if (!nombre || !correo || !contrasena) {
            return res.status(400).json({
                status: "error",
                message: "Todos los campos son obligatorios"
            });
        }

        // Inicia la transacción
        await client.query("BEGIN");

        // Primero crea el usuario
        const usuario = await client.query(
            `INSERT INTO usuarios (nombre, correo, contrasena)
             VALUES ($1, $2, $3)
             RETURNING id, nombre, correo`,
            [nombre, correo, contrasena]
        );

        // Permite provocar un error para comprobar el ROLLBACK
        const accion = forzarError
            ? null
            : "Usuario creado mediante transacción";

        // Registra la creación del usuario en el historial
        await client.query(
            `INSERT INTO historial_usuarios (usuario_id, accion)
             VALUES ($1, $2)`,
            [usuario.rows[0].id, accion]
        );

        // Si las dos operaciones funcionan, confirma los cambios
        await client.query("COMMIT");

        console.log("Transacción completada correctamente");

        res.status(201).json({
            status: "success",
            message: "Transacción realizada correctamente",
            data: usuario.rows[0]
        });

    } catch (error) {

        // Si ocurre un error, revierte todos los cambios
        await client.query("ROLLBACK");

        console.error("Transacción revertida:", error.message);

        res.status(500).json({
            status: "error",
            message: "La transacción falló y se realizó ROLLBACK"
        });

    } finally {

        // Libera la conexión para que pueda volver a utilizarse
        client.release();
    }
};


// -------------------- SEQUELIZE --------------------

// Obtener usuarios utilizando Sequelize
const obtenerUsuariosORM = async (req, res) => {
    try {

        // findAll obtiene todos los usuarios utilizando el modelo
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

        // include permite obtener el historial relacionado con cada usuario
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


// -------------------- AUTENTICACIÓN JWT --------------------

// Iniciar sesión y generar token JWT
const loginUsuario = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        // Comprueba que se hayan enviado las credenciales
        if (!correo || !contrasena) {
            return res.status(400).json({
                status: "error",
                message: "Correo y contraseña son obligatorios"
            });
        }

        // Busca un usuario que coincida con las credenciales recibidas
        const resultado = await pool.query(
            `SELECT id, nombre, correo
             FROM usuarios
             WHERE correo = $1 AND contrasena = $2`,
            [correo, contrasena]
        );

        // Si no encuentra al usuario, rechaza el inicio de sesión
        if (resultado.rows.length === 0) {
            return res.status(401).json({
                status: "error",
                message: "Credenciales incorrectas"
            });
        }

        const usuario = resultado.rows[0];

        // Genera un token JWT válido durante una hora
        const token = jwt.sign(
            {
                id: usuario.id,
                correo: usuario.correo
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Devuelve el usuario y el token generado
        res.json({
            status: "success",
            message: "Inicio de sesión correcto",
            data: {
                usuario,
                token
            }
        });

    } catch (error) {
        console.error("Error al iniciar sesión:", error.message);

        res.status(500).json({
            status: "error",
            message: "Error al iniciar sesión"
        });
    }
};


// -------------------- HISTORIAL --------------------

// Obtener todo el historial
const obtenerHistorial = async (req, res) => {
    try {
        const resultado = await pool.query(
            "SELECT * FROM historial_usuarios ORDER BY id"
        );

        res.json({
            status: "success",
            data: resultado.rows
        });

    } catch (error) {
        console.error("Error al obtener historial:", error.message);

        res.status(500).json({
            status: "error",
            message: "Error al obtener el historial"
        });
    }
};


// Crear un registro en el historial
const crearHistorial = async (req, res) => {
    try {
        const { usuario_id, accion } = req.body;

        // Comprueba que los campos necesarios hayan sido enviados
        if (!usuario_id || !accion) {
            return res.status(400).json({
                status: "error",
                message: "usuario_id y accion son obligatorios"
            });
        }

        // Inserta un nuevo registro en historial_usuarios
        const resultado = await pool.query(
            `INSERT INTO historial_usuarios (usuario_id, accion)
             VALUES ($1, $2)
             RETURNING *`,
            [usuario_id, accion]
        );

        res.status(201).json({
            status: "success",
            message: "Historial creado correctamente",
            data: resultado.rows[0]
        });

    } catch (error) {
        console.error("Error al crear historial:", error.message);

        res.status(500).json({
            status: "error",
            message: "Error al crear el historial"
        });
    }
};


// Actualizar un registro del historial
const actualizarHistorial = async (req, res) => {
    try {
        const { id } = req.params;
        const { accion } = req.body;

        // Comprueba que se haya enviado una acción
        if (!accion) {
            return res.status(400).json({
                status: "error",
                message: "La acción es obligatoria"
            });
        }

        // Actualiza el registro mediante su ID
        const resultado = await pool.query(
            `UPDATE historial_usuarios
             SET accion = $1
             WHERE id = $2
             RETURNING *`,
            [accion, id]
        );

        // Comprueba si el registro existe
        if (resultado.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Historial no encontrado"
            });
        }

        res.json({
            status: "success",
            message: "Historial actualizado correctamente",
            data: resultado.rows[0]
        });

    } catch (error) {
        console.error("Error al actualizar historial:", error.message);

        res.status(500).json({
            status: "error",
            message: "Error al actualizar el historial"
        });
    }
};


// Eliminar un registro del historial
const eliminarHistorial = async (req, res) => {
    try {
        const { id } = req.params;

        // Elimina el registro mediante su ID
        const resultado = await pool.query(
            `DELETE FROM historial_usuarios
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        // Comprueba si el registro existe
        if (resultado.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Historial no encontrado"
            });
        }

        res.json({
            status: "success",
            message: "Historial eliminado correctamente",
            data: resultado.rows[0]
        });

    } catch (error) {
        console.error("Error al eliminar historial:", error.message);

        res.status(500).json({
            status: "error",
            message: "Error al eliminar el historial"
        });
    }
};


// -------------------- EXPORTACIONES --------------------

// Exporta los controladores para utilizarlos en routes.js
module.exports = {
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
};