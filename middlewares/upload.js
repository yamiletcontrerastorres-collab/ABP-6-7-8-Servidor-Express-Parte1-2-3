// Importa Multer para manejar la subida de archivos
const multer = require("multer");

// Importa Path para trabajar con la extensión de los archivos
const path = require("path");


// -------------------- ALMACENAMIENTO --------------------

// Configura dónde y con qué nombre se guardarán los archivos
const storage = multer.diskStorage({

    // Define la carpeta donde se guardarán los archivos
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    // Genera un nombre único para evitar archivos con el mismo nombre
    filename: (req, file, cb) => {

        // Date.now() utiliza la fecha y hora actual para crear un nombre único
        // path.extname mantiene la extensión original, por ejemplo .jpg o .png
        const nombreUnico =
            Date.now() + path.extname(file.originalname);

        cb(null, nombreUnico);
    }
});


// -------------------- VALIDACIÓN --------------------

// Valida el tipo de archivo antes de guardarlo
const fileFilter = (req, file, cb) => {

    // Tipos de imágenes permitidos
    const tiposPermitidos = [
        "image/jpeg",
        "image/png"
    ];

    // Comprueba si el archivo pertenece a los tipos permitidos
    if (tiposPermitidos.includes(file.mimetype)) {

        // Acepta el archivo
        cb(null, true);

    } else {

        // Rechaza el archivo si su tipo no está permitido
        cb(new Error("Tipo de archivo no permitido"));
    }
};


// -------------------- CONFIGURACIÓN DE MULTER --------------------

const upload = multer({

    // Utiliza la configuración de almacenamiento creada anteriormente
    storage,

    // Utiliza la función que valida el tipo de archivo
    fileFilter,

    // Limita el tamaño máximo de los archivos
    limits: {

        // Tamaño máximo permitido: 2 MB
        fileSize: 2 * 1024 * 1024
    }
});


// Exporta la configuración para utilizarla en las rutas
module.exports = upload;