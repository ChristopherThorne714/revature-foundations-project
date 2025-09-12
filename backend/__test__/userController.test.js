const { Login, RegisterUser, validatePostUser} = require('../controllers/userController');

const mockJWT = jest.fn();
const mockLogger = jest.fn();
const validateLogin = jest.fn();

const dummyReq = {
    body: {
        "username": "user",
        "password": "pass"
    }
};

const dummyUser = {
    'username': 'user',
    'password': 'pass'
}

const badDummyUser = {
    'username': null,
    'password': null
}

const dummyRes = {};

test('validatePostUser should correctly resolve the username and password fields to truthy', () => { 
    let result = validatePostUser(dummyUser);

    expect(result).toBeTruthy();
})

test('validatePostUser should correctly resolve the username and password fields to falsy', () => { 
    let result = validatePostUser(badDummyUser);

    expect(result).toBeFalsy();
})

