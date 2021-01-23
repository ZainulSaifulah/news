const user = require('../controllers/user.controller')
const validator = require('../middleware/validator')
const auth = require('../middleware/authjwt')
const role = require('../middleware/role')
const router = require('express').Router();

module.exports = app => {
  router.post('/users', [auth.verifikasiToken, role.isAdmin, validator.registerValidation(), validator.validate, validator.checkUniqueUser], user.create)
  router.post('/login', user.login)

  app.use('/api', router)
}