require('dotenv').config()
import { user } from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

export const signUp = async (req, res) => {
    try {
        const newUser = await user.create(req.body)
        const token = jwt.sign({id: newUser.id}, process.env.JWT_KEY, {expiresIn: '1d'})

        res.status(201).json({token})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body

        user.findOne({ where: { email: email } }).then(async function (User) {
            if (!User) {
                return res.status(404).json({ error: 'User not found' })
            } else if (!await bcrypt.compare(password, User.password)) {
                return res.status(404).json({ error: 'Password does not match' })
            } else {
                const token = jwt.sign({ id: User.id }, process.env.JWT_KEY, {expiresIn: '1d'})
                res.status(200).json({ token })
            }
        });
    } catch (error) {
        res.status(500).json({ error })
    }
}