const express = require('express')
const router = express.Router()
const user = require('../../controllers/user')

// public endpoints
router.post('/login', user.handleLogin)

// private endpoints
router.post('/reset-password/request', user.requestPasswordResetLink)
router.post('/reset-password/confirm', user.changePassword)

module.exports = router