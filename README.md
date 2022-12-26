## Beta Test API


[![Beta Tech](https://betasolutions.tech/assets/img/LogoBeta.png)](https://github.com/Beta-Tech-Costa-Rica/BetaTest)

Requisitos técnicos
- Se deberá clonar el siguiente repositorio y utilizarlo como base para la prueba: [BetaTech DB PostgreSQL Docker](https://github.com/Beta-Tech-Costa-Rica/BetaTest)
- Debe realizarse en un repositorio Github.
- Debe contener una base de datos PostgreSQL.
- Se deberá crear un API con las siguientes características:
    - Mantenimiento de personas (Create, Update, Delete).
    - Todas las llamadas al API deberán tener un token de verificación que se obtiene al iniciar sesión.
    - Toda la información de las personas quedará a discreción.
    - Adicionalmente se desea tener un control de los activos que posee cada persona, por lo que se deberá dar un mantenimiento a los activos.
    - Se deberá crear una estructura de carpetas ordenada.
    - Se deberá comentar el código que sea necesario.
    - Se deberá hacer uso de un ORM para la comunicación con la Base de Datos.
    - Generar documentación de los endpoints utilizando herramientas como ApiDoc o Swagger.


Docker needs to be installed, follow the steps described on the official [Docker page](https://docs.docker.com/engine/install/)

- [Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Linux](https://docs.docker.com/desktop/install/linux-install/)
- [Mac](https://docs.docker.com/desktop/install/mac-install/)

Nodejs needs to be installed, follow the steps described on the official [Nodejs page](https://nodejs.org/en/download/package-manager/)

Rename .env file

```bash
mv .env.template .env
```

Into [.env](.env) check or paste the following code

```env
#Postgres ENVIRONMENT
PG_CONTAINER=Postgres14
PG_PASS=0ewj0Ra6zYWe
PG_USER=esalas
PG_HOST=db
PG_DATABASE=postgres
PG_PORT=5432
PG_EXPOSE_PORT=5432
PG_DRIVER=postgresql

# Api ENVIRONMENT
PORT=3000

#JWT ENVIRONMENT
JWT_KEY=secret
```

Go to [DF_POSTGRES](DF_POSTGRES) folder

Verify or Create docker-compose.yml file

```bash
touch docker-compose.yml
```

Into [docker-compose.yml](docker-compose.yml) check or paste the following code

```yml
version: "3.1"
services:
  db:
    build:
      context: ./DF_POSTGRES
    container_name: ${PG_CONTAINER}
    ports:
      - "${PG_EXPOSE_PORT}:${PG_PORT}"
    environment:
      - POSTGRES_DB=${PG_DATABASE}
      - POSTGRES_USER=${PG_USER}
      - POSTGRES_PASSWORD=${PG_PASS}
    volumes:
      - db-data:/var/lib/postgresql_data1/data/pgdata
volumes:
  db-data:
```
Run this command for create docker with postgres database

```bash
docker-compose up -d
```

Run this command to verify correctly docker

```bash
docker ps
```
Run this command for install modules for NodeJS app

```bash
npm i 
```

Run this command to execute the NodeJS app

```bash
npm run dev
```

Go to check your [API documentation](http://localhost:3000/)

---

[![Powered by](https://img.shields.io/badge/Powered%20by-Bryan%20Campos-red)](https://github.com/Killdemons)

---
