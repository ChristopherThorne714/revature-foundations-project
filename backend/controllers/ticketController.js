const ticketService = require('../service/ticketService');


/**
 * should call the service layer method to persist a ticket
 *
 * takes in the req, res objects
 * @param {JSON} req object containing the request information to be parsed
 * @param {JSON} res object to be manipulated and sent back to the client
 * @return sends res.status back to client with a message and the created ticket if one was created
 */
const PostTicket = async (req, res) => { 
    if (validatePostTicket(req.body)) {
        const { amount, description, pending, author } = req.body;
        const data = await ticketService.postTicket({amount, description, pending, author});
        if (data) { 
            res.status(201).json({message: "Ticket created", data});
        } else { 
            res.status(400).json({message: "Invalid ticket"});
        }
    } else { 
        res.status(400).json({message: "Invalid amount, description, or author | ticketController | PostTicket"});
    }
}

/**
 * should call the service layer method to retrieve all ticket objects
 *
 * @return sends res.status back to client with a message and the found messages if any were found
 */
const GetAllTickets = async (req, res) => {
    console.log('GetAllTickets()');
    const data = await ticketService.getAllTickets();
    if (data) { 
        res.status(200).json({message: "Tickets found", data})
    } else { 
        res.status(400).json({message: "no tickets found for that user"});
    }
}

/**
 * should call the service layer method to retrieve tickets by author
 *
 * takes in the req, res objects
 * @param {JSON} req object containing the request information to be parsed
 * @param {JSON} res object to be manipulated and sent back to the client
 * @return sends res.status back to client with a message and the found tickets if any were found 
 */
const GetTicketsByAuthor = async (req, res) => {
    const { username } = req.body;
    const data = await ticketService.getTicketsByUsername(username);
    if (data) {
        res.status(200).json({message: "Tickets found", data});        
    } else { 
        res.status(400).json({message: "No tickets found for that user"});
    }
}

/**
 * should call the service layer method to retrieve tickets with the desired status
 *
 * takes in the req, res objects
 * @param {JSON} req object containing the request information to be parsed
 * @param {JSON} res object to be manipulated and sent back to the client
 * @return sends res.status back to client with a message and the retrieved tickets if any were found
 */
const GetTicketsByStatus = async (req, res) =>  {
    const status = req.params.status;
    const data = await ticketService.getTicketsByStatus(status);
    if (data) { 
        res.status(200).json({message: "Tickets found", data});
    } else { 
        res.status(400).json({message: `No tickets found with status ${status}`});
    }
}

/**
 * checks if the required fields are present
 *
 * takes in the ticket object 
 * @param {JSON} ticket the ticket object to be checked
 * @returns true if all fields are present or false otherwise
 */
function validatePostTicket(ticket) {
    return ((ticket.amount && ticket.description) && ticket.author);
}

module.exports = { 
    PostTicket,
    GetAllTickets,
    GetTicketsByAuthor,
    GetTicketsByStatus,
    validatePostTicket
}