const express = require('express')
const router = require('./routes')

const app = express()

const port = 3000

app.listen(port, () => {
    console.log(`Beer app listening on port ${port}`)
})

app.use('/api', router)