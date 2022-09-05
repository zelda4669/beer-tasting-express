function listAllBreweries(req, res) {
    res.send('A list of breweries')
}

function getBreweryDetailInformation(req, res) {
    res.send('Details about a brewery')
}

function addBrewery(req, res) {
    res.send('Brewery added!')
}

function editBreweryInfo(req, res) {
    res.send('Info edited!')
}

function deleteBrewery(req, res) {
    res.send('Brewery deleted')
}

function internalHelperFunction(req, res) {
    res.json({
        message: 'Sensitive info'
    })
}

module.exports = {
    listAllBreweries,
    getBreweryDetailInformation,
    addBrewery,
    editBreweryInfo,
    deleteBrewery,
}