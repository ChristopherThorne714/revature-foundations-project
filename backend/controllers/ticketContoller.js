const ticketService = require('../service/ticketService');

async function postTicket(req, res) { 
    if (validatePostTicket(req.body)) {

    }
    const { amount, description, pending } = req.body;
    const data = await ticketService.postTicket({amount, description, pending});
    if (data) { 
        res.status(201).json({message: "Ticket created", data});
    } else { 
        res.status(400).json({message: "Invalid ticket"});
    }
}

async function getTickets() { 
    const data = await ticketService.getTickets();
    if (data) { 
        res.status(200).json({message: "Tickets found", data})
    } else { 
        res.status(400).json({message: "no tickets found for that user"});
    }
}

async function getTicketsByUsername(req, res) {
    const { username } = req.body;
    const data = await ticketService.getTicketsByUsername(username);
    if (data) {
        res.status(200).json({message: "Tickets found", data});        
    } else { 
        res.status(400).json({message: "No tickets found for that user"});
    }
}

async function getTicketsByStatus(req, res) { 
    const { status } = req.body;
    const data = ticketService.getTicketsByStatus(status);
    if (data) { 
        res.status(200).json({message: "Tickets found", data});     
    } else { 
        res.status(400).json({message: `No tickets found with status ${status}`});
    }
}

async function validatePostTicket(ticket) { 
    if (ticket.amount && ticket.description && ticket.pending) {
        
    }
}

module.exports = { 
    postTicket,
    getTickets,
    getTicketsByUsername,
    getTicketsByStatus
}