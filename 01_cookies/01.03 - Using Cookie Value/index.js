#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();

var cookieParser = require('cookie-parser')
var hbs = require('hbs'); 


// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM

app.set('view engine', 'hbs');
app.use(cookieParser('somesecret'));


// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages

app.get('/', function(req, res){

	// log the incoming cookies
	console.log( req.cookies )
	console.log( req.signedCookies )
	
	var visit_count = Number(req.cookies.visit_count);
// 	var visit_count = Number(req.signedCookies.visit_count);
	
	if (Number.isNaN(visit_count)) {
		visit_count = 1;
	} else {
		visit_count += 1;
	}
	res.cookie('visit_count', visit_count)
// 	res.cookie('visit_count', visit_count, {signed:true, secure:true})

	// render the page
    res.render('home', {'visit_number':visit_count})
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