const express = require('express')
const cors = require('cors')
const session = require('express-session')

const app = express()
const PORT = process.env.PORT || 3000

const routes = require('./routes/starter')
const petRoutes = require('./routes/pets-prisma')
const authRoutes = require('./routes/auth')

const { ValidationError } = require('./middleware/CustomErrors')

// Configure CORS to allow requests from your frontend's origin and include credentials
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's origin
  credentials: true
}))

app.use(express.json())

app.use(session({
  secret: 'codepath-adoptapet', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 } // 1-hour session
}))

app.use(authRoutes)

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
  