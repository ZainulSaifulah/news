const post = require('../controllers/post.controller')
const validator = require('../middleware/validator')
const auth = require('../middleware/authjwt')
const router = require('express').Router();

module.exports = (app) => {
    router.post('/', [validator.postValidator(), validator.validate], post.create)
    router.get('/', post.findAll)
    router.get('/:title', post.findBySlug)

    app.use('/api/posts', auth.verifikasiToken, router)
    // app.use('/api/posts', router)
}