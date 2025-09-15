const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, UpdateCommand, PutCommand, ScanCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
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
async function findAllTickets() { 
    const command = new ScanCommand({TableName});
    try { 
        const data = await documentClient.send(command);
        logger.info(`GET command to database complete | ticketDAO | findAllTickets | data: ${JSON.stringify(data)}`);
        return data.Items.length > 0 ? data.Items[0] : null;
    } catch (err) {
        logger.error(`Error in ticketDAO | findAllTickets | error: ${err}`);
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
        logger.info(`SCAN command to database complete | ticketDAO | fintTicketByAuthor | data: ${JSON.stringify(data)}`);
        return data.Items.length > 0 ? data.Items[0] : null;
    } catch (err) { 
        logger.error(`Error in ticketDAO | findTicketsByAuthor | error: ${err}`);
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
        logger.info(`SCAN command to database complete | ticketDAO | fintTicketsByStatus | data: ${JSON.stringify(data)}`);
        return data.Items.length > 0 ? data.Items[0] : null;
    } catch (err) { 
        logger.error(`Error in ticketDAO | findTicketsByStatus | error: ${err}`);
        return null; 
    }
}

/**
 * should retrieve a single ticket item pertaining to the given ticket_id
 *
 * takes in the desired ticket_id
 * @param {string} ticket_id string to be filtered by
 * @returns the retrieved data or null 
 */
async function findTicketById(ticket_id) { 
    const command = new QueryCommand({ 
        TableName, 
        FilterExpression: '#ticket_id = :ticket_id',
        ExpressionAttributeNames: {'#ticket_id' : 'ticket_id'},
        ExpressionAttributeValues: {':ticket_id' : ticket_id}
    });
    try { 
        const data = await documentClient.send(command); 
        logger.info(`QUERY command to database complete | ticketDAO | findTIcketById | data: ${JSON.stringify(data)}`);
        return data;
    } catch (err) { 
        logger.error(`Error in ticketDAO | findTicketById | error: ${JSON.stringify(err)}`);
        return null;
    }
}

/**
 * should update/process a single ticket item using the ticket_id
 *
 * takes in the ticket_id
 * @param {string} ticket_id string to be filtered by
 * @returns the updated item or null
 */
async function processTicketById(ticket_id, status) { 
    const command = new UpdateCommand({ 
        TableName,
        key: {
            PartitionKeyAttribute: ticket_id,
        },
        UpdateExpression: 'SET #status = :status',
        ExpressionAttributeNames: {'#status' : 'status'},
        ExpressionAttributeValues: {':status' : status},
        ReturnValues: 'UPDATED_NEW'
    });
    try { 
        const data = await documentClient.send(command);
        logger.info(`UPDATE command to database complete | ticketDAO | processTicketById | data: ${JSON.stringify(data)}`);
        return data;
    } catch (err) { 
        logger.error(`Error in ticketDAO | processTicketById | error: ${err}`);
        return null;
    }
}

module.exports = { 
    createTicket,
    findAllTickets,
    findTicketsByAuthor,
    findTicketsByStatus,
    findTicketById,
    processTicketById
}