const express = require('express')
const userRouter = express.Router()
const user = require('../../controllers/user')

// public endpoints
userRouter.get('/', user.getAllUsers)
userRouter.post('/registration', user.createUser)
userRouter.post('/login', user.handleLogin)

// private endpoints
userRouter.post('/reset-password/request', user.requestPasswordResetLink)
userRouter.post('/reset-password/confirm', user.changePassword)

module.exports = userRouter