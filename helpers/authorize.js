const isAdmin = function(req, res, next){
    if(req.user.dataValues.role == 'admin'){
        next()
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = isAdmin