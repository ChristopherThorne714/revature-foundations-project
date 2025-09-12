const userDAO = require('../repository/userDAO');

const bcrypt = require('bcrypt');
const { logger } = require('../util/logger');


/**
 * should call the userDAO method to persist users, validate the user fields, and encrypt the user.password string
 *
 * takes in the user object from controller layer
 * @param {JSON} user the user object to be sent to the DAO
 * @returns the persisted data or null
 */
async function postUser(user) {
    const saltRounds = 10; 
    const role = !user.role ? "employee" : user.role;
    
    // true if a user with the given username is found
    const nonUniqueUser = await userDAO.findUserByUsername(user.username);

    if (validateUser(user) && !nonUniqueUser) {
        const password = await bcrypt.hash(user.password, saltRounds);
        const data = await userDAO.createUser({
            username: user.username,
            password,
            user_id: crypto.randomUUID(),
            role
        })
        if (data) { 
            logger.info(`Creating new user | userService | postUser | Data:  ${JSON.stringify(data)}`);
            return data;
        } else { 
            logger.info(`Failed to create user | userService | postUser `);
            return null;
        }

    } else {
        logger.info(`Failed to validate user or invalid username | userService | postUser | Data:  ${JSON.stringify(user)}`);
    }
}

/**
 * should call the userDAO method to find a user with the given username and compare the given password with the one found
 *
 * takes in the username and password fields
 * @param {string} username the username to be checked for 
 * @param {string} password the password to be compared against
 * @returns the found user or null
 */
async function validateLogin(username, password) { 
    const user = await getUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
        logger.info(`User logged in successfully | userService | validateLogin `);
        return user;
    } else { 
        logger.info(`Invalid user credentials | userService 
             validateLogin`);
        return null;
    }
}

/**
 * should call the userDAO method to retrieve users by their associated user
 *
 * takes in the user object from controller layer
 * @param {JSON} user the user object to be sent to the DAO
 * @returns the persisted data or null
 */
async function getUserByUsername(username) { 
    if (username) {
        const data = await userDAO.findUserByUsername(username);
        if (data) {
            logger.info(`User found | userService | getUserByUsernamer | username: ${JSON.stringify(data)}`);
            return data;
        } else {
            logger.info(`User not found | userService | getUserByUsername |   username: ${JSON.stringify(data)}`);
            return null;
        }
    }
    logger.info(`No username given | userService | getUserByUsername`);
    return null;
}

/**
 * evaluates the truthiness of the user fields
 *
 * takes in the user object
 * @param {JSON} user the user object to be evaluated
 * @returns true or false depending on truthiness of given fields
 */
function validateUser(user) { 
    const usernameResult = user.username.length > 0;
    const passwordResult = user.password.length > 0;
    return (usernameResult && passwordResult);
}

module.exports = {
    postUser,
    validateLogin,
}