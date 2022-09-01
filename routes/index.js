const express = require('express')
const router = express.Router()

const user = require('./user')
const brewery = require('./brewery')
const beer = require('./beer')

router.use('/', user)
router.use('/brewery', brewery)
router.use('/brewery/:breweryid/beer', beer)

// GET requests
router.get('/', homePage)

function homePage(req, res) {
    res.send('Hello World!')
}

module.exports = router