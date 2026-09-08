# ABP 6-7-8 - Servidor Node.js y Express

Este proyecto corresponde al Trabajo Práctico Integrador desarrollado progresivamente durante los módulos de Backend.

En la **Parte 1 - Módulo 6** se creó la estructura inicial del servidor utilizando Node.js y Express.

En la **Parte 2 - Módulo 7** se incorporó una base de datos PostgreSQL, operaciones CRUD, transacciones, Sequelize y relaciones entre modelos.

En la **Parte 3 - Módulo 8** se incorporó autenticación con JWT, protección de rutas, subida de archivos con Multer y nuevas funcionalidades para completar la API REST.

---

# Parte 1 - Módulo 6

## Descripción

El objetivo de la primera parte fue crear un servidor básico utilizando Node.js y Express, trabajar con rutas, controladores, middlewares y archivos planos, dejando una estructura organizada para continuar incorporando nuevas funcionalidades.

---

## Tecnologías utilizadas

- Node.js
- Express.js
- Nodemon
- Dotenv
- PostgreSQL
- pg
- Sequelize
- Módulo fs
- HTML
- npm

---

## Instalación

Para instalar las dependencias del proyecto:

```bash
npm install
```

Para utilizar las variables de entorno se debe crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```text
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nodeexpressapp
```

El archivo `.env` se encuentra incluido en `.gitignore` para evitar que las credenciales de la base de datos sean publicadas en GitHub.

---

## Ejecución

Para ejecutar el proyecto normalmente:

```bash
npm start
```

Para ejecutarlo en modo desarrollo utilizando Nodemon:

```bash
npm run dev
```

El servidor funciona de manera local en:

```text
http://localhost:3000
```

---

## Estructura del proyecto

