var express = require('express');
var app = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var morgan = require('morgan'); 			// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

var stock = require('./routes/stocks');

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' })); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


app.post('/api/addstock', stock.addStock);
app.get('/api/searchAll/:startDate/:endDate', stock.searchAllByDate);
app.get('/api/stocks', stock.findAll);

app.get('/viewstock', function (req, res) {
    res.sendfile('./public/views/stocks.html'); // load the single view file (angular will handle the page changes on the front-end)
});

//Make sure it'll be the last point of file before start listining to port.
app.get('*', function (req, res) {
    res.sendfile('./public/views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");