require('dotenv').config()
import jwt from 'jsonwebtoken'
import { user } from '../models/user.js'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["token"]
        if (!token) return res.status(403).json({message: 'Token is required'})
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const userFound = user.findByPk(decoded.id)

        if (!userFound) return res.status(404).json({message: 'Token is valid'})
        next()
    } catch (error) {
        return res.status(403).json({message: 'Token is invalid'})
    }
}

export const checkDuplicateUser = async (req, res, next) => {
    const email = await user.findOne({ where: { email: req.body.email }})
    if (email) return res.status(409).json({ message: 'Email already exists'})
    next()
}

export const validateUser = async (req, res, next) => {
    const { email, password } = req.body
    console.log(req.body)
    console.log(password)
    if (!password) return res.status(400).json({ message: 'Password is required' })
    if (!email) return res.status(400).json({ message: 'Email is required'})
    next()
}

export const validatePerson = async (req, res, next) => {
    const { name, age, gender } = req.body
    if (!name) return res.status(400).json({ message: 'Name is required' })
    if (!age) return res.status(400).json({ message: 'Age is required'})
    if (!gender) return res.status(400).json({ message: 'Gender is required'})
    next()
}

export const validateActive = async (req, res, next) => {
    const { name, description, personId } = req.body
    if (!name) return res.status(400).json({ message: 'Name is required' })
    if (!description) return res.status(400).json({ message: 'Description is required'})
    if (!personId) return res.status(400).json({ message: 'Person is required'})
    next()
}