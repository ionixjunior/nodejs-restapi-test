var express    = require('express');
var app        = express();
var port       = 3000;
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var apiURL     = '/api';

mongoose.connect('mongodb://localhost:27017/sample-restapi');

MainRouter    = require('./app/routes/main');
ContactRouter = require('./app/routes/contact');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(apiURL, MainRouter);
app.use(apiURL, ContactRouter);

var server = app.listen(port);
console.log('Server started on port %s', server.address().port);
