const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../models/users')

async function getAllUsers(req, res) {
    const users = await User.find({})
    res.json(users)
}

async function createUser(req, res) {
    const { username, email, password } = req.body

    const existingUser = await User.findOne({ username })
    const existingEmail = await User.findOne({ email })

    if(existingUser) {
        return res.status(400).json({
            error: 'That username is already taken!'
        })
    }

    if(existingEmail) {
        return res.status(400).json({
            error: 'An account with that email already exists!'
        })
    }

    if(password.length < 8) {
        return res.status(400).json({
            error: 'Password must be at least 8 characters'
        })
    }

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


async function handleLogin(req, res) {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'That login is incorrect! Please try again.'
        })
    }

    const userInfo = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userInfo, process.env.SECRET)

    res.status(200).send({ token, username: user.username })
}

function requestPasswordResetLink(req, res) {
    res.send('Change your password?')
}

function changePassword(req, res) {
    res.send('Your password has been changed')
}

module.exports = {
    getAllUsers,
    createUser,
    handleLogin,
    requestPasswordResetLink,
    changePassword,
}