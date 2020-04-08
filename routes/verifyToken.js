const jwt = require('jsonwebtoken')

module.exports = function verify(req, res, next) {
    const token = req.header('auth_token')
    if(!token){
        return res.status(401).send('Access deniend')
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN)
        req.user = verified
        next()
    } catch (error) {
        res.send('There was an error')
    }
}