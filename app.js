/*
    Module dependencies
*/

var express = require('express'),       // the main ssjs framework
    routes = require('./routes'),       // by default, brings in routes/index.js
    path = require('path'),             // for path manipulation
    mongoose = require('mongoose'),
    bathroom = require('./../models/bathroom'),
    review = require('./../models/review');
    app = express();                    // create an express app

var dbURI = 'mongodb://localhost/zipup';
mongoose.connect(dbURI);
mongoose.connection.on('connected', function() {
    console.log('Connected to db ' + dbURI);
});

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


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

/*
    URL routes
*/

// homepage
app.get('/', function (req, res) {
    res.send('API is running');
});

app.listen(8888);

console.log('Express server listening on port 8888');
