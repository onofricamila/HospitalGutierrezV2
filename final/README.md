# Aplicación final para la materia Proyecto de Software | 2017

### Grupo 46
* Onofri Camila Ayelén
* Raimondi Sebastian

## Requisitos para poder usar la app

1. Instalar **Node.js**, ver [aqui](https://nodejs.org/es/download/package-manager/).
2. Necesitamos la herramnienta **npm** que viene junto con Node.js. Para ver si estan ambos instalados correctamente, correr en una terminal `node -v` y `npm -v`, respectivamente.
3. Instalar **Loopback** globalmente corriendo en una termianl `npm install -g loopback-cli`.
4. Debemos instalar **MongoDB**, ver [aqui](https://docs.mongodb.com/manual/administration/install-community/).
5. Situados en la carpeta _'final'_ del código fuente, correr desde una terminal `npm install` para instalar las dependencias que necesita el backend para funcionar correctamente.
6. Situados en la carpeta _'client'_ del código fuente, correr desde una terminal `npm install` que necesita el frontend para funcionar correctamente.

## Cómo usar la app

1. Antes que nada, debemos correr desde consola `sudo service mongod start` para levantar el servidor de bases de datos. Una vez hecho esto, importar (o mejor dicho 'restaurar') la base de datos. Para esto, debemos correr desde consola el comando `sudo mongorestore -d ProyectoLoopback <path hacia dump folder>`.
2. Situados en la carpeta _'final'_, correr desde una terminal `node .` para levantar un servidor web en el puerto 3001 y poder usar la API del backend, hecha con Loopback.
3. Situados en la carpeta _'client'_, correr desde una terminal `npm start` para levantar un servidor web en el puerto 3000 y poder usar la aplicacion del fronted, hecha con React.

## Documentación

### Fundamentación de frameworks elegidos

Para llevar a cabo la realización del producto de software planteado por la cátedra, optamos por separar totalmente el fronted del backend. Ésto fue todo un desafío para el grupo ya que no estábamos acostumbrados a desarrollar de ésta manera, pero luego de realizar un poco de investigación a la hora de elegir el enfoque a seguir, notamos las numerosas ventajas que tiene considerar el frontend y el backend como proyectos independientes (pero relacionados, por su puesto). Pensamos a la aplicación web planteada como un 'conjunto de pantallas' que consumen servicios, los cuales podrian ser reutilizados por 'otras pantallas', de otras futuras aplicaciones. Para explicar mejor lo anterior, planteamos el siguiente ejemplo: ¿Qué pasaría si en un futuro se quisiera hacer un aplicación del hospital para celulares? (¿Por qué no?). Teniendo los servicios donde se ejecuta la logica y se accede a los datos desacoplados totalmente de las interfaces de usuario, no tendriamos ningun tipo de problema en comunicarnos con ese backend previamente realizado y así reutilizar lo servicios desarrollados, con un frontend totalmente distinto al de la aplicación web original. 

Ahora bien, hablando en concreto de las herramientas utilizadas para el desarrollo, para el backend elegimos el framework **Loopback**, y para el frontend usamos la libreria de Javascript **React**, junto con la librería **Material UI**. Procederemos a fundamentar la elección de las herramientas mencionadas.

**¿Por qué Loopback?**
Loopback es un framework para Node.js que nos permite crear APIs REST y conectarlas a fuentes de datos. La razón de su uso en éste proyecto se debe al hecho de que genera código de API automáticamente, prácticamente sin escribir ni una linea de código, usando los comandos que provee a través de una terminal. Además, simplifica la conección a bases de datos a partir de un ORM integrado, proveyendo una capa de abstracción total a la hora de trabajar con éstas. Por otra parte, viene con un built-in _API Explorer_ que nos permite ver fácilmente los resultados de nuestro trabajo a través del navagador.

**¿Por qué React?**
React es una librería Javascript que proviene de Facebook, focalizada en el desarrollo de interfaces de usuario. Sirve para desarrollar aplicaciones web de una manera más ordenada, ágil, flexible y con menos código que si usas Javascript puro o librerías como jQuery centradas en la manipulación del DOM. Permite que las vistas se asocien con los datos, de tal forma que si cambian los datos, también cambian las vistas. Así, no necesitamos escribir código para manipular la página cuando los datos cambian. React le pone más 'inteligencia' a la necesidad de actualizar una vista solo cuando es necesario, y lo consigue mediante el "DOM Virtual", que es mucho más rápido que actualizar el DOM del navegador. Ésta característica fue la que nos hizo poner el foco en React cuando estábamos buscando con qué herramienta desarrollar el frontend:  React compara el DOM Virtual con el DOM del navegador y sabe perfectamente qué partes de la página debe actualizar, ahorrando así la necesidad de actualizar la vista entera. Es algo muy potente y permite obtener un rendimiento totalmente optimizado. Lo que nos pareció interesante es que ésto se hace de manera transparente para el desarrollador; no se requiere intervenir en nada para lograr una gran performance.

Por otro lado, usamos la librería Material UI para mejorar la vista de las pantallas, ya que provee componentes de React que implementan los principios de diseño planteados por Google, los cuales nos parecen muy interesantes y sentimos le dan un aspecto muy profesional a las aplicaciones.

### Referencias

**Loopback**
* [Bases](http://loopback.io/getting-started/)
* [Modelos anidados](https://www.youtube.com/watch?v=bhQd3bFUQ1Q)

**React**
* [Tutorial completo](https://reactjs.org/tutorial/tutorial.html)

**Material UI**
* [Bases](https://material-ui-next.com/getting-started/installation/)
* [Entendiendo Material UI, tutorial completo](https://www.youtube.com/watch?v=xm4LX5fJKZ8&list=PLcCp4mjO-z98WAu4sd0eVha1g-NMfzHZk)
* [Extendiendo tablas en Material UI](https://www.youtube.com/watch?v=SX_IL7LqSxM)

### Modulos aprovechados

* El CRUD de usuarios, pacientes, datos demográficos e historia clinica se vio totalmente facilitado al usar Loopback (en cuanto a la lógica y el acceso a datos), ya que cada acción es un requerimiento http distinto que se le puede hacer a la API del backend, y el comportamiento ante cada solicitud no lo tenemos que programar nosotros, sino que se genera automaticamente cuando creamos los modelos de datos.
* El acceso a la API de referencias de la cátedra pudo ser simplificado usando React ya que descargamos una libreria para React llamada 'Axios', que se encarga de facilitar el envio de requerimientos http. También la usamos para comunicarnos con nuestra propia API.
* La paginación pedida para todos los listados de datos pudo ser aprovechada al usar Material UI como librería de diseño de interfaces de usuario ya que provee una tabla que se encarga de paginar los elementos que lista segun la cantidad que se le parametrice. Por ende, nos comunicamos con nuestra API para obtener los datos de configuracion que refieren a la paginación, le pasamos el número a la tabla, y pagina correctamente.

### Mecanismo provisto para el manejo de seguridad y routing

En cuanto al manejo de seguridad, Loopback permite el control de acceso a datos mediante la definición de restricciones en los modelos. Así, se puede especificar quien puede leer/escribir datos o ejecutar metodos en los modelos. El control de acceso está determinado por _ACLs_ (Access Control Lists), a través de un archivo '.json' que está relacionado con el modelo que restringe. 
Relacionada a la seguridad, se encuentra la Autentificación. Por defecto Loopback viene con un sistema que protege el acceso a datos basado en tokens. Cuando un usuario se autentifica, recibe el token que debe utilizar en las siguientes peticiones, el cual tiene un ttl.

Por otra parte, manejamos ruteo (más específicamente 'rueteo dinámico') en el frontend usando la libreria para React _react-router-dom_, para poder navegar a través de los distintos contenidos de la aplicación. Decimos 'ruteo dinámico' porque el ruteo se va realizando a medida que que la app se renderiza (no en una configuración fuera de la app que se encuentra corriendo, como parte de una 'inicialización' antes de que empiece a correr, lo que es más común ver).

### Mecanismo provisto para operaciones CRUD

Como detallamos previamente, Loopback nos provee de base las operaciones CRUD cuando generamos un modelo, y además nos expone los REST endpoints de la API del backend en el _API Explorer_ integrado para poder ver bien qué requerimiento http debemos mandar, a qué ruta y con qué parámetros, lo que es de gran ayuda a la hora de hacer los CRUDs.

### Forma de manejar el MVC

Considerando el backend y el fronted como proyectos diferentes, hablaremos de la manera de manejar MVC en cada uno de ellos. 

Por un lado, en lo que respecta al backend, la aplicación que provee servicios, el acceso a datos está dado por las funciones propias de loopback, que se generan automaticamente cuando creamos un modelo de datos (M). La lógica de la aplicación (C), se ve en las funciones también propias de loopback que se ejecutan como acción ante cada requerimiento http realizado por el cliente, el fronted, acorde a los endpoints disponibles. Luego, toda función ejecutada ante una solicitud del cliente devuelve información en formato JSON, lo cual puede ser considerado como parte de la vista (V).

Por otro lado, en el frontend, la aplicación que genera las distintas pantallas, podemos considerar la renderización de los componentes de React como la vista (V), la manipulación del estado de los mismos como parte del modelo (M), y los distintos metodos que poseen los componentes como parte del controlador (C).

