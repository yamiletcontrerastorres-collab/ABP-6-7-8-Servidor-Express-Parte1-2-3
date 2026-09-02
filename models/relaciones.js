const Usuario = require("./Usuario");
const Historial = require("./Historial");

// Un usuario puede tener muchos registros de historial
Usuario.hasMany(Historial, {
    foreignKey: "usuario_id",
    as: "historial"
});

// Cada registro de historial pertenece a un usuario
Historial.belongsTo(Usuario, {
    foreignKey: "usuario_id",
    as: "usuario"
});

module.exports = {
    Usuario,
    Historial
};