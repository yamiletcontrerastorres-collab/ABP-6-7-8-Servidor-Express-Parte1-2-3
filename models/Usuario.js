// Importa DataTypes para definir los tipos de datos del modelo
const { DataTypes } = require("sequelize");

// Importa la conexión de Sequelize con PostgreSQL
const sequelize = require("./sequelize");


// -------------------- MODELO USUARIO --------------------

// Define el modelo Usuario y su relación con la tabla "usuarios"
const Usuario = sequelize.define(
    "Usuario",
    {
        // Identificador único del usuario
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        // Nombre del usuario
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Correo electrónico del usuario
        // No puede estar vacío ni repetirse
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        // Contraseña del usuario
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Fecha en que fue creado el usuario
        fecha_creacion: {
            type: DataTypes.DATE
        }
    },
    {
        // Indica el nombre real de la tabla en PostgreSQL
        tableName: "usuarios",

        // Desactiva las columnas automáticas createdAt y updatedAt de Sequelize
        timestamps: false
    }
);


// Exporta el modelo para utilizarlo en otras partes del proyecto
module.exports = Usuario;