const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Historial = sequelize.define(
    "Historial",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        accion: {
            type: DataTypes.STRING,
            allowNull: false
        },

        fecha: {
            type: DataTypes.DATE
        }
    },
    {
        tableName: "historial_usuarios",
        timestamps: false
    }
);

module.exports = Historial;