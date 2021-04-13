#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION 

var express = require('express')
var app = express();

var cookieParser = require('cookie-parser')
 


// -------------- express initialization -------------- //

// tell express to use cookie parser
app.use(cookieParser());


// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages

app.get('/', function(req, res){

	// log the incoming cookies
	console.log( req.cookies )

	// has the visitor key been set?
	if (!('visit_count' in req.cookies)) {

		res.cookie('visit_count', 1)
	} else {
		// var visit_count = req.cookies.visit_count;
		// res.cookie('visit_count', visit_count+1)

		var visit_count = Number(req.cookies.visit_count);
		res.cookie('visit_count', visit_count+1)


		// // A MORE THOROUGH WAY WOULD BE TO VALIDATE COOKIE DATA
		// var visit_count = Number(req.cookies.visit_count);
		// if (Number.isNaN(visit_count)) {
		// 	res.cookie('visit_count', 1)
		// } else {
		// 	res.cookie('visit_count', visit_count+1)
		// }


	}


	// write out page content
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