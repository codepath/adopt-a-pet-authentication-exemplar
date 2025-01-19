const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const pets = [
    { id: 1, name: 'tycho', type: 'dog', age: 2 },
    { id: 2, name: 'mika', type: 'dog', age: 1 },
    { id: 3, name: 'stringer', type: 'dog', age: 10 },
];

async function main() {
    console.log(`Start seeding ...`)

    // Clear the table first
    await prisma.pet.deleteMany()
    
    for (const pet of pets) {
        const petRecord = await prisma.pet.create({
            data: pet,
        })
        console.log(`Created pet with id: ${petRecord.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
