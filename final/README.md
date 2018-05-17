# Aplicación final para la materia Proyecto de Software | 2017

### Grupo 46
* Onofri Camila Ayelén
* Raimondi Sebastian

## Requisitos para poder usar la app

1. Instalar **Node.js**, ver [aqui](https://nodejs.org/es/download/package-manager/).
2. Necesitamos la herramnienta **npm** que viene junto con Node.js. Para ver si estan ambos instalados correctamente, correr en una terminal `node -v` y `npm -v`, respectivamente.
3. Instalar **Loopback** globalmente corriendo en una termianl `npm install -g loopback-cli`.
4. Debemos instalar **MongoDB**, ver [aqui](https://docs.mongodb.com/manual/administration/install-community/).
5. Situados en la carpeta _'final'_, correr desde una terminal `npm install` para instalar las dependencias que necesita el backend para funcionar correctamente.
6. Situados en la carpeta _'client'_, correr desde una terminal `npm install` que necesita el frontend para funcionar correctamente.

## Cómo usar la app

1. Antes que nada, debemos importar (o mejor dicho 'restaurar') la base de datos. Para esto, debemos correr desde consola el comando `sudo mongorestore -d ProyectoLoopback <path hacia dump folder>`. Una vez hecho esto, correr desde consola `sudo service mongod start` para levantar el servidor de bases de datos. 
2. Situados en la carpeta _'final'_, correr desde una terminal `node .` para levantar un servidor web en el puerto 3001 y poder usar la API del backend, hecha con loopback.
3. Situados en la carpeta _'client'_, correr desde una terminal `npm start` para levantar un servidor web en el puerto 3000 y poder usar la aplicacion del fronted, hecha con React.


## Documentación

### Fundamentación de frameworks elegidos

Para llevar a cabo la realización del producto de software planteado por la cátedra, optamos por separar totalmente el fronted del backend. Ésto fue todo un desafío para el grupo ya que no estábamos acostumbrados a desarrollar de ésta manera, pero luego de realizar un poco de investigación a la hora de elegir el enfoque a seguir, notamos las numerosas ventajas que tiene considerar el frontend y el backend como proyectos independiente (pero relacionados, por su puesto). Pensamos a la aplicación web planteada como un 'conjunto de pantallas' que consume servicios, los cuales podrian ser reutilizados por 'otras pantallas', de otras aplicaciones. Para explicar mejor lo anterior, planteamos el siguiente ejemplo: ¿Qué pasaría si en un futuro se quisiera hacer un aplicación del hospital para celulares? (¿Por qué no?). Teniendo los servicios donde se ejecuta la logica y se accede a los datos desacoplados totalmente de las interfaces de usuario, no tendriamos ningun tipo de problema en comunicarnos con ese backend realizado para la aplicacion web y así reutilizar lo servicios previamente desarrollados. 

Ahora bien, hablando en concreto de las herramientas utilizadas para el desarrollo, para el backend elegimos el framework **Loopback**, y para el frontend usamos la libreria de Javascript **React**, junto con la librería **Material UI**. Procederemos a fundamentar la elección de las herramientas mencionadas.

**¿Por qué Loopback?**
Loopback es un framework para Node.js que nos permite crear APIs y conectarlas a fuentes de datos. La razón de su uso en éste proyecto se debe al hecho de que genera código de API automáticamente, prácticamente sin escribir ni una linea de código, usando los comandos que provee a través de una terminal. Además, simplifica la conección a bases de datos, proveyendo una capa de abstracción total a la hora de trabajar con éstas. Por otra parte, viene con un _API Explorer_ integrado que nos permite ver fácilmente los resultados de nuestro trabajo a través del navagador.

**¿Por qué React?**
React es una librería Javascript que proviene de Facebook, focalizada en el desarrollo de interfaces de usuario. Sirve para desarrollar aplicaciones web de una manera más ordenada, ágil, flexible y con menos código que si usas Javascript puro o librerías como jQuery centradas en la manipulación del DOM. Permite que las vistas se asocien con los datos, de tal forma que si cambian los datos, también cambian las vistas. Así, no necesitamos escribir código para manipular la página cuando los datos cambian. React le pone más 'inteligencia' a la necesidad de actualizar una vista solo cuando es necesario, y lo consigue mediante el "DOM Virtual", que es mucho más rápido que actualizar el DOM del navegador. Ésta característica fue la que nos hizo poner el foco en React cuando estábamos buscando con qué herramienta desarrollar el frontend:  React compara el DOM Virtual con el DOM del navegador y sabe perfectamente qué partes de la página debe actualizar, ahorrando así la necesidad de actualizar la vista entera. Es algo muy potente y permite obtener un rendimiento totalmente optimizado. Lo que nos pareció interesante es que ésto se hace de manera transparente para el desarrollador; no se requiere intervenir en nada para lograr una gran performance.

Por otro lado, usamos la librería Material UI para mejorar la vista de las pantallas, ya que presenta componentes de React que implementan los principios de diseño planteados por Google, los cuales nos parecen muy interesantes y sentimos le dan un estilo muy profesional a las aplicaciones.

### Referencias

**Loopback**
* [Bases](http://loopback.io/getting-started/)
* [Modelos anidados](https://www.youtube.com/watch?v=bhQd3bFUQ1Q)

**React**
* [Bases](https://reactjs.org/tutorial/tutorial.html)

**Material UI**
* [Bases](https://material-ui-next.com/getting-started/installation/)
* [Entendiendo Material UI](https://www.youtube.com/watch?v=xm4LX5fJKZ8&list=PLcCp4mjO-z98WAu4sd0eVha1g-NMfzHZk)
* [Extendiendo tablas en Material UI](https://www.youtube.com/watch?v=SX_IL7LqSxM)


### Modulos aprovechados

### Mecanismo provisto para el manejo de seguridad y routing

### Mecanismo provisto para operaciones CRUD

### Forma de manejar el MVC

"Quizás nos sirva decir que sería la "V" en un framework "MVC", aunque es solo una manera de hablar, puesto que React podría ocupar también parcelas de lo que sería la "C". Todo depende de nuestra manera de trabajar aunque, no obstante, esta posible carencia con respecto a los frameworks Javascript se soluciona con capas adicionales a React. Lo que podría interpretarse como una desventaja, muchos desarrolladores lo entienden como una ventaja con respecto a frameworks completos, ya que tú puedes desarrollar con React a tu gusto, aplicando aquellas herramientas y librerías adicionales que hacen las cosas como mejor se adapte al proyecto."





# Esto se saca después

### Modulos por alumno:

Camila:
* 2.3 Modulo de Pacientes
* 2.4 Modulo de Datos Demograficos
* 3.1 Modulo de Historia Clinica
* 3.2 Acceso a API de Referencias

Sebastian:
* 2.1 Manejo de Sesiones
* 2.2 Modulo de Usuarios
* 2.5 Modulo de Configuracion
* 3.3 API de turnos
* 3.4 Reportes

## Tips para la DB

* importar (restaurar) --> `sudo mongorestore -d ProyectoLoopback <path hacia dump>`(ver dump)
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

