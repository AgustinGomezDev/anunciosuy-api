const jwt = require('jsonwebtoken')

const createToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_KEY, { expiresIn: '1d' })
}

const authToken = (req, res, next) => {
    const token = req.cookies[process.env.JWT_COOKIE_KEY];
    if (!token) {
        return res.status(401).send({
            error: 'Usuario no autenticado o falta de tokens.'
        });
    }

    jwt.verify(token, process.env.JWT_KEY, (error, credentials) => {
        if (error) return res.status(403).send({
            error: "Token inválido.",
            message: error
        })
        req.user = credentials.user
        next()
    })
}

const decodeJWT = (token, signature) => {
    const payload = jwt.verify(token, signature)
    return payload
}

module.exports = { createToken, authToken, decodeJWT }