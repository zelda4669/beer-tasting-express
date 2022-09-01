const express = require('express')
const router = express.Router()

// POST requests
router.post('/login', handleLogin)
router.post('/reset-password/request', requestPasswordResetLink)
router.post('/reset-password/confirm', changePassword)

function handleLogin(req, res) {
    res.send('You have been logged in!')
}

function requestPasswordResetLink(req, res) {
    res.send('Change your password?')
}

function changePassword(req, res) {
    res.send('Your password has been changed')
}

module.exports = router