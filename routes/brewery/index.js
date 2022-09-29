const express = require('express')
const breweryRouter = express.Router()
const breweryController = require('../../controllers/brewery')
// const authenticateUsers = require('../../middlewares')

// public endpoints
breweryRouter.get('/', breweryController.listAllBreweries)
breweryRouter.get('/:breweryid', breweryController.getBreweryDetailInformation)
breweryRouter.post('/', breweryController.addBrewery)


// private endpoints
// breweryRouter.use(authenticateUsers)


breweryRouter.route('/:breweryid')
    .put(breweryController.editBreweryInfo)
    .delete(breweryController.deleteBrewery)


module.exports = breweryRouter