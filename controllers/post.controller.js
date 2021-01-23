const mongoose  = require('mongoose')
const slug = require('slug')
const db = require('../models')
const Post = db.post
const Statistic = db.statistic

exports.create = (req, res) => {
    const post = {
        title: req.body.title,
        slugTitle: slug(req.body.title),
        content: req.body.content,
        status: req.body.status,
        author: mongoose.Types.ObjectId(req.id),
        categories: req.body.categories,
        tags: req.body.tags
    }

    Post.create(post).then(post => {
        res.send(post)
    }).catch(err => {
        res.status(500).send(
            {
                message: err.message || 'Internal Server Error'
            }
        )
    })
}

exports.findAll = (req, res) => {
    Post.find({nama: req.query.nama})
        .then(posts => {
            res.send(posts)
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
    Post.findOne({id: req.params.id})
        .then(post => {
            res.send(post);
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
    req.body.slugTitle = slug(req.body.title)

    Post.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(post => {
            if (post) {
                res.send({
                    message: 'post updated'
                });
            } else {
                res.send({
                    message: 'post not found'
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
    Post.findByIdAndRemove(req.params.id)
        .then(post => {
            if (post) {
                res.send({
                    message: 'post deleted'
                });
            } else {
                res.send({
                    message: 'post not found'
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

exports.findBySlug = (req, res) => {
    Post.findOne({slugTitle: req.params.title}).then(post =>{
        createStatistic(post._id, req.ip)
        res.send(post)
    })
}

function createStatistic(postId, ip) {
    Statistic.create({
        accesedAt: Date.now(),
        post: postId,
        userIP: ip
    })
}