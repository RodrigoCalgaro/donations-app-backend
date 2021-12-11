const models = require("../models");
const User = models.User;


var userService = {};

userService.findByEmail = async (email) => {
    return await User.findOne({
        where: {
            email: email
        }
    })
}

userService.create = async (newUser) => {
    return await User.create(newUser);
}


module.exports = userService;