const db = require('../models')
const Role = db.role

exports.create = (req, res) => {
    Role.create({name: req.body.name}).then(role => {
        res.send(role)
    }).catch(err => {
        res.status(500).send(
            {
                message: err.message || 'Internal Server Error'
            }
        )
    })
}

exports.findAll = (req, res) => {
    Role.find({nama: req.query.nama })
        .then(role => {
            res.send(role)
        })
        .catch(err => {
            res.status(500).send(
                {
                    message: err.message || 'Internal Server Error'
                }
            )
        })
}

exports.findOne = (req, res) => {
    Role.findOne({id: req.params.id})
        .then(role => {
            res.send(role);
        })
        .catch(err => {
            res.status(500).send(
                {
                    message: err.message || 'Internal Server Error'
                }
            )
        })
}

exports.update = (req, res) => {
    const id = req.params.id

    Role.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(role => {
            if (role) {
                res.send({
                    message: 'role updated'
                });
            } else {
                res.send({
                    message: 'role not found'
                });
            }
        }).catch(err => {
            res.status(500).send(
                {
                    message: err.message || 'Internal Server Error'
                }
            )
        })
        
}

exports.delete = (req, res) => {
    Role.findByIdAndRemove(req.params.id)
        .then(role => {
            if (role) {
                res.send({
                    message: 'role deleted'
                });
            } else {
                res.send({
                    message: 'role not found'
                });
            }
        })
        .catch(err => {
            res.status(500).send(
                {
                    message: err.message || 'Internal Server Error'
                }
            )
        })
}