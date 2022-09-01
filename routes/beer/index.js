const express = require('express')
const router = express.Router({ mergeParams: true })

// GET requests
router.get('/', getAllBeers)
router.get('/:beerid', getBeerDetailInformation)

function getAllBeers(req, res) {
    res.send('A list of beers')
}

function getBeerDetailInformation(req, res) {
    res.send('Details about a beer')
}

// POST requests
router.post('/', createBeer)

function createBeer(req, res) {
    res.send('Beer created!')
}

// PUT requests
router.put('/:beerid', editBeerInfo)

function editBeerInfo() {
    res.send('Beer info edited!')
}

// DELETE requests
router.delete('/:beerid', deleteBeer)

function deleteBeer(req, res) {
    res.send('Beer deleted!')
}

module.exports = router