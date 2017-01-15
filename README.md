#EI1039 - UJI | ARS
## Introducción

Proyecto creado por los alumnos de Ingeniería Informática de la Universitat Jaume I (UJI) 
Alberto González Pérez y Daniel Chía Aguilar, para la asignatura EI1039 del grado.

El proyecto consiste en una aplicación cliente-servidor que pretende fomentar la participación 
de los alumnos en las clases presenciales.

## Requisitos previos
Todos los entornos de ejecución requieren una base de datos MongoDB ejecutándose en el sistema o accesible a este.

### Ejecución
1. Clonar el presente repositorio
2. Ejecutar `npm install` en la raíz del directorio clonado. Este comando realizará una complación inicial para producción tanto del cliente como para el servidor en el directorio `/dist`
3. Poner en marcha una instancia MongoDB en `localhost` ejecutándose en el puerto por defecto y con la BBDD `ei1039-ars-prod` disponible para ser empleada (por defecto, configurable, véase el apartado Configuración).
4. Ejecutar `npm start`. Este comando ejecutará el servidor en el puerto `8080` (por defecto, configurable, véase el apartado Configuración)
5. Acceder a [http://localhost:8080](http://localhost:8080) para empezar a emplear la aplicación.

### Desarrollo
1. Clonar el presente repositorio
2. Ejecutar `npm install` en la raíz del directorio clonado. Este comando realizará una complación inicial para producción tanto del cliente como para el servidor en el directorio `/dist`
3. Poner en marcha una instancia MongoDB en `localhost` ejecutándose en el puerto por defecto y con la BBDD `ei1039-ars-dev` disponible para ser empleada (por defecto, configurable, véase el apartado Configuración).
4. Ejecutar `npm run dev`. Este comando ejecutará el servidor en el puerto `3000`, con recarga automática ante cambios del código. También ejecutará otro servidor para el desarrollo del cliente en el puerto `8080`, con recarga automática ante cambios en el código del cliente. El servidor ejecutándose en el puerto `8080` hará de proxy al servidor ejecutándo se en el `3000` para las peticiones de acceso a datos. Asegúrese de tener ambos puertos libres.
5. Acceder a [http://localhost:8080](http://localhost:8080) para empezar a emplear la aplicación.

## Configuración

Variables de entorno que permiten modificar el comportamiento de la aplicación:
* **SERVER_HOSTNAME**: Formato: `host_o_ip`. Empleada por el cliente para establecer una conexión por WebSocket. Se codifica en el cliente en tiempo de compilación.
* **PORT**: Formato: `número`. Permite modificar el puerto por defecto de ejecución del servidor tan sólo para el entorno de producción.
* **MONGODB_URI**: Formato URL estándar: `mongodb://usuario:password@host:puerto/db`. Permite modificar la URL de conexión de la base de datos.

## Tecnologías empleadas

### Servidor
El servidor ha sido desarrollado empleando:
* **TypeScript**: como lenguaje de programación
* **NodeJS**: como motor de ejecución
* **MongoDB**: como base de datos
* **Passport**: para los mecanismos de autenticación
* **GraphQL**: para la interfaz de acceso a datos

### Cliente
El cliente ha sido desarrollado empleando:
* **TypeScript**: como lenguaje de programación
* **React**: para las vistas de la applicación (V del MVVM)
* **Redux**: para centralizar y controlar el estado de la aplicación (M del MVVM)
* **ReduxForm**: para propagar los cambios en los controles de la vista al estado de la aplicación (VM del MVVM)
* **ApolloClient**: como conector GraphQL, provee de una caché
* **Axios**: como conector REST