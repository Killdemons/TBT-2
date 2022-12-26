import { DataTypes } from 'sequelize'
import { sequelize } from '../database.js'
import bcrypt from 'bcryptjs';

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id: 
 *           type: integer
 *           example: 1
 *         name: 
 *           type: string
 *           example: Bryan Campos
 *         email: 
 *           type: string
 *           example: example@gmail.com
 *         password:
 *           type: string
 *           example: password
 */

export const user = sequelize.define('users', {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync()
          user.password = bcrypt.hashSync(user.password, salt)
        }
      }
})

