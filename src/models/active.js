import { DataTypes } from 'sequelize'
import { sequelize } from '../database.js'

/**
 * @openapi
 * components:
 *   schemas:
 *     Active:
 *       type: object
 *       properties:
 *         id: 
 *           type: integer
 *           example: 1
 *         name: 
 *           type: string
 *           example: Cabaña
 *         description:
 *           type: string
 *           example: Cabaña en la playa
 *         personId:
 *           type: integer
 *           example: 1
 */

export const active = sequelize.define('actives', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})
