const express = require('express');
const router = express.Router();

const ticketController = require('../../controllers/ticketController');

router.post('/', ticketController.PostTicket);

router.get('/', ticketController.GetAllTickets);

router.get('/author/:author', ticketController.GetTicketsByAuthor);

router.get('/status/:status', ticketController.GetTicketsByStatus);

router.post('/:ticketId', ticketController.ProcessTicketById);

/**
 * TODO: 
 *  register more routes for: approving/denying tickets
 *  employees should be able to view their own ticket history
 *  previous/archived tickets should show submission details
 */

module.exports = router;