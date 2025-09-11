const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { logger } = require('../util/logger');

const client = new DynamoDBClient({region: 'us-east-1'});
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "user_table";

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
        const data = documentClient.send(command);
        logger.info(`PUT command to database complete | ticketDAO | createTicket | data: : ${JSON.stringify(data)}`);
        return data;
    } catch (err) {
        logger.error(`Error in ticketDAO | createTicket | error: ${data}`);
        return null; 
    }
}

async function findTickets() { 
    const command = new ScanCommand({TableName});
    try { 
        const data = documentClient.send(command);
        logger.info(`GET command to database complete: ${JSON.stringify(data)}`);
        return data;
    } catch (err) {
        logger.error(err);
        return null;
    }
}

async function findTicketsByUsername(username) { 
        const command = new ScanCommand({ 
        TableName, 
        FilterExpression: '#username = :username',
        ExpressionAttributeNames: {'#username' : 'username'},
        ExpressionAttributeValues: {':username' : username}
    });
    try { 
        const data = documentClient.send(command);
        logger.info(`SCAN command to database complete: ${data}`);
    } catch (err) { 
        logger.error(err);
        return null; 
    }
}

async function findTicketsByStatus(status) {
    const command = new ScanCommand({ 
        TableName, 
        FilterExpression: '#username = :username',
        ExpressionAttributeNames: {'#username' : 'username'},
        ExpressionAttributeValues: {':username' : username}
    });
    try { 
        const data = documentClient.send(command);
        logger.info(`SCAN command to database complete: ${data}`);
        return data;
    } catch (err) { 
        logger.error(err); 
        return null; 
    }
}

module.exports = { 
    createTicket,
    findTickets,
    findTicketsByUsername,
    findTicketsByStatus
}