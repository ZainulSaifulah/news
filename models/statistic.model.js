const mongoose = require('mongoose')

const Statistic = mongoose.model(
    'Statistic',
    new mongoose.Schema({
        "accesedAt": Date,
        "post": {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        },
        "userIP" : String 
    })
)

module.exports = Statistic