const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

const routes = require('./routes/starter')
const petRoutes = require('./routes/pets-prisma')

const { ValidationError } = require('./middleware/CustomErrors')

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({ error: err.message })
    }

    // Additional Prisma error checks can be placed here
    res.status(500).json({ error: "Internal Server Error" })
})  

app.use(routes)
app.use(petRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
  