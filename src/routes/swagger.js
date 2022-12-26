require('dotenv').config()
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

// Basic Meta Informations about our API
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { 
      title: "Prueba BetaTech", 
      version: "1.0.0",
      description: `
    Requisitos técnicos:
      Se deberá clonar el siguiente repositorio y utilizarlo como base para la prueba: https://github.com/Beta-Tech-Costa-Rica/BetaTest
      Debe realizarse en un repositorio Github.
      Debe contener una base de datos PostgreSQL.
      Se deberá crear un API con las siguientes características:
        - Mantenimiento de personas (Create, Update, Delete).
        - Todas las llamadas al API deberán tener un token de verificación que se obtiene al iniciar sesión.
        - Toda la información de las personas quedará a discreción.
        - Adicionalmente se desea tener un control de los activos que posee cada persona, por lo que se deberá dar un mantenimiento a los activos.
        - Se deberá crear una estructura de carpetas ordenada.
        - Se deberá comentar el código que sea necesario.
        - Se deberá hacer uso de un ORM para la comunicación con la Base de Datos.
        - Generar documentación de los endpoints utilizando herramientas como ApiDoc o Swagger.`
     },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/`,
        description: "Prueba BetaTech",
      },
    ]
  },
  apis: [`${path.join(__dirname, "./*.js")}`, `${path.join(__dirname, "../models/*.js")}`]
};
const swaggerSpec = swaggerJSDoc(swaggerOptions)
// Function to setup our docs
export const swaggerDocs = (app, port) => {
  // Route-Handler to visit our docs
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Docs are available on http://localhost:${port}/`)
};