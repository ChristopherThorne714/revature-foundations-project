const { validatePostTicket } = require('../controllers/ticketController');


const dummyTicket = {
    'amount': 41231,
    'description': 'something',
    'author': '1231lkajshdflkj'
};
const badDummyTicket = {
    'amount': null,
    'description': null,
    'author': null
};

test('validatePostTicket should correctly resolve to Truthy', () => { 
    let result = validatePostTicket(dummyTicket);

    expect(result).toBeTruthy();
})

test('validatePostTicket should correctly resolve to Falsy', () => { 
    let result = validatePostTicket(badDummyTicket);

    expect(result).toBeFalsy();
})