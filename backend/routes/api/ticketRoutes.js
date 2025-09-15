const express = require('express');
const router = express.Router();

const { PostTicket, GetAllTickets, GetTicketsByAuthor, GetTicketsByStatus } = require('../../controllers/ticketController');

router.post('/', PostTicket);

router.get('/', GetAllTickets);

router.get('/author/:author', GetTicketsByAuthor);

router.get('/status/:status', GetTicketsByStatus);

router.post('/:ticketId', someMiddleware);

/**
 * TODO: 
 *  register more routes for: approving/denying tickets
 *  employees should be able to view their own ticket history
 *  previous/archived tickets should show submission details
 */

module.exports = router;