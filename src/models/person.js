import { DataTypes } from 'sequelize'
import { sequelize } from '../database.js'
import { active } from './active.js'

/**
 * @openapi
 * components:
 *   schemas:
 *     Person:
 *       type: object
 *       properties:
 *         id: 
 *           type: integer
 *           example: 1
 *         name: 
 *           type: string
 *           example: Bryan Campos
 *         age: 
 *           type: integer
 *           example: 26
 *         gender:
 *           type: string
 *           example: Hombre
 */

export const person = sequelize.define('persons', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

person.hasMany(active, {
    foreignKey: 'personId',
    sourceKey: 'id'
})

active.belongsTo(person, {
    foreignKey: 'personId',
    targetKey: 'id'
})
