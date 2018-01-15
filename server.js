// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const http = require("http");

const TIMEOUT_INTERVAL = 300000;

// Setup the config file
const config = require('./config.json');
app.set('config', config[process.env.NODE_ENV]);

// Setup static resources
app.use(express.static('client'));

// Setup routes
require('./app/routes')(app, {});

// Open the port
app.listen(process.env.PORT || 8080);

// Ping the app every 5 minutes to prevent it from going to sleep.
setInterval(() => {
  http.get('http://freshperspectivemusic.herokuapp.com');
}, TIMEOUT_INTERVAL);
