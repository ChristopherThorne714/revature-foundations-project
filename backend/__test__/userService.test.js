const userService = require('../service/userService');
const logger = require('../util/logger');
const bcrypt = require('bcrypt');

const userDAO  = require ('../repository/userDAO');

bcrypt.compare = jest.fn();
userService.getUserByUsername = jest.fn();
logger.logger.info = jest.fn(() => "testing");
// logger.logger.error = jest.fn(() => "testing");

jest.mock('../repository/userDAO');



describe('Positive testing on validateLogin', () => {

    test('should return user when username exists and password matches', async () => {
        const dummyUser = {
            'username': 'testUser',
            'password': 'testPass',
            'role': 'manager',
        }; 

        bcrypt.compare.mockResolvedValue(true);
        userDAO.findUserByUsername.mockResolvedValue(dummyUser);

        const result = await userService.validateLogin(dummyUser.username, dummyUser.password);

        expect(userDAO.findUserByUsername).toHaveBeenCalledWith(dummyUser.username);
        expect(bcrypt.compare).toHaveBeenCalled();
        expect(logger.logger.info).toHaveReturnedWith('testing');
        expect(result).toBe(dummyUser);
    });
});

describe('negative testing on validateLogin', () => {
        test('should return null when invalid username supplied', async () => {
        const username = null;
        const password = 'testPass';
        userDAO.findUserByUsername.mockResolvedValue(null);

        const result = await userService.validateLogin(username, password);

        expect(userDAO.findUserByUsername).toHaveBeenCalled();
        expect(logger.logger.info).toHaveReturnedWith('testing');
        expect(result).toBe(null);
    });

    test('should return null when invalid password supplied', async () => {
        const dummyUser = {
            'username': 'testUser',
            'password': null,
            'role': 'manager',
        }; 
        bcrypt.compare.mockResolvedValue(false);
        userDAO.findUserByUsername.mockResolvedValue(dummyUser);

        const result = await userService.validateLogin(dummyUser.username, dummyUser.password);

        expect(userDAO.findUserByUsername).toHaveBeenCalledWith(dummyUser.username);
        expect(bcrypt.compare).toHaveBeenCalled();
        expect(logger.logger.info).toHaveReturnedWith('testing');
        expect(result).toBe(null);
    });
});


describe('Positive testing on getUserByUsername', () => {

    it('should return a user object when supplied with a valid username', async () => {
        const dummyUser = {
            'username': 'testUser',
            'password': 'testPass',
            'role': 'manager',
        };
        userDAO.findUserByUsername.mockResolvedValue(dummyUser);

        const result = await userService.getUserByUsername(dummyUser.username);

        expect(userDAO.findUserByUsername).toHaveBeenCalledWith(dummyUser.username);
        expect(logger.logger.info).toHaveReturnedWith('testing');
        expect(result).toBe(dummyUser);
    });
});

describe('Negative testing on getUserByUsername', () => { 

    it('should return null when supplied with invalid username', async () => {
        const username = null;
        userDAO.findUserByUsername.mockResolvedValue(null);

        const result = await userService.getUserByUsername(username);

        expect(userDAO.findUserByUsername).toHaveBeenCalled();
        expect(logger.logger.info).toHaveReturnedWith('testing');
        expect(result).toBe(null);
    });
});

describe('Positive testing on validateUser', () => {

    it('should return true when given a valid username and password', () => {
        const username = 'someTHING';
        const password = 'someOtherTHING';

        const result = userService.validateUser(username, password);

        expect(result).toBeTruthy();
    });
})