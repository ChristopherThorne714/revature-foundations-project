const express = require('express');
const router = express.Router();

const ticketController = require('../../controllers/ticketController');

router.post('/', ticketController.PostTicket);

router.get('/', ticketController.GetTickets);

module.exports = router;