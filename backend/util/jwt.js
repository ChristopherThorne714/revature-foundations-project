const jwt = require('jsonwebtoken');
const { logger } = require('./logger');

const secretKey = 'my-secret-key';

async function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(400).json({message: "Access denied"});
    } else { 
        const user = await decodeJWT(token);
        if (user) {
            req.user = user;
            next();
        } else { 
            res.status(400).json({message: 'Bad JWT'});
        }
    }
}

async function decodeJWT(token) {
    try { 
        const user = await jwt.verify(token, secretKey);
        return user;
    } catch (err) {
        logger.error(err);
        return null;
    }
}

module.exports = { 
    authenticateToken
}
