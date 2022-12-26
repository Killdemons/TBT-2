import { active } from '../models/active.js'

export const getActives = async (req, res) => {
    try {
        res.status(200).json(await active.findAll())
    } catch (err) {
        res.status(500).json(err)
    }
}

export const createActive = async (req, res) => {
    try {
        res.status(201).json(await active.create(req.body))
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getActiveById = async (req, res) => {
    try {
        const activebyid = await active.findByPk(req.params.id)
        if (!activebyid) {
            return res.status(404).json({
                message: 'Active not found'
            })
        }
        res.status(200).json(activebyid)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const updateActiveById = async (req, res) => {
    try {
        const updatedActive = await active.findByPk(req.params.id)
        if (!updatedActive) {
            return res.status(404).json({
                message: 'Active not found'
            })
        }
        updatedActive.set(req.body)
        res.status(200).json(await updatedActive.save())
    } catch (err) {
        res.status(500).json(err)
    }
}

export const deleteActiveById = async (req, res) => {
    try {
        const deletedActive = await active.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!deletedActive) return res.status(404).json({'message': 'Active not found'})
        res.status(200).json({'message': `${deletedActive} active deleted`})
    } catch (err) {
        res.status(500).json(err)
    }
}