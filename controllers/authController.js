const bcrypt = require("bcrypt");
const saltRounds = 8;
const key = require("../config/JWTkey");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

var authController = {};

/* Sign Up */
authController.signUp = async (req, res) => {
    let newUser = req.body;

    try {
        let userEmail = await userService.findByEmail(newUser.email)

        if (userEmail) {
            return res.status(401).json({
                message: `User ${newUser.email} already registered`
            });
        }

        newUser.password = bcrypt.hashSync(newUser.password, saltRounds)


        let user = await userService.create(newUser)

        res.status(201).json(
            {
                message: `User ${newUser.email} successfully registered`
            }
        )
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal error"
        });
    }
};

/* Sign In */
authController.signIn = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        let user = await userService.findByEmail(email)

        if (!user) {
            return res.status(401).json({
                message: "Wrong user or password"
            });
        }

        // Check Password
        let correctPass = bcrypt.compareSync(password, user.password);

        if (!correctPass) {
            return res.status(401).json({
                message: "Wrong user or password"
            });
        }

        const payload = {
            userId: user.userId,
            name: user.nombre,
            apellido: user.apellido,
            email: user.email,
            role: user.role
        };

        const expiresIn = 24 * 60 * 60 * 1000
        const options = {
            expiresIn
        };

        jwt.sign(
            payload,
            key,
            options,
            (error, token) => {
                if (error) {
                    res.status(500).json({
                        message: error,
                    });
                } else {
                    res.status(200).json({
                        message: "Logged in",
                        token,
                        user: payload
                    });
                }
            })
    } catch(err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal error"
        });
    }
};




module.exports = authController;