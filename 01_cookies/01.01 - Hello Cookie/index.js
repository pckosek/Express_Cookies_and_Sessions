#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();

var cookieParser = require('cookie-parser')
 


// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM

app.set('port', process.env.PORT || 8080 );

// tell express to use cookie parser
app.use(cookieParser());


// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages

app.get('/', function(req, res){
	// log the incoming cookies
	console.log( req.cookies )

	// set the outgoing cookie
	res.cookie('visitor', 'foobar')

	// write html content
	res.write('hola');
    res.end()
});

app.get('/ok', function(req, res){

	// write html content
	res.write('ok');
    res.end()
});



// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});