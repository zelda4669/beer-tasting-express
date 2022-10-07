const bcrypt = require('bcrypt')
const User = require('../../models/users')

async function createUser(req, res) {
    const { username, email, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        email,
        passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
}


function handleLogin(req, res) {
    res.send('You have been logged in!')
}

function requestPasswordResetLink(req, res) {
    res.send('Change your password?')
}

function changePassword(req, res) {
    res.send('Your password has been changed')
}

module.exports = {
    createUser,
    handleLogin,
    requestPasswordResetLink,
    changePassword,
}