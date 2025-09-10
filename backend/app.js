const express = require('express');
const bodyParser = require('body-parser');
const { loggerMiddleware } = require('./util/logger');

const userRoutes = require('./routes/api/userRoutes');
// const ticketRoutes = require('./routes/api/ticketRoutes');

const app = express();

app.use(bodyParser.json());
app.use(loggerMiddleware);

app.use('/api/users', userRoutes);
// app.use('/api/tickets', ticketRoutes);

module.exports = app;