const express = require('express');
const router = express.Router();

const ticketController = require('../../controllers/ticketController');

router.post('/', ticketController.PostTicket);

router.get('/', ticketController.GetTickets);

router.get('/author/:author', ticketController.GetTicketsByAuthor);

router.get('/status/:status', ticketController.GetTicketsByStatus);

/**
 * TODO: 
 *  register more routes for: approving/denying tickets
 *      view pending tickets
 *      view approved tickets
 *  employees should be able to view their own ticket history
 *  previous/archived tickets should show submission details
 */

module.exports = router;