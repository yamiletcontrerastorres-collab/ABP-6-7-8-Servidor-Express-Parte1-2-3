// Importa los tipos de datos de Sequelize
const { DataTypes } = require("sequelize");

// Importa la conexión con Sequelize
const sequelize = require("./sequelize");


// Modelo de la tabla historial_usuarios
const Historial = sequelize.define(
    "Historial",
    {
        // ID del registro
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        // ID del usuario relacionado con el historial
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        // Acción realizada por el usuario
        accion: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Fecha en que se realizó la acción
        fecha: {
            type: DataTypes.DATE
        }
    },
    {
        // Nombre de la tabla en PostgreSQL
        tableName: "historial_usuarios",

        // No utiliza las fechas automáticas de Sequelize
        timestamps: false
    }
);


// Exporta el modelo para utilizarlo en otros archivos
module.exports = Historial;