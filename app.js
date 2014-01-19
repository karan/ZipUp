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


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

/*
    URL routes
*/

app.get('/', routes.index); // api home, doesn't do anything
app.get('/get/bathrooms/', routes.getAll); // get all bathrooms
app.post('/add/bathroom', routes.addBathroom); // add a new bathroom
app.get('/b/:id', routes.getBathroom); // get details about a bathroom

app.post('/add/review/:id', routes.addReview); // post a new review at a post

app.listen(8888);

console.log('Express server listening on port 8888');
