const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const basicRouter = require('./routes/basic/index')
const breweryRouter = require('./routes/brewery/index')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

console.log('Connecting to database...')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('Connected to database')
    })
    .catch((error) => {
        console.error('Error connecting to database:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/', basicRouter)
app.use('/api/brewery', breweryRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app