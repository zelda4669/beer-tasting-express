const express = require('express')
const router = require('./routes')
const logger = require('./utils/logger')

const app = express()
const port = 3000

app.use((req, res, next) => {
    req.logger = Object.freeze(logger)
    next()
})

app.use('/api', router)

app.use((err, req, res, next) => {
    res
    .status(500)
    .json({
        message: 'Internal server error'
    })
})

app.listen(port, () => {
    console.log(`Beer app listening on port ${port}`)
})