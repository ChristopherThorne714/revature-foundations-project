const userDAO = require('../repository/userDAO');

const bcrypt = require('bcrypt');
const { logger } = require('../util/logger');

async function postUser(user) {
    const saltRounds = 10; 
    if (validateUser(user)) {
        const password = await bcrypt.hash(user.password, saltRounds);
        const data = await userDAO.postUser({
            username: user.username,
            password,
            user_id: crypto.randomUUID()
        })
        logger.info(`Creating new user: ${JSON.stringify(data)}`);
        return data;
    } else {
        logger.info(`Failed to validate user: ${JSON.stringify(user)}`);
    }
}

async function validateLogin(username, password) { 
    const user = await getUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
        logger.info(`User logged in successfully`);
        return user;
    } else { 
        logger.info(`Invalid user credentials`);
        return null;
    }
}

async function getUserByUsername(username) { 
    if (username) {
        const data = await userDAO.getUserByUsername(username);
        if (data) {
            logger.info(`User found by username: ${JSON.stringify(data)}`);
            return data;
        } else {
            logger.info(`User not found by username: ${JSON.stringify(data)}`);
            return null;
        }
    }
    logger.info(`No username given`);
    return null;
}

function validateUser(user) { 
    const usernameResult = user.username.length > 0;
    const passwordResult = user.password.length > 0;
    return (usernameResult && passwordResult);
}

module.exports = {
    postUser,
    validateLogin,
}