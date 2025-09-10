const userService = require('../service/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = 'my-secret-key';

const { authenticateToken } = require('../util/jwt');

const Login = async (req, res) => { 
    const {username, password } = req.body;
    const data = await userService.validateLogin(username, password);
    if (data) { 
        const token = jwt.sign(
            { 
                id: data.user_id,
                username
            },
            secretKey,
            {
                expiresIn: "5m"
            }
        );
        res.status(200).json({message: "you have logged in", token});
    } else { 
        res.status(401).json({message: "invalid login credentials"});
    }
}

module.exports = {
    Login,
}