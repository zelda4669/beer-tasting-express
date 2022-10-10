const express = require('express')
const breweryRouter = express.Router()
const breweryController = require('../../controllers/brewery')

// public endpoints
breweryRouter.get('/', breweryController.listAllBreweries)
breweryRouter.get('/:breweryid', breweryController.getBreweryDetailInformation)


// private endpoints
breweryRouter.post('/', breweryController.addBrewery)
breweryRouter.route('/:breweryid')
    .put(breweryController.editBreweryInfo)
    .delete(breweryController.deleteBrewery)


module.exports = breweryRouter