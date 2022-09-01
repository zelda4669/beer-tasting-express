const express = require('express')
const router = express.Router()
const authenticateUsers = require('../../middlewares')

// public endpoints
router.get('/', listAllBreweries)
router.get('/:breweryid', getBreweryDetailInformation)

function listAllBreweries(req, res) {
    res.send('A list of breweries')
}

function getBreweryDetailInformation(req, res) {
    res.send('Details about a brewery')
}

// private endpoints
router.use(authenticateUsers)

router.post('/', addBrewery)
router.put('/:breweryid', editBreweryInfo)
router.patch('/:breweryid/publish', publishBreweryInfo)
router.delete('/:breweryid', deleteBrewery)

function addBrewery(req, res) {
    res.send('Brewery added!')
}

function editBreweryInfo(req, res) {
    res.send('Info edited!')
}

function publishBreweryInfo(req, res) {
    res.send('Brewery info published')
}

function deleteBrewery(req, res) {
    res.send('Brewery deleted')
}

module.exports = router