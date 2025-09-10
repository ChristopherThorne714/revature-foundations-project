const express = require('express');
const bodyParser = requier('body-parser');
const { logger, loggerMiddleware } = require('./util/logger');
const app = express();

const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const { loggerMiddleware } = require('./util/logger');

app.use(bodyParser.json());
app.use(loggerMiddleware)

app.use('/api/users/', userRoutes);
app.use('/api/tickets/', ticketRoutes);

module.expots = app;