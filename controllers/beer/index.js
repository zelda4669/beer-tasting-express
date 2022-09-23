function getAllBeers(req, res) {
    res.send('A list of beers')
}

function getBeerDetailInformation(req, res) {
    res.send('Details about a beer')
}

function createBeer(req, res) {
    res.send('Beer created!')
}

function editBeerInfo(req, res) {
    res.send('Beer info edited!')
}

function deleteBeer(req, res) {
    res.send('Beer deleted!')
}

const beerController = {
    getAllBeers,
    getBeerDetailInformation,
    createBeer,
    editBeerInfo,
    deleteBeer,
}

module.exports = beerController