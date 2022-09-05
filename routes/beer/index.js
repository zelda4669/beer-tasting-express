const express = require('express')
const router = express.Router({ mergeParams: true })
const beer = require('../../controllers/beer')
const authenticateUsers = require('../../middlewares')

// public endpoints
router.get('/', beer.getAllBeers)
router.get('/:beerid', beer.getBeerDetailInformation)


// private endpoints
router.use(authenticateUsers)

router.post('/', beer.createBeer)
router.route('/:beerid')
    .put(beer.editBeerInfo)
    .delete(beer.deleteBeer)

module.exports = router