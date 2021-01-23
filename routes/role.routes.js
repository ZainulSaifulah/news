const role = require('../controllers/role.controller')
const validator = require('../middleware/validator')
const auth = require('../middleware/authjwt')
const router = require('express').Router();

module.exports = (app) => {
    router.post('/', [validator.roleValidator(), validator.validate, validator.checkDuplicateRole], role.create)

    app.use('/api/roles', auth.verifikasiToken, router)
}