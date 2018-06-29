# Notas

### Modulos por alumno:

Camila:
* 2.3 Modulo de Pacientes
* 2.4 Modulo de Datos Demograficos
* 3.1 Modulo de Historia Clinica
* 3.2 Acceso a API de Referencias
* 3.4 Reportes

Sebastian:
* 2.1 Manejo de Sesiones
* 2.2 Modulo de Usuarios
* 2.5 Modulo de Configuracion
* 3.3 API de turnos


## Tips para la DB

* importar (restaurar) --> `sudo mongorestore -d ProyectoLoopback <path hacia dump>`
* dump --> `mongodump -d ProyectoLoopback -o <target directory>`
* ver schemas, etc --> `mongo --shell` y luego `use ProyectoLoopback` + `show collections`

## Cosas que instale para el frontend

* npm install material-ui@next
* npm install axios --save
* npm install --save react-router react-router-dom
* to be able to have css modules ...
    * run `npm run eject`
    * en webpack.config.dev.js buscar  _test: /\.css$/_ y dentro del objeto _options_ que esta en _use_ poner los siguientes atributos: _modules: true, localIdentName: '[name]__[local]__[hash:base64:5]'_
    * hacer lo mismo para webpack.config.prod.js
* para manipulacion de fechas --> Moment

