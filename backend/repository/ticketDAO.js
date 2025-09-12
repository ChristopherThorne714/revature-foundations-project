const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { logger } = require('../util/logger');

const client = new DynamoDBClient({region: 'us-east-1'});
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "tickets_table";

/**
 * should persist a ticket to the database
 *
 * takes in the ticket object from ticketService
 * @param {JSON} ticket the ticket object to persist
 * @returns the persisted data or null
 */
async function createTicket(ticket) { 
    const command = new PutCommand({
        TableName,
        Item: ticket
    });
    try {
        const data = await documentClient.send(command);
        logger.info(`PUT command to database complete | ticketDAO | createTicket | data: : ${JSON.stringify(JSON.stringify(data))}`);
        return data;
    } catch (err) {
        logger.error(`Error in ticketDAO | createTicket | error: ${err}`);
        return null; 
    }
}

/**
 * should retrieve a list of all tickets in db
 *
 * @returns THe retrieved list or null
 */
async function findTickets() { 
    const command = new ScanCommand({TableName});
    try { 
        const data = await documentClient.send(command);
        logger.info(`GET command to database complete: ${JSON.stringify(data)}`);
        return data;
    } catch (err) {
        logger.error(err);
        return null;
    }
}

/**
 * should retrieve a list of tickets associated with a given author
 *
 * takes in the author name 
 * @param {string} author string to be filtered by
 * @returns the retrieved data or null 
 */
async function findTicketsByAuthor(author) { 
        const command = new ScanCommand({ 
        TableName, 
        FilterExpression: '#author = :author',
        ExpressionAttributeNames: {'#author' : 'author'},
        ExpressionAttributeValues: {':author' : author}
    });
    try { 
        const data = await documentClient.send(command);
        logger.info(`SCAN command to database complete: ${JSON.stringify(data)}`);
    } catch (err) { 
        logger.error(err);
        return null; 
    }
}

/**
 * should retrieve a list of tickets associated with a given status
 *
 * takes in the desired status
 * @param {string} status string to be filtered by
 * @returns the retrieved data or null 
 */
async function findTicketsByStatus(status) {
    const command = new ScanCommand({ 
        TableName, 
        FilterExpression: '#status = :status',
        ExpressionAttributeNames: {'#status' : 'status'},
        ExpressionAttributeValues: {':status' : status}
    });
    try { 
        const data = await documentClient.send(command);
        logger.info(`SCAN command to database complete: ${JSON.stringify(data)}`);
        return data;
    } catch (err) { 
        logger.error(err); 
        return null; 
    }
}

module.exports = { 
    createTicket,
    findTickets,
    findTicketsByAuthor,
    findTicketsByStatus
}