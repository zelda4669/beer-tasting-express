const express = require('express')
const router = express.Router()

// GET requests
router.get('/', listAllBreweries)
router.get('/:breweryid', getBreweryDetailInformation)

function listAllBreweries(req, res) {
    res.send('A list of breweries')
}

function getBreweryDetailInformation(req, res) {
    res.send('Details about a brewery')
}

// POST requests
router.post('/', addBrewery)

function addBrewery(req, res) {
    res.send('Brewery added!')
}

// PUT requests
router.put('/:breweryid', editBreweryInfo)

function editBreweryInfo(req, res) {
    res.send('Info edited!')
}

// PATCH requests
router.patch('/:breweryid/publish', publishBreweryInfo)

function publishBreweryInfo(req, res) {
    res.send('Brewery info published')
}

// DELETE requests
router.delete('/:breweryid', deleteBrewery)

function deleteBrewery(req, res) {
    res.send('Brewery deleted')
}

module.exports = router