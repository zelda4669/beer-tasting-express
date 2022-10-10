const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const logger = require('/utils/logger')

const basicRouter = require('./routes/basic/index')
const breweryRouter = require('./routes/brewery/index')
const userRouter = require('./routes/user/index')

const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

logger.info('Connecting to database...')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to database')
    })
    .catch((error) => {
        logger.error('Error connecting to database:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/', basicRouter)
app.use('/api/brewery', breweryRouter)
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app