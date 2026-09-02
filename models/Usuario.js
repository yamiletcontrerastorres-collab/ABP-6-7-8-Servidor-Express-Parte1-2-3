const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Usuario = sequelize.define(
    "Usuario",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },

        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        contrasena: {
            type: DataTypes.STRING,
            allowNull: false
        },

        fecha_creacion: {
            type: DataTypes.DATE
        }
    },
    {
        tableName: "usuarios",
        timestamps: false
    }
);

module.exports = Usuario;