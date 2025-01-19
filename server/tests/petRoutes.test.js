const request = require('supertest')
const app = require('../routes/pets')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

describe('GET /pets', () => {
  beforeAll(async () => {
    // Optional: Seed the test database with some data
  })

  afterAll(async () => {
    // Cleanup: Remove any data after tests run to keep your test DB clean
    await prisma.pet.deleteMany()
    await prisma.$disconnect()
  })

  it('should return a list of pets', async () => {
    const res = await request(app).get('/pets')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toBeInstanceOf(Array)
    // Further assertions regarding the content of the response
  })
})
