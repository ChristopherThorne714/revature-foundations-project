const userService = require('../service/userService');
const jwt = require('jsonwebtoken');

const secretKey = 'my-secret-key';

const Login = async (req, res) => { 
    const {username, password} = req.body;
    const data = await userService.validateLogin(username, password);
    if (data) { 
        const token = jwt.sign(
            { 
                id: data.user_id,
                username
            },
            secretKey,
            {
                expiresIn: "15m"
            }
        );
        res.status(202).json({message: "you have logged in", token});
    } else { 
        res.status(401).json({message: "invalid login credentials"});
    }
}

const RegisterUser = async (req, res) => { 
    if(validatePostUser(req.body)) {
        const data = await userService.postUser(req.body);
        if (data) { 
            res.status(201).json({message: `Created user: ${JSON.stringify(data)}`});
        } else { 
            res.status(400).json({message: `User not created`, data: req.body});
        }
    } else { 
        res.status(400).json({message: `Invalid username or password`, data: req.body});
    }
}

function validatePostUser(user) {
    return (user.username && user.password);
}

module.exports = {
    Login,
    RegisterUser
}