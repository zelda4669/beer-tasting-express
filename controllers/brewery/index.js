const Brewery = require('../../models/brewery')

async function listAllBreweries(req, res) {
    const breweries = await Brewery.find({})
    res.json(breweries)
}

async function getBreweryDetailInformation(req, res) {
    const brewery = await Brewery.findById(req.params.breweryid)
    if(brewery) {
        res.json(brewery)
    } else {
        res.status(404).end()
    }
}

async function addBrewery(req, res) {
    const body = req.body

    if(body.name === undefined) {
        return res.status(400).send('missing content')
    }

    const brewery = new Brewery({
        name: body.name,
        location: body.location,
        tasted: body.tasted || false
    })

    const savedBrewery = await brewery.save()
    res.status(201).json(savedBrewery)
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

module.exports = {
    listAllBreweries,
    getBreweryDetailInformation,
    addBrewery,
    editBreweryInfo,
    deleteBrewery,
}