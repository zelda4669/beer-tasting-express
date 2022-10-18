const jwt = require('jsonwebtoken')
const Brewery = require('../../models/brewery')
const User = require('../../models/users')

function getTokenFrom(req) {
    const auth = req.get('authorization')
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7)
    }
    return null
}

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
    const token = getTokenFrom(req)
    const auth = jwt.verify(token, process.env.SECRET)

    if(!auth.id) {
        return res.status(401).json({ error: 'Token missing or invalid.' })
    }

    const user = await User.findById(auth.userId)

    if(body.name === undefined) {
        return res.status(400).send('missing content')
    }

    const brewery = new Brewery({
        name: body.name,
        location: body.location,
        tasted: body.tasted || false,
        owner: [user._id]
    })

    const savedBrewery = await brewery.save()
    user.ownedBreweries = user.ownedBreweries.concat(savedBrewery._id)
    await user.save()
    res.status(201).json(savedBrewery)
}

async function editBreweryDetails(req, res) {
    const body = req.body
    const token = getTokenFrom(req)
    const auth = jwt.verify(token, process.env.SECRET)

    if(!auth.id) {
        return res.status(401).json({ error: 'Token missing or invalid.' })
    }

    const user = await User.findById(auth.userId)

    const toUpdate = await Brewery.findById(req.params.breweryId)

    if(user._id !== toUpdate.id) {
        return res.status(401).json({ error: 'You must be the brewery owner to make changes!' })
    }

    const brewery = {
        name: body.name,
        location: body.location,
    }

    const updatedBrewery = await Brewery.findByIdAndUpdate(
        req.params.breweryId,
        brewery,
        { new: true, runValidators: true, context: 'query' }
    )

    res.json(updatedBrewery)
}

async function editTasted(req, res) {
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
    editBreweryDetails,
    addBrewery,
    editTasted,
    deleteBrewery,
}