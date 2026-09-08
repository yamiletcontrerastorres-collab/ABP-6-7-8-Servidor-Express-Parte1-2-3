// Importa los modelos
const Usuario = require("./Usuario");
const Historial = require("./Historial");


// -------------------- RELACIONES --------------------

// Un usuario puede tener muchos registros de historial
Usuario.hasMany(Historial, {
    foreignKey: "usuario_id",
    as: "historial"
});

// Cada registro del historial pertenece a un usuario
Historial.belongsTo(Usuario, {
    foreignKey: "usuario_id",
    as: "usuario"
});


// Exporta los modelos con sus relaciones
module.exports = {
    Usuario,
    Historial
};