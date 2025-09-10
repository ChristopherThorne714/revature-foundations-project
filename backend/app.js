const express = require('express');
const bodyParser = require('body-parser');
const { loggerMiddleware } = require('./util/logger');
const { authenticateToken } = require('./util/jwt');

const userRoutes = require('./routes/api/userRoutes');
// const ticketRoutes = require('./routes/api/ticketRoutes');

const app = express();

app.use(bodyParser.json());
app.use(loggerMiddleware);

app.use('/api/users', userRoutes);
// app.use('/api/tickets', ticketRoutes);

app.get('/', (req, res) => { 
    res.send('Home Page');
})

app.get('/protected', authenticateToken, (req, res) => { 
    res.json({message: 'Accessed protected route', user: req.user});
})

module.exports = app;