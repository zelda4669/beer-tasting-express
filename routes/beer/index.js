const express = require('express')
const router = express.Router({ mergeParams: true })
const authenticateUsers = require('../../middlewares')

// public endpoints
router.get('/', getAllBeers)
router.get('/:beerid', getBeerDetailInformation)

function getAllBeers(req, res) {
    res.send('A list of beers')
}

function getBeerDetailInformation(req, res) {
    res.send('Details about a beer')
}

// private endpoints
router.use(authenticateUsers)

router.post('/', createBeer)
router.put('/:beerid', editBeerInfo)
router.delete('/:beerid', deleteBeer)

function createBeer(req, res) {
    res.send('Beer created!')
}

function editBeerInfo() {
    res.send('Beer info edited!')
}

function deleteBeer(req, res) {
    res.send('Beer deleted!')
}

module.exports = router