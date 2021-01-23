const db = require('../models')
const User = db.user

exports.isAdmin = (req, res, next) => {
    User.findOne({_id: req.id}).populate("roles", "-__v").then(user => {
        let isAdmin = false;
        user.roles.forEach(role => {
            if(role.name == 'admin'){
                isAdmin = true
            }
        });
        
        if (isAdmin){
            next()
        } else {
            res.status(403).send({
                message: 'Access Forbidden'
            })
        }
    })
}
