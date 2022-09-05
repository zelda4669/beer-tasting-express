const express = require('express')
const router = express.Router()
const brewery = require('../../controllers/brewery')
const authenticateUsers = require('../../middlewares')

// public endpoints
router.get('/', brewery.listAllBreweries)
router.get('/:breweryid', brewery.getBreweryDetailInformation)



// private endpoints
router.use(authenticateUsers)

router.post('/', brewery.addBrewery)
router.route('/:breweryid')
    .put(brewery.editBreweryInfo)
    .delete(brewery.deleteBrewery)


module.exports = router