```text
NodeExpressApp/
│
├── controllers/
│   ├── statusController.js
│   └── usuarioController.js
│
├── logs/
│   └── log.txt
│
├── middlewares/
│   ├── logger.js
│   ├── auth.js
│   └── upload.js
│
├── models/
│   ├── sequelize.js
│   ├── Usuario.js
│   ├── Historial.js
│   └── relaciones.js
│
├── public/
│   └── index.html
│
├── routes/
│   └── routes.js
│
├── uploads/
│
├── .env
├── .gitignore
├── db.js
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

---

## Rutas de la Parte 1

### GET /

Ruta principal de la aplicación.

```text
http://localhost:3000/
```

### GET /status

Permite comprobar que el servidor se encuentra funcionando correctamente.

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

Se utiliza un middleware junto con el módulo `fs` de Node.js para registrar las solicitudes realizadas al servidor.

Los registros se almacenan en:

```text
logs/log.txt
```

Ejemplo:

```text
2026-08-27T20:36:56.018Z - Método: GET - Ruta: /status
```

Esto permite mantener un registro básico de las peticiones realizadas al servidor.

---

## Organización de la Parte 1

El proyecto se organizó en diferentes carpetas para separar las responsabilidades del servidor:

- `routes`: contiene las rutas.
- `controllers`: contiene la lógica asociada a las rutas.
- `middlewares`: contiene funciones intermedias como el registro de solicitudes.
- `public`: contiene los archivos estáticos.
- `logs`: contiene el archivo de registro.
- `models`: contiene los modelos incorporados posteriormente para trabajar con Sequelize.

También se utiliza `express.static()` para servir los archivos de la carpeta `public`.

---

## Decisiones tomadas en la Parte 1

Se utilizó `index.js` como archivo principal del servidor.

Las rutas, controladores y middlewares se separaron en diferentes archivos para mantener el código más organizado y facilitar la incorporación de nuevas funcionalidades.

También se utilizó `dotenv` para trabajar con variables de entorno y `.gitignore` para evitar subir archivos como `node_modules` y `.env` al repositorio.

---

## Reflexión Parte 1

Durante esta primera parte aprendí a crear un servidor con Node.js y Express y a organizar mejor los archivos del proyecto.

También pude entender de mejor manera cómo funcionan las rutas, los controladores y los middlewares, además de utilizar `fs` para guardar registros en un archivo de texto.

Todavía estoy aprendiendo a trabajar con este tipo de estructura, pero esta primera parte me permitió entender mejor cómo se organiza un backend.

---

# Parte 2 - Módulo 7

## Descripción

En esta segunda parte del proyecto se incorporó una base de datos PostgreSQL al servidor desarrollado anteriormente.

El objetivo fue permitir que los usuarios se almacenen de forma persistente en una base de datos y realizar operaciones de creación, lectura, actualización y eliminación.

También se incorporaron transacciones, Sequelize como ORM y relaciones entre modelos.

---

## Base de datos PostgreSQL

Se creó una base de datos llamada:

```text
nodeexpressapp
```

La conexión entre Node.js y PostgreSQL se realiza mediante el paquete `pg`.

La configuración de conexión se encuentra en:

```text
db.js
```

Se decidió utilizar `pg` porque permite conectar directamente una aplicación Node.js con PostgreSQL y ejecutar consultas SQL desde el servidor.

Las credenciales necesarias para realizar la conexión se almacenan mediante variables de entorno en `.env`.

Este archivo no se publica en GitHub porque se encuentra incluido en `.gitignore`, evitando exponer información sensible como la contraseña de PostgreSQL.

---

## Tabla usuarios

Se creó una tabla `usuarios` para almacenar los datos principales.

Sus campos son:

```text
id
nombre
correo
contrasena
fecha_creacion
```

El campo `id` funciona como clave primaria y se genera automáticamente.

El correo debe ser único y los campos principales no pueden quedar vacíos.

---

## CRUD de usuarios

Durante esta parte se implementaron operaciones CRUD para trabajar con datos reales almacenados en PostgreSQL.

CRUD corresponde a:

```text
Create  → Crear
Read    → Leer
Update  → Actualizar
Delete  → Eliminar
```

---

### GET /usuarios

Permite obtener los usuarios registrados en PostgreSQL.

```text
GET http://localhost:3000/usuarios
```

La contraseña no se incluye en la respuesta JSON para evitar mostrar información sensible.

La respuesta contiene información como:

```json
{
    "status": "success",
    "message": "Usuarios obtenidos correctamente",
    "data": []
}
```

---

### POST /usuarios

Permite registrar un nuevo usuario en PostgreSQL.

```text
POST http://localhost:3000/usuarios
```

Ejemplo de datos enviados:

```json
{
    "nombre": "Usuario Prueba",
    "correo": "prueba@email.com",
    "contrasena": "123456"
}
```

Antes de realizar la operación se comprueba que los campos necesarios hayan sido enviados.

---

### PUT /usuarios/:id

Permite actualizar un usuario utilizando su ID.

Ejemplo:

```text
PUT http://localhost:3000/usuarios/8
```

Se decidió actualizar solamente el nombre y el correo porque son los datos necesarios para esta operación y no es necesario modificar la contraseña.

Ejemplo:

```json
{
    "nombre": "Usuario Actualizado",
    "correo": "actualizado@email.com"
}
```

Si el ID solicitado no corresponde a ningún usuario, el servidor devuelve un mensaje indicando que el usuario no fue encontrado.

---

### DELETE /usuarios/:id

Permite eliminar un usuario mediante su ID.

Ejemplo:

```text
DELETE http://localhost:3000/usuarios/8
```

Si el usuario existe se elimina y se devuelve un mensaje de confirmación.

Si el ID no existe, se devuelve un mensaje indicando que el usuario no fue encontrado.

---

## Validaciones y manejo de errores

Se incorporaron validaciones básicas para evitar operaciones incorrectas.

Por ejemplo:

- Comprobar que los datos obligatorios sean enviados al crear un usuario.
- Comprobar si un usuario existe antes de determinadas operaciones.
- Evitar mostrar la contraseña en las consultas de usuarios.
- Manejar errores mediante bloques `try/catch`.
- Devolver mensajes claros cuando una operación falla.

Las respuestas utilizan una estructura JSON consistente.

Ejemplo:

```json
{
    "status": "success",
    "message": "Operación realizada correctamente",
    "data": {}
}
```

---

## Transacciones

También se implementó una transacción para proteger operaciones que necesitan realizar más de una acción en la base de datos.

La transacción realiza dos acciones consecutivas:

1. Crear un usuario.
2. Registrar la creación del usuario en la tabla `historial_usuarios`.

La ruta utilizada es:

```text
POST /usuarios/transaccion
```

Si ambas operaciones funcionan correctamente se ejecuta:

```text
COMMIT
```

Esto confirma y guarda los cambios.

Si alguna de las operaciones falla se ejecuta:

```text
ROLLBACK
```

Esto revierte la operación completa y evita guardar información incompleta.

Para comprobar el funcionamiento del `ROLLBACK` se realizó una prueba forzando un error en el campo `accion` del historial.

Al fallar la segunda operación, el usuario que se estaba intentando crear tampoco quedó registrado en la base de datos.

De esta forma se comprobó que la transacción mantiene la consistencia de los datos.

---

## Tabla historial_usuarios

Se creó una segunda tabla llamada:

```text
historial_usuarios
```

Esta tabla permite registrar acciones relacionadas con los usuarios.

Contiene los campos:

```text
id
usuario_id
accion
fecha
```

`usuario_id` funciona como clave foránea y permite relacionar cada registro del historial con un usuario existente.

---

## Sequelize ORM

En esta segunda parte también se incorporó Sequelize.

Sequelize es un ORM que permite trabajar con una base de datos relacional mediante modelos y métodos de JavaScript.

Se crearon los siguientes modelos:

```text
models/Usuario.js
models/Historial.js
```

El modelo `Usuario` representa la tabla `usuarios`.

El modelo `Historial` representa la tabla `historial_usuarios`.

La configuración de Sequelize se encuentra en:

```text
models/sequelize.js
```

---

## Consulta mediante Sequelize

Se creó la siguiente ruta:

```text
GET /usuarios-orm
```

Esta ruta obtiene los usuarios mediante Sequelize utilizando:

```javascript
Usuario.findAll()
```

Anteriormente, con `pg`, las consultas se realizaban escribiendo SQL manualmente mediante:

```javascript
pool.query()
```

Ambas formas permiten acceder a la misma base de datos PostgreSQL.

La principal diferencia es que con SQL tradicional se escribe directamente la consulta, mientras que Sequelize permite realizar las operaciones utilizando modelos y métodos de JavaScript.

Una ventaja que encontré al utilizar Sequelize es que permite mantener el acceso a los datos más organizado y facilita el manejo de las relaciones entre las tablas.

---

## Relación entre Usuario e Historial

Se creó una relación de tipo uno a muchos:

```text
Usuario 1 ---- N Historial
```

Esto significa que un usuario puede tener varios registros en su historial.

En cambio, cada registro del historial pertenece a un solo usuario.

La relación se definió en:

```text
models/relaciones.js
```

Utilizando:

```javascript
Usuario.hasMany(Historial, {
    foreignKey: "usuario_id",
    as: "historial"
});

Historial.belongsTo(Usuario, {
    foreignKey: "usuario_id",
    as: "usuario"
});
```

---

## Consulta de relaciones con Sequelize

Se creó la ruta:

```text
GET /usuarios-historial
```

Esta ruta permite obtener los usuarios junto con sus registros del historial.

Para realizar esta consulta se utiliza `include` de Sequelize.

De esta manera se pueden obtener los datos relacionados en una misma consulta y devolverlos de forma organizada en JSON.

Un usuario sin registros puede mostrar:

```json
{
    "id": 1,
    "nombre": "Usuario",
    "historial": []
}
```

Mientras que un usuario con registros puede mostrar:

```json
{
    "id": 5,
    "nombre": "Francisca",
    "historial": [
        {
            "id": 1,
            "accion": "Usuario creado mediante transacción"
        }
    ]
}
```

---

## Rutas disponibles

### Rutas iniciales

```text
GET     /
GET     /status
GET     /api
POST    /api/usuarios
```

### Rutas PostgreSQL

```text
GET     /usuarios
POST    /usuarios
PUT     /usuarios/:id
DELETE  /usuarios/:id
```

### Transacciones

```text
POST    /usuarios/transaccion
```

### Sequelize

```text
GET     /usuarios-orm
GET     /usuarios-historial
```

---

## SQL tradicional y Sequelize

Durante el proyecto se utilizaron las dos formas de acceso a datos.

### SQL con pg

Permite escribir directamente consultas SQL.

Ejemplo:

```javascript
pool.query(
    "SELECT id, nombre, correo, fecha_creacion FROM usuarios ORDER BY id"
);
```

### Sequelize

Permite trabajar mediante modelos y métodos de JavaScript.

Ejemplo:

```javascript
Usuario.findAll()
```

Trabajar primero con SQL me permitió entender de mejor manera qué operaciones se realizan directamente sobre PostgreSQL.

Posteriormente, Sequelize permitió realizar consultas utilizando modelos y manejar de una forma más sencilla la relación entre usuarios e historial.

---

## Seguridad de los datos

Las credenciales de PostgreSQL se almacenan mediante variables de entorno.

El archivo:

```text
.env
```

se encuentra excluido del repositorio mediante:

```text
.gitignore
```

Además, las consultas GET de usuarios no devuelven el campo `contrasena`.

Esto permite evitar la exposición innecesaria de información sensible.

---

## Pruebas

Las rutas fueron probadas utilizando Postman.

Se realizaron pruebas de:

- Lectura de usuarios con GET.
- Creación de usuarios con POST.
- Actualización mediante PUT.
- Eliminación mediante DELETE.
- Transacción exitosa.
- Transacción con error y ROLLBACK.
- Consulta mediante Sequelize.
- Consulta de usuarios junto con su historial.

También se comprobó el funcionamiento del `ROLLBACK` verificando posteriormente que el usuario utilizado en la prueba no quedara almacenado en PostgreSQL.

---

## Reflexión Parte 2

Durante esta segunda parte aprendí a conectar un servidor Node.js con una base de datos PostgreSQL y a trabajar con datos almacenados de forma persistente.

Personalmente algunas partes de la conexión y las consultas fueron difíciles de entender, pero al probar cada ruta por separado pude comprender mejor cómo se comunica Node.js con PostgreSQL.

Se logra entender para que sirven las transacciones y vi  que `ROLLBACK` permite evitar que se guarden datos incompletos cuando una de las operaciones falla.

Sequelize fue algo nuevo para mí. Al utilizarlo pude entender que un ORM permite representar las tablas mediante modelos de JavaScript y facilita el trabajo con relaciones entre los datos.

Todavía necesito seguir practicando estos conceptos y me queda un larguisimo camino por recorrer pero esta parte del proyecto me permitió comprender mejor cómo funciona el acceso a una base de datos desde un backend.

---

## Estado del proyecto

La Parte 1, Parte 2 y Parte 3 se encuentran funcionando correctamente.

Actualmente el proyecto cuenta con:

- Servidor Node.js y Express.
- Rutas y controladores.
- Middleware para registro de solicitudes.
- Persistencia mediante archivo de log.
- Conexión con PostgreSQL.
- CRUD de usuarios.
- Validaciones y manejo de errores.
- Transacciones con COMMIT y ROLLBACK.
- Sequelize como ORM.
- Modelos de Usuario e Historial.
- Relación uno a muchos entre Usuario e Historial.
- Consultas de relaciones mediante Sequelize.
- Autenticación mediante JWT.
- Rutas protegidas mediante middleware.
- Subida y validación de archivos con Multer.
- CRUD de historial_usuarios.
- Búsqueda filtrada de usuarios por nombre.


## Parte 3 - Módulo 8

En esta etapa se incorporó autenticación mediante JWT, protección de rutas, subida de archivos con Multer y nuevas operaciones CRUD para una segunda entidad.

### Autenticación con JWT

Se creó el endpoint:

POST /login

Este endpoint permite iniciar sesión utilizando correo y contraseña. Si las credenciales son correctas, el servidor genera un token JWT con una duración de 1 hora.

El token debe enviarse en las rutas protegidas utilizando:

Authorization: Bearer TOKEN

Rutas protegidas:

GET /usuarios
GET /usuarios-historial

Si no se envía el token, el servidor responde con error 401.

### Subida de archivos

Se implementó:

POST /upload

La subida de archivos se realiza utilizando Multer.

Configuración utilizada:

- Archivos permitidos: JPG, JPEG y PNG
- Tamaño máximo: 2 MB
- Carpeta de almacenamiento: uploads/

Los archivos subidos pueden visualizarse mediante:

/uploads/nombre-del-archivo

También se agregó validación para rechazar tipos de archivo no permitidos.

### CRUD de historial

Se agregó un CRUD para la entidad historial_usuarios.

Endpoints:

GET /historial
POST /historial
PUT /historial/:id
DELETE /historial/:id

Esto permite obtener, crear, actualizar y eliminar registros del historial.

### Búsqueda filtrada

El endpoint de usuarios permite realizar búsquedas por nombre utilizando parámetros en la URL.

Ejemplo:

GET /usuarios?nombre=Valentina

La búsqueda utiliza ILIKE para permitir coincidencias sin importar mayúsculas o minúsculas.

### Endpoints principales

GET /status
GET /usuarios
POST /usuarios
PUT /usuarios/:id
DELETE /usuarios/:id
POST /usuarios/transaccion
GET /usuarios-orm
GET /usuarios-historial
POST /login
GET /historial
POST /historial
PUT /historial/:id
DELETE /historial/:id
POST /upload

### Tecnologías utilizadas en esta etapa

- Node.js
- Express.js
- PostgreSQL
- Sequelize
- JSON Web Token
- Multer
- Postman

### Seguridad

Se utilizó JWT para controlar el acceso a rutas protegidas.

Las variables sensibles, como la clave JWT y los datos de conexión a PostgreSQL, se almacenan en el archivo .env y este archivo no se incluye en GitHub.

El token JWT no se almacena en el servidor. El cliente debe enviarlo en cada solicitud protegida mediante el encabezado Authorization.

### Reflexión técnica - Parte 3

En esta parte del proyecto aprendí a agregar autenticación a una API utilizando JWT. 

También aprendí a subir archivos utilizando Multer y a validar el tipo de archivo que se permite subir. Uno de los problemas que tuve fue el manejo de errores cuando se intentaba subir un archivo no permitido, pero despues de unas batallas, pude solucionarlo para que la API mostrara una respuesta más clara.

Además, se completó un segundo CRUD utilizando la tabla historial_usuarios y se agregó una búsqueda filtrada de usuarios por nombre.

Esta etapa me permitió comprender mejor cómo se pueden combinar rutas, controladores, middleware, bases de datos, autenticación y subida de archivos dentro de una misma aplicación.

**Nombre:** Yamilet Contreras  
**Proyecto:** ABP N°6-7-8-Servidor Node.js y Express  
**Módulo:** 8 - Parte 3