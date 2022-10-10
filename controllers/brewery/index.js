const Brewery = require('../../models/brewery')
const User = require('../../models/users')

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

    const user = await User.findById(body.userId)

    if(body.name === undefined) {
        return res.status(400).send('missing content')
    }

    const brewery = new Brewery({
        name: body.name,
        location: body.location,
        tasted: body.tasted || false,
        owner: user._id
    })

    const savedBrewery = await brewery.save()
    user.ownedBreweries = user.ownedBreweries.concat(savedBrewery._id)
    await user.save()
    res.status(201).json(savedBrewery)
}

async function editBreweryInfo(req, res) {
    const body = req.body

    const brewery = {
        tasted: body.tasted
    }

    const updatedBrewery = await Brewery.findByIdAndUpdate(
        req.params.breweryid,
        brewery,
        { new: true, runValidators: true, context: 'query' }
    )

    res.json(updatedBrewery)
}

async function deleteBrewery(req, res) {
    await Brewery.findByIdAndRemove(req.params.breweryid)
    res.status(204).send('Brewery has been deleted.')
}

module.exports = {
    listAllBreweries,
    getBreweryDetailInformation,
    addBrewery,
    editBreweryInfo,
    deleteBrewery,
}