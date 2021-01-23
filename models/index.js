const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose

const connect = () => {
    mongoose.connect(
        `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });
}


db.user = require('./user.model')
db.role = require('./role.model')
db.post = require('./post.model')
db.statistic = require('./statistic.model')
db.connect = connect

module.exports = db