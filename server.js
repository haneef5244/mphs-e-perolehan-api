// ./src/index.js

// importing the dependencies
require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('./src/routes');
const { sequelize, init } = require('./config/db');
const { decodeToken, auth } = require("./src/helper/authDecode");

// defining the Express app
const app = express();


// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

sequelize.sync();

init();

app.use((req, res, next) => {
    auth(req, res, next)
})

app.use('/', router)

// starting the server
app.listen(8080, () => {
    console.log('listening on port 8080');
});