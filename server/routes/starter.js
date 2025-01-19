const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Welcome to my app!')
})

router.get('/sample-path', (req, res) => {
    res.send('This is a sample response.')
})

router.get('/hello-world', (req, res) => {
    res.send('Hello, World!')
})

router.get('/hello-pet', (req, res) => {
    res.send('Hello, Pet!')
})

module.exports = router
