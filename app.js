require('dotenv').config();

const express = require('express');

const feedRoutes = require('./routes/feed');
const morgan = require('morgan');

const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/feed', feedRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log('listening on port', PORT));