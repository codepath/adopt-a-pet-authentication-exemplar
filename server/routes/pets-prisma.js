const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/pets', async (req, res) => {
    const { type, age_min, age_max } = req.query
  
    let whereClause = {}
  
    if (type) whereClause.type = type
    if (age_min) whereClause.age = { gte: parseInt(age_min) }
    if (age_max) whereClause.age = { ...whereClause.age, lte: parseInt(age_max) }
  
    try {
      const pets = await prisma.pet.findMany({
        where: whereClause,
      })

      res.json(pets)
    } catch (error) {
      res.status(500).send('Server Error')
    }
})  

router.get('/pets/:petId', async (req, res) => {
    const petId = parseInt(req.params.petId)

    try {
        const pet = await prisma.pet.findUnique({
            where: {
                id: petId,
            },
        })

        if (pet) {
            res.json(pet)
        } else {
            res.status(404).send('Pet not found')
        }
    } catch (error) {
        res.status(500).send('An error occurred while fetching the pet.')
    }
})

router.post('/pets', async (req, res) => {
    let { name, type, age } = req.body

    // Convert age to an integer
    age = parseInt(age, 10)
    
    // Check for a name and set to "unknown" if not provided
    name = name || "unknown"

    try {
        const pet = await prisma.pet.create({
          data: {
            name,
            type,
            age
          },
        })

        res.json(pet)
    } catch (error) {
        res.status(500).send('An error occurred while creating the pet.')
    }
})  

router.put('/pets/:id', async (req, res) => {
    const { id } = req.params
    const { name, type, age } = req.body

    const pet = await prisma.pet.update({
      where: { id: parseInt(id) },
      data: {
        name,
        type,
        age
      },
    })

    res.json(pet)
})  

router.delete('/pets/:id', async (req, res) => {
    const { id } = req.params

    await prisma.pet.delete({
      where: { id: parseInt(id) },
    })

    res.status(204).send()
})  

module.exports = router
