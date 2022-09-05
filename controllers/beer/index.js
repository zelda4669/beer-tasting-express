function getAllBeers(req, res) {
    res.send('A list of beers')
}

function getBeerDetailInformation(req, res) {
    res.send('Details about a beer')
}

function createBeer(req, res) {
    res.send('Beer created!')
}

function editBeerInfo() {
    res.send('Beer info edited!')
}

function deleteBeer(req, res) {
    res.send('Beer deleted!')
}

function internalHelperFunction(req, res) {
    res.json({
        message: 'Sensitive info'
    })
}

module.exports = {
    getAllBeers,
    getBeerDetailInformation,
    createBeer,
    editBeerInfo,
    deleteBeer,
}