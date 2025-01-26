const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: "You must be logged in to perform this action." })
    }
    next()
}

router.get('/pets', async (req, res) => {
    try {
        const pets = await prisma.pet.findMany()
        res.json(pets)
    } catch (error) {
        console.error("Error fetching pets:", error)
        res.status(500).json({ error: "Something went wrong while fetching pets." })
    }
})

router.get('/pets/:petId', async (req, res) => {
    const petId = parseInt(req.params.petId)

    try {
        const pet = await prisma.pet.findUnique({
            where: { id: petId }
        })

        if (pet) {
            res.json(pet)
        } else {
            res.status(404).send('Pet not found')
        }
    } catch (error) {
        console.error("Error fetching pet:", error)
        res.status(500).json({ error: "Something went wrong while fetching the pet." })
    }
})

router.post('/pets', isAuthenticated, async (req, res) => {
    const { name, type, age } = req.body

    try {
        const newPet = await prisma.pet.create({
            data: {
                name,
                type,
                age: parseInt(age, 10), // Ensure age is an integer
                userId: req.session.userId // Assign pet to logged-in user
            }
        })

        res.status(201).json(newPet)
    } catch (error) {
        console.error("Error creating pet:", error)
        res.status(500).json({ error: "Something went wrong while creating the pet." })
    }
})

router.put('/pets/:petId', isAuthenticated, async (req, res) => {
    const petId = parseInt(req.params.petId)
    const { name, type, age } = req.body

    try {
        const pet = await prisma.pet.findUnique({
            where: { id: petId }
        })

        if (!pet) {
            return res.status(404).json({ error: "Pet not found" })
        }

        if (pet.userId !== req.session.userId) {
            return res.status(403).json({ error: "You can only update your own pets" })
        }

        const updatedPet = await prisma.pet.update({
            where: { id: petId },
            data: { name, type, age }
        })

        res.json(updatedPet)
    } catch (error) {
        console.error("Error updating pet:", error)
        res.status(500).json({ error: "Something went wrong while updating the pet." })
    }
})

router.delete('/pets/:petId', isAuthenticated, async (req, res) => {
    const petId = parseInt(req.params.petId)

    try {
        const pet = await prisma.pet.findUnique({
            where: { id: petId }
        })

        if (!pet) {
            return res.status(404).json({ error: "Pet not found" })
        }

        if (pet.userId !== req.session.userId) {
            return res.status(403).json({ error: "You can only delete your own pets" })
        }

        await prisma.pet.delete({
            where: { id: petId }
        })

        res.json({ message: "Pet deleted successfully" })
    } catch (error) {
        console.error("Error deleting pet:", error)
        res.status(500).json({ error: "Something went wrong while deleting the pet." })
    }
})

module.exports = router
