/*
    Module dependencies
*/

var express = require('express'),       // the main ssjs framework
    path = require('path'),             // for path manipulation
    mongoose = require('mongoose'),
    app = express();                    // create an express app

var db = require('./db');
var routes = require('./routes');       // by default, brings in routes/index.js

/*
    Configure environments
*/

app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

/*
    URL routes
*/

app.get('/', function(req, res) {
    res.sendfile('index.html');
});
app.get('/addBathroom', function(req, res) {
    res.sendfile('addBathroom.html');
}); // add new bathroom

app.get('/get/bathrooms/', routes.getAll); // get all bathrooms
app.post('/add/bathroom', routes.addBathroom); // add a new bathroom
app.get('/b/:id', routes.getBathroom); // get details about a bathroom

app.post('/add/review/:bid', routes.addReview); // post a new review at a post
app.get('/get/reviews/:bid', routes.getReviews); // get reviews for a bathroom

app.listen(8888);

console.log('Express server listening on port 8888');
