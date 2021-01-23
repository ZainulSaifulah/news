const { body, validationResult } = require("express-validator");
const User = require('../models').user
const Role = require('../models').role

exports.registerValidation = () => {
  return [
    body("username").exists(),
    body("email").exists().isEmail(),
    body("password").exists().isLength({ min: 8 }),
    body("roles").exists(),
  ];
};

exports.roleValidator = () => {
  return [
    body('name').exists()
  ]
}

exports.postValidator = () => {
  return [
    body('title').exists(),
    body('content').exists(),
    body('status').exists(),
  ]
}

exports.checkDuplicateRole = (req, res, next) => {
  Role.findOne({name: req.body.name}).then(role => {
    if (role) {
      res.status(400).send({
        message: 'role already use'
      })
    } else {
      next()
    }
  })
}

exports.checkUniqueUser = (req, res, next) => {
    User.findOne({$or: [{username: req.body.username}, {email: req.body.email}]}).then(user => {
        if (user){
            res.status(400).send({
                message: "username or email already use"
            })
        }else{
            next()
        }
    })
}

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

