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
    handleLogin,
    requestPasswordResetLink,
    changePassword,
}