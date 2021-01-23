const db = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = db.user
const Role = db.role

exports.create = (req, res) => {
    Role.find({name: {$in: req.body.roles}}).then(roles => {
        const user = ({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })

        user.roles = roles.map(role => role._id)

        User.create(user).then(user => {
            res.send(user)
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Internal Server Error'
            })
        })
    })
}

exports.login = (req, res) => {
    User.findOne({$or: [{username: req.body.username}, {email: req.body.username}]}, (err, user) => {
        if (!user) {
            return res.status(404).send({
                message: 'username or email not found'
            })
        }else {
            let isValidPassword = bcrypt.compareSync(req.body.password, user.password)
            if (!isValidPassword) {
                return res.status(401).send({
                    message: 'username or password is wrong'
                })
            } else {
               let token = jwt.sign({ id: user.id }, process.env.APP_KEY,
                {
                    expiresIn: 86400 //24 hour
                })

                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    token: token
                })
            }
        }
    })
}

exports.findOne = (req, res) => {
    User.findOne({username: req.body.username}).populate("roles", "-__v").then(user => {
        res.send(user)
    }).catch(err => {
        res.status(400).send({
            message: err.message || 'Internal Server Error'
        })
    })
}