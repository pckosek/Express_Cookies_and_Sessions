#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();

var session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  name: 'snorkles',
  secret: 'mysecret'
}))

var hbs = require('hbs'); 


// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM

app.set('port', process.env.PORT || 8080 );
app.set('view engine', 'hbs');


// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages

app.get('/', function(req, res){

    var visit_count;
    if (!('visit_count' in req.session)) {
        visit_count = 0;
    } else {
        visit_count = req.session.visit_count
    }
    

	if (Number.isNaN(visit_count)) {
		visit_count = 1;
	} else {
		visit_count += 1;
	}
	req.session.visit_count = visit_count;

    console.log( req.session )

	// render the page
    res.render('home', {'visitor':visit_count})
});

app.get('/small_key', function(req, res){

    req.session.small = 'teensy';

	// write html content
	res.write('set small');
    res.end()
});



app.get('/massive_key', function(req, res){

    var blah = 'blah blah ';

    req.session.big = blah.repeat(6000);

	// write html content
	res.write('set big');
    res.end()
});



// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});