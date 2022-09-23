const express = require('express')
const basicRouter = express.Router()
const basicController = require('../../controllers/basic')

basicRouter.get('/', basicController.homePage)

module.exports = basicRouter