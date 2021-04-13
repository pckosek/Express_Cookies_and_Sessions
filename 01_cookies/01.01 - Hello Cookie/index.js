#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION 

var express = require('express')
var app = express();

var cookieParser = require('cookie-parser')
 


// tell express to use cookie parser
app.use(cookieParser());


// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages

app.get('/', function(req, res){
	// log the incoming cookies
	console.log( req.cookies )

	// set the outgoing cookie
	res.cookie('visitor', 'foobar')

    res.send('<!DOCTYPE html><html><body><h1>HELLO</h1></body></html>');
    
});

app.get('/ok', function(req, res){

	// send a page that does not have a cookie
    res.send('<!DOCTYPE html><html><body><h1> OK </h1></body></html>');
});



// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});