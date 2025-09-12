const express = require('express');
const router = express.Router();

const ticketController = require('../../controllers/ticketController');

router.post('/', ticketController.PostTicket);

router.get('/', ticketController.GetTickets);

router.get('/author/:author', ticketController.GetTicketsByAuthor);

router.get('/status/:status', ticketController.GetTicketsByStatus);

module.exports = router;