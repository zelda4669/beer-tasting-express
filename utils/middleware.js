const morgan = require('morgan')
const requestLogger = morgan('dev')
const logger = require('./logger')

const unknownEndpoint = (req, res) => {
    res.status(404).send('Page not found')
}

const errorHandler = (error, req, res, next) => {
    if(error.name === 'CastError') {
        return res.status(400).send('Sorry, I can\'t find that brewery. Do you want to create it?')
    } else if(error.name === 'ValidationError') {
        return res.status(400).send(error.message)
    } else if(error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Invalid token'
        })
    }

    logger.error(error.message)

    next(error)
}

const middleware = { requestLogger, unknownEndpoint, errorHandler }

module.exports = middleware