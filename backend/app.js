const express = require('express');
const bodyParser = require('body-parser');
const { loggerMiddleware } = require('./util/logger');
const app = express();

const userRoutes = require('./routes/api/userRoutes');
const ticketRoutes = require('./routes/api/ticketRoutes');

app.use(bodyParser.json());
app.use(loggerMiddleware);

app.use('/api/users/', userRoutes);
app.use('/api/tickets/', ticketRoutes);

module.expots = app;