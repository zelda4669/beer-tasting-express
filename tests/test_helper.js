const Users = require('../models/users')
const Brewery = require('../models/brewery')

const initialUsers = [
    {
        username: 'userOne',
        email: 'user@one.com'
    },
    {
        username: 'userTwo',
        email: 'user@two.com'
    },
    {
        username: 'userThree',
        email: 'user@three.com'
    },
]

const initialBreweries = [
    {
        name: 'Redhook',
        location: 'Seattle'
    },
    {
        name: 'Pike Brewing',
        location: 'Seattle'
    },
    {
        name: 'Deschutes',
        location: 'Portland'
    }
]

async function currentUsers() {
    const users = await Users.find({})
    return users.map(u => u.toJSON())
}

async function currentBreweries() {
    const breweries = await Brewery.find({})
    return breweries.map(b => b.toJSON())
}

module.exports = {
    initialUsers,
    initialBreweries,
    currentUsers,
    currentBreweries,
}