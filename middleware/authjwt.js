const jwt = require('jsonwebtoken')
const db = require('../models')
const User = db.user

verifikasiToken = (req, res, next) => {
    let token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null

    if (!token) {
        return res.status(403).send({
            message: 'Tidak ada Token'
        })
    }

    jwt.verify(token, process.env.APP_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized'
            })
        } else {
            req.id = decoded.id
            next()
        }
    })
}

const autentikasi = {
    verifikasiToken: verifikasiToken
}

module.exports = autentikasi