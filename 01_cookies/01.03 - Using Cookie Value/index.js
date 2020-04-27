#!/usr/bin/nodejs

console.clear()
// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();

var cookieParser = require('cookie-parser')
var hbs = require('hbs'); 


// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM

app.set('port', process.env.PORT || 80 );
app.set('view engine', 'hbs');
app.use(cookieParser('somesecret'));


// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages

app.get('/', function(req, res){

	// log the incoming cookies
	console.log( req.cookies )
	console.log( req.signedCookies )
	
	// var visit_count = Number(req.cookies.visit_count);
	var visit_count = Number(req.signedCookies.visit_count);
	
	if (Number.isNaN(visit_count)) {
		visit_count = 1;
	} else {
		visit_count += 1;
	}
	res.cookie('visit_count', visit_count, {signed:true, secure:true})

	// render the page
    res.render('home', {'visitor':visit_count})
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