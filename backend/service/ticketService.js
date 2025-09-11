const ticketDAO = require('../repository/ticketDAO');

const bcrypt = require('bcrypt');
const { logger } = require('../util/logger');

async function postTicket(ticket) { 
    const pending = !ticket.pending ? true : ticket.pending;
    if (validateTicket(ticket)) {
        const data = await ticketDAO.createTicket({
            amount: ticket.amount,
            description: ticket.description,
            pending,
            // ticket_id: crypto.randomUUID() // to be replaced with the id of the user who posted the ticket
        });
        logger.info(`Creating new user | ticketService | postTicket | Data: ${data}`);
        return data;
    } else { 
        logger.info(`Failed to validate ticket | ticketService | postTicket | error: ${JSON.stringify(ticket)}`);
        return null;
    }
}

async function getTickets() { 
    const data = await ticketDAO.findTickets();
    if (data) { 
        logger.info(`Tickets found | ticketService | getTickets | Data: ${data}`);
        return data;
    } else { 
        logger.info(`No tickets found | ticketService | getTickets`);
        return null;
    }
}
async function getTicketsByUsername(username) { 
    if(username) { 
        const data = ticketDAO.findTicketsByUsername(username);
        if (data) {
            logger.info(`Tickets found | ticketService | getTicketsByUsername | Data: ${data}`);
            return data;
        } else { 
            logger.info(`No tickets found | ticketService | getTicketsByUsername | Username: ${username}`);
            return null;
        }
    } else { 
        logger.info(`No username given | ticketService | getTicketsByUsername`);
        return null;
    }
}

async function getTicketsByStatus(pending) {
    const data = ticketDAO.findTicketsByStatus(pending)
    if (data) {
        logger.info(`Tickets found | ticketService | getTicketsByStatus | Data: ${data}`)
        return data;
    } else { 
        logger.info(`No tickets found | ticketService | getTicketsByStatus | `)
    }
}


function validateTicket(ticket) {
    const amountResult = !ticket.amount ? false : true;
    const descResult = ticket.description > 0;
    return (amountResult && descResult);
}