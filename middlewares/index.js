function authenticateUsers(req, res, next) {
    if(req.headers['authorization'] && req.headers['authorization'] === 'supersecret') {
        return next()
    }
    res
        .status(401)
        .json({
            message: 'Authentication Failed'
        })
}

module.exports = authenticateUsers