# ABP6 - Proyecto Node.js + Express

## Parte 1 - Módulo 6

Este proyecto corresponde a la primera parte del Trabajo Práctico Integrador de Full Stack JavaScript.

El objetivo de esta etapa es desarrollar la estructura inicial del backend utilizando Node.js y Express, creando un servidor capaz de servir contenido web, gestionar diferentes rutas y registrar las solicitudes realizadas mediante persistencia básica en archivos planos.

Esta estructura también permitirá continuar posteriormente con la integración de una base de datos y otras funcionalidades del proyecto.

---

## Tecnologías utilizadas

- Node.js
- Express.js
- Nodemon
- Dotenv
- Módulo `fs` de Node.js
- HTML
- npm

---

## Instalación

Primero se deben instalar las dependencias del proyecto:

```bash
npm install
```

---

## Ejecución

### Modo desarrollo

```bash
npm run dev
```

Este comando utiliza Nodemon para reiniciar automáticamente el servidor cuando se realizan cambios en el código.

### Modo normal

```bash
npm start
```

El servidor se ejecuta por defecto en:

```text
http://localhost:3000
```

El puerto se configura mediante una variable de entorno en el archivo `.env`.

---

## Scripts disponibles

- `npm start`: inicia el servidor utilizando Node.js.
- `npm run dev`: inicia el servidor utilizando Nodemon.

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
├── .env
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

---

## Rutas disponibles

### GET /

Ruta principal del servidor.

```text
http://localhost:3000/
```

Permite acceder al contenido principal de la aplicación.

### GET /status

```text
http://localhost:3000/status
```

Permite comprobar que el servidor se encuentra funcionando correctamente.

Ejemplo de respuesta:

```json
{
    "status": "success",
    "message": "Servidor funcionando correctamente"
}
```

### GET /api

```text
http://localhost:3000/api
```

Devuelve información básica sobre el funcionamiento de la API.

Ejemplo:

```json
{
    "mensaje": "Bienvenido a mi API",
    "estado": "funcionando"
}
```

### POST /api/usuarios

Permite enviar información de un usuario mediante una petición POST.

La información recibida se devuelve en formato JSON como comprobación del funcionamiento de la ruta.

---

## Archivos estáticos

La aplicación utiliza:

```js
express.static("public")
```

para servir archivos estáticos desde la carpeta `public`.

En esta carpeta se encuentra el archivo `index.html`.

---

## Registro de solicitudes

Se implementó un middleware utilizando el módulo `fs` de Node.js.

El middleware registra las solicitudes realizadas al servidor dentro de:

```text
logs/log.txt
```

Cada registro contiene la fecha, el método HTTP utilizado y la ruta solicitada.

Ejemplo:

```text
2026-08-27T20:36:56.018Z - Método: GET - Ruta: /status
```

Esto permite aplicar persistencia básica mediante archivos planos.

---

## Variables de entorno

Se utiliza el paquete `dotenv` para cargar configuraciones desde el archivo `.env`.

Actualmente se utiliza para definir el puerto del servidor:

```text
PORT=3000
```

El archivo `.env` se encuentra incluido en `.gitignore` para evitar publicar configuraciones privadas en el repositorio.

---

## Organización del backend

El proyecto fue dividido en diferentes carpetas para mantener una estructura clara y facilitar su crecimiento.

- `routes`: contiene la definición de las rutas.
- `controllers`: contiene la lógica asociada a las rutas.
- `middlewares`: contiene funciones que se ejecutan durante el procesamiento de las solicitudes.
- `public`: contiene los archivos estáticos.
- `logs`: almacena el registro de solicitudes.

Esta separación permite que el proyecto sea más fácil de mantener y prepara la aplicación para las siguientes etapas.

---

## Justificación de decisiones técnicas

Se utilizó `index.js` como archivo principal porque permite identificar fácilmente el punto de entrada de la aplicación.

Express fue utilizado para crear el servidor y administrar las rutas de una forma sencilla y organizada.

Se utilizó `express.static()` para servir contenido web desde la carpeta `public`.

El registro de solicitudes fue implementado como middleware utilizando el módulo `fs`, permitiendo almacenar información en un archivo plano (`log.txt`).

También se separó la ruta `/status` de su lógica mediante las carpetas `routes` y `controllers`. Esto permite mantener responsabilidades separadas y facilita agregar nuevas funcionalidades en el futuro.

Se utilizó `dotenv` para separar configuraciones del código principal y se creó `.gitignore` para evitar subir `node_modules` y `.env` al repositorio.

---

## Reflexión técnica

Durante el desarrollo de esta primera parte pude comprender mejor cómo se estructura un servidor utilizando Node.js y Express.

Uno de los aspectos más importantes fue entender cómo se relacionan las rutas, los controladores y los middlewares. Al principio puede resultar confuso separar estas funciones en diferentes archivos, pero esta organización permite que el proyecto sea más claro y fácil de ampliar.

Esta primera estructura deja preparado el backend para continuar agregando funcionalidades en las siguientes etapas del proyecto, como la conexión con una base de datos y nuevas rutas de la aplicación.