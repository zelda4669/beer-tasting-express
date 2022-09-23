function homePage (req, res) {
    res.send('It\'s a beer app!')
}

const basicController = {
    homePage,
}

module.exports = basicController