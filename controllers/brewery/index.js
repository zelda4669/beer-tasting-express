const Brewery = require('../../models/brewery')

function listAllBreweries(req, res) {
    Brewery.find({}).then(b => {
        res.json(b)
    })
}

function getBreweryDetailInformation(req, res, next) {
    let id = req.params.breweryid
    Brewery.findById(id)
        .then(b => {
            if(b) {
                res.json(b)
            } else {
                res.status(404).end()
            }
        })
        .catch(err => next(err))
}

function addBrewery(req, res) {
    const body = req.body

    if(body.name === undefined) {
        return res.status(400).send('missing content')
    }

    const brewery = new Brewery({
        name: body.name,
        location: body.location,
        tasted: body.tasted || false
    })

    brewery.save().then(newBrewery => {
        res.json(newBrewery)
    })
}

function editBreweryInfo(req, res, next) {
    const body = req.body

    const brewery = {
        tasted: body.tasted
    }

    Brewery.findByIdAndUpdate(
        req.params.breweryid,
        brewery,
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedItem => {
            res.json(updatedItem)
        })
        .catch(err => next(err))
}

function deleteBrewery(req, res, next) {
    Brewery.findByIdAndRemove(req.params.breweryid)
        .then(() => {
            res.status(204).send('Brewery has been deleted.')
        })
        .catch(err => next(err))
}

const breweryController = {
    listAllBreweries,
    getBreweryDetailInformation,
    addBrewery,
    editBreweryInfo,
    deleteBrewery,
}

module.exports = breweryController