const express = require('express')
const routes = express.Router()

routes.get('/login', (req, res) => {
    res.send('Hello Login!')
})
module.exports = routes