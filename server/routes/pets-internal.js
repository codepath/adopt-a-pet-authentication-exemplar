const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

let pets = [
    { id: 1, name: 'tycho', type: 'dog', age: 2 },
    { id: 2, name: 'mika', type: 'dog', age: 1 },
    { id: 3, name: 'stringer', type: 'dog', age: 10 }
]

router.get('/pets', (req, res) => {
    res.json(pets)
}) 

router.get('/pets/:petId', (req, res) => {
    const petId = parseInt(req.params.petId)
    const pet = pets.find(pet => pet.id === petId)

    if (pet) {
        res.json(pet)
    }
    else {
        res.status(404).send('Pet not found')
    }
})

router.post('/pets', (req, res) => {
    const { name, type, age } = req.body

    const newPet = {
        id: pets.length + 1,
        name,
        type,
        age
    }

    pets.push(newPet)
    res.status(201).json(newPet)
})

router.put('/pets/:petId', (req, res) => {
    const { petId } = req.params
    const petIndex = pets.findIndex(pet => pet.id === parseInt(petId))

    if (petIndex != -1) {
        const updatedPetInfo = req.body
        pets[petIndex] = { ...pets[petIndex], updatedPetInfo }
        res.json(pets[petIndex])
    }
    else {
        res.status(404).send('Pet not found')
    }
}) 

router.delete('/pets/:petId', (req, res) => {
    const { petId } = req.params
    const initialLength = pets.length
    pets = pets.filter(pet => pet.id !== parseInt(petId))

    if (pets.length < initialLength) {
        res.status(204).send()
    }
    else {
        res.status(404).send('Pet not found')
    }
})

module.exports = router
