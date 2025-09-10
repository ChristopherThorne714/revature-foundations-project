const express = require('express');
const bodyParser = requier('body-parser');
const app = express();
const PORT = 3000;


app.use(bodyParser.json());

app.use('/api/users/', userRoutes)

module.expots = app;