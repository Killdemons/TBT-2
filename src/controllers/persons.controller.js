import { person } from '../models/person.js'

export const getPersons = async (req, res) => {
    try {
        res.status(200).json(await person.findAll())
    } catch (err) {
        res.status(500).json(err)
    }
}

export const createPerson = async (req, res) => {
    try {
        res.status(201).json(await person.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getPersonById = async (req, res) => {
    try {
        const personbyid = await person.findByPk(req.params.id)
        if (!personbyid) {
            return res.status(404).json({
                message: 'Person not found'
            })
        }
        res.status(200).json(personbyid)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const updatePersonById = async (req, res) => {
    try {
        const updatedPerson = await person.findByPk(req.params.id)
        if (!updatedPerson) {
            return res.status(404).json({
                message: 'Person not found'
            })
        }
        updatedPerson.set(req.body)
        res.status(200).json(await updatedPerson.save())
    } catch (error) {
        res.status(400).json(error)
    }
}

export const deletePersonById = async (req, res) => {
    try {
        const deletedPerson = await person.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!deletedPerson) return res.status(404).json({'message': 'Person not found'})
        res.status(200).json({'message': `${deletedPerson} person deleted`})
    } catch (error) {
        res.status(400).json(error)
    }
}