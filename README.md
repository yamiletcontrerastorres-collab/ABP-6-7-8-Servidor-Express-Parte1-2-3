# ABP6 - Servidor Node.js y Express

## Parte 1 - Módulo 6

Este proyecto corresponde a la primera parte del Trabajo Práctico Integrador.

El objetivo es crear un servidor básico utilizando Node.js y Express, trabajar con rutas, middlewares y archivos planos, dejando una estructura organizada para continuar el proyecto en los siguientes módulos.

---

## Tecnologías utilizadas

- Node.js
- Express.js
- Nodemon
- Dotenv
- Módulo fs
- HTML
- npm

---

## Instalación

Para instalar las dependencias:

```bash
npm install
```

Para utilizar las variables de entorno se debe crear un archivo `.env` en la raíz del proyecto con:

```text
PORT=3000
```

---

## Ejecución

Para ejecutar el proyecto normalmente:

```bash
npm start
```

Para ejecutarlo en modo desarrollo con Nodemon:

```bash
npm run dev
```

El servidor funciona en:

```text
http://localhost:3000
```

---

## Estructura del proyecto

```text
NodeExpressApp/
│
├── controllers/
│   └── statusController.js
│
├── logs/
│   └── log.txt
│
├── middlewares/
│   └── logger.js
│
├── public/
│   └── index.html
│
├── routes/
│   └── routes.js
│
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

---

## Rutas

### GET /

Ruta principal de la aplicación.

```text
http://localhost:3000/
```

### GET /status

Permite comprobar que el servidor está funcionando.

Ejemplo de respuesta:

```json
{
    "status": "success",
    "message": "Servidor funcionando correctamente"
}
```

### GET /api

Devuelve un mensaje indicando el estado de la API.

### POST /api/usuarios

Permite enviar datos de un usuario mediante una petición POST y recibirlos como respuesta en formato JSON.

---

## Registro de solicitudes

Se utiliza un middleware y el módulo `fs` para registrar las solicitudes realizadas al servidor.

Los registros se guardan en:

```text
logs/log.txt
```

Ejemplo:

```text
2026-08-27T20:36:56.018Z - Método: GET - Ruta: /status
```

---

## Organización del proyecto

El proyecto se organizó en diferentes carpetas para separar las funciones:

- `routes`: contiene las rutas.
- `controllers`: contiene la lógica de las rutas.
- `middlewares`: contiene el registro de solicitudes.
- `public`: contiene los archivos estáticos.
- `logs`: contiene el archivo de registro.

También se utiliza `express.static()` para servir los archivos de la carpeta `public`.

---

## Decisiones tomadas

Se utilizó `index.js` como archivo principal del servidor.

Se separaron las rutas, controladores y middlewares para mantener el código más ordenado y facilitar la incorporación de nuevas funciones.

También se utilizó `dotenv` para manejar el puerto mediante variables de entorno y `.gitignore` para evitar subir `node_modules` y `.env` al repositorio.

---

## Reflexión

Durante esta primera parte aprendí a crear un servidor con Node.js y Express y a organizar mejor los archivos del proyecto.

También pude entender de mejor manera cómo funcionan las rutas, los controladores y los middlewares, además de utilizar `fs` para guardar registros en un archivo de texto.

Todavía estoy aprendiendo a trabajar con este tipo de estructura, pero esta primera parte me permitió entender mejor cómo se organiza un backend.

---

## Estado del proyecto

La Parte 1 se encuentra funcionando correctamente y queda preparada para continuar con la integración de una base de datos y nuevas funcionalidades en los siguientes módulos.