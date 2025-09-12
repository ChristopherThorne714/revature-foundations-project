const ticketDAO = require('../repository/ticketDAO');

const { logger } = require('../util/logger');


/**
 * should call the ticketDAO method to persist tickets and return the persisted data
 *
 * takes in the ticket object from controller layer
 * @param {JSON} ticket the ticket object to be sent to the DAO
 * @returns the persisted data or null
 */
async function postTicket(ticket) { 
    const status = !ticket.status ? "pending" : "resolved";
    if (validateTicket(ticket)) {
        const data = await ticketDAO.createTicket({
            amount: ticket.amount,
            description: ticket.description,
            status,
            ticket_id: crypto.randomUUID(),
            author: ticket.author
        });
        if (data) {
            logger.info(`Creating new ticket | ticketService | postTicket | Data: ${data}`);
            return data;
        } else { 
            logger.info(`Failed to create ticket | ticketService | postTicket`);
            return null;
        }
    } else { 
        logger.info(`Failed to validate ticket | ticketService | postTicket | error: ${JSON.stringify(ticket)}`);
        return null;
    }
}

/**
 * should call the DAO layer to retrieve a list of all tickets in db
 *
 * @returns the retrieved tickets or null
 */
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

/**
 * should call the ticketDAO method to retrieve tickets by their associated user
 *
 * takes in the ticket object from controller layer
 * @param {JSON} ticket the ticket object to be sent to the DAO
 * @returns the retrieved tickets or null
 */
async function getTicketsByUsername(username) { 
    if(username) { 
        const data = await ticketDAO.findTicketsByUsername(username);
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

/**
 * should call the ticketDAO method to retrieve tickets by the given status
 *
 * takes in the ticket object from controller layer
 * @param {JSON} ticket the ticket object to be sent to the DAO
 * @returns the retrieved tickets or null
 */
async function getTicketsByStatus(status) {
    const data = await ticketDAO.findTicketsByStatus(status);
    if (data) {
        logger.info(`Tickets found | ticketService | getTicketsByStatus | Data: ${data}`)
        return data;
    } else { 
        logger.info(`No tickets found | ticketService | getTicketsByStatus | `)
    }
}

/**
 * evaluates the truthiness of the ticket fields
 *
 * takes in the ticket object
 * @param {JSON} ticket the ticket object to be evaluated
 * @returns true or false depending on truthiness of given fields
 */
function validateTicket(ticket) {
    const amountResult = !ticket.amount ? false : true;
    const descResult = ticket.description.length > 0;
    const authorResult = ticket.author.length > 0;
    return (amountResult && descResult && authorResult);
}

module.exports = {
    postTicket,
    getTickets,
    getTicketsByUsername,
    getTicketsByStatus
}