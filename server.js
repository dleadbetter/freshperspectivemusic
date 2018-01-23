// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const http = require("http");

const TIMEOUT_INTERVAL = 300000;

// Setup the config file
const json = require('./config.json');
const config = json[process.env.NODE_ENV];

app.set('config', config);

// Setup static resources
app.use(express.static('client'));

// Setup routes
require('./app/routes')(app, {});

// Open the port
app.listen(process.env.PORT || 8080);

// Ping the app every 5 minutes to prevent it from going to sleep.
setInterval(() => {
  http.get(config.url);
}, TIMEOUT_INTERVAL);
