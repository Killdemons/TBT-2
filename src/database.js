require('dotenv').config()
import Sequelize from "sequelize"

export const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASS, {
    host: 'localhost',
    dialect: 'postgres',
    port: process.env.PG_EXPOSE_PORT
});

