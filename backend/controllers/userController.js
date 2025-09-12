const userService = require('../service/userService');
const jwt = require('jsonwebtoken');

const secretKey = 'my-secret-key';


/**
 * should call the service layer method to validate the user and create the jwt token
 *
 * takes in the req, res objects
 * @param {JSON} req object containing the request information to be parsed
 * @param {JSON} res object to be manipulated and sent back to the client
 * @return sends res.status back to client with a message and the created user if one was created
 */
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

/**
 * should call the service layer method to persist a user
 *
 * takes in the req, res objects
 * @param {JSON} req object containing the request information to be parsed
 * @param {JSON} res object to be manipulated and sent back to the client
 * @return sends res.status back to client with a message and the created user if one was created
 */
const RegisterUser = async (req, res) => { 
    if(validatePostUser(req.body)) {
        const data = await userService.postUser(req.body);
        if (data) { 
            res.status(201).json({message: `Created user: ${JSON.stringify(data)}`});
        } else { 
            res.status(400).json({message: `Username already taken`, data: req.body});
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