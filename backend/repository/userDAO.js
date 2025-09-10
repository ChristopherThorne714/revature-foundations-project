const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { logger } = require('../util/logger');

const client = new DynamoDBClient({region: 'us-east-1'});
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "users_table";

async function postUser(user) {
    const command = new PutCommand({
        TableName, 
        Item: user
    })
    try { 
        const data = await documentClient.send(command);
        logger.info(`PUT command to database complete ${JSON.stringify(data)}`);
        return data;
    } catch (err) {
        logger.error(err);
        return null;
    }
}

async function getUserByUsername(username) { 
    const command = new ScanCommand({ 
        TableName, 
        FilterExpression: '#username = :username',
        ExpressionAttributeNames: {'#username' : 'username'},
        ExpressionAttributeValues: {':username' : username}
    });

    try {
        const data = await documentClient.send(command);
        logger.info(`SCAN command to database complete ${JSON.stringify(data)}`);
        return data.Items[0];
    } catch (err) { 
        logger.error(err);
        return null;
    }
}

module.exports = {
    postUser,
    getUserByUsername
};
