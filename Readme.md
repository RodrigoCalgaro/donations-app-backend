# Donations App Backend

Proyecto desarrollado con Node.js y Express.js

## Dependencias utilizadas

- [sequelize](https://www.npmjs.com/package/sequelize) y [mysql2](https://www.npmjs.com/package/mysql2) para la persistencia de datos
- [passport](https://www.npmjs.com/package/passport), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) y [passport-jwt](https://www.npmjs.com/package/passport-jwt) para la autenticación de usuarios
- [bcrypt](https://www.npmjs.com/package/bcrypt) para encriptar las contraseñas
- [helment](https://www.npmjs.com/package/helmet) para establecer cabeceras HTTP relacionadas con la seguridad de la aplicación en producción.
- [moment](https://www.npmjs.com/package/moment) para realizar operaciones con fechas.
- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) y [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) para la documentación de los endpoints.
- [jest](https://www.npmjs.com/package/jest) y [supertest](https://www.npmjs.com/package/supertest) para las pruebas automatizadas.

## Restaurar Dependencias

Para restaurar las dependencias del proyecto abrir una terminal en la carpeta del proyecto y ejecutar `npm install`. Es necesario tener previamente instalado Node.js y npm. 
 
## Configurar bases de datos

Se utilizó MySQL como motor de base de datos, para ejecutar el proyecto se debe terner previamente creadas las bases de datos `donations-dev` y `donations-test` y crear el usuario `"username": "donations-app" / "password": "donations-app"` con los permisos necesarios para crear/modificar/eliminar tablas y acceder a sus datos de los esquemas mencionados anteriormente. 

Si se desea utilizar una configuración diferente se debe modificar el archivo `config/config.json`

Opcionalmente se puede restaurar el backup `donations-dev.sql` que contiene datos que permiten visualizar mejor el comportamiento de la aplicación. El mismo incluye, por ejemplo, los usuarios `admin@email.com / admin` y `user1@email.com / user` para explorar los distintos roles.

## Servidor de desarrollo

Para servir la app, desde una terminal en la carpeta del proyecto, ejecutar `npm start`, una vez compilada se puede visualizar la app en `http://localhost:3000/`.

## Tests

Se incluyen tests de los endpoints y servicios, se pueden ejecutar ambos con el comando `npm test` o de forma individual con los comandos `npm run test:endpoints` y `npm run test:services` respectivamente.

## Documentación

Se realizó la documentación interna de los endpoints utilizando swagger la cual puede ser consultada en `http://localhost:3000/api-docs`.

Además se generó la documentación de las pruebas realizadas con Postman, disponible en [https://documenter.getpostman.com/view/4568172/UVR5qUU9](https://documenter.getpostman.com/view/4568172/UVR5qUU9) 

## Postman Collection

La colección de las pruebas con postman se encuentra disponible en [https://www.getpostman.com/collections/471392bd86265d72949c](https://www.getpostman.com/collections/471392bd86265d72949c)

## Deployment

Se realizó el deploy de la aplicación en [Heroku](https://www.heroku.com/) por medio de este repositorio y se habilitó el deploy automático de los cambios publicados en la rama `master`.  
La aplicación se encuentra disponible en [https://donations-app-server.herokuapp.com/](https://donations-app-server.herokuapp.com/) y es utilizada por el [cliente angular](http://ec2-18-233-166-199.compute-1.amazonaws.com/).

Nota: Al realizar una petición la misma puede tardar algunos segundos en ser respondidad debido a que la aplicación entra en idle al cabo de un tiempo sin recibir peticiones, esto se debe simplemente a que se realizó la publicación en la capa gratuita de la plataforma. 
