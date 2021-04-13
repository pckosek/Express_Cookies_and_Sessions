#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION 

var express = require('express')
var app = express();

var cookieSession = require('cookie-session')

app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
  name: 'snorkles',
  keys: ['mysecret']
}))

var hbs = require('hbs'); 


// -------------- express initialization -------------- //
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
    res.render('home', {'visit_number':visit_count})
});

app.get('/small_key', function(req, res){

    req.session.small = 'teensy';

    // send a page that does not have a cookie
    res.send('<!DOCTYPE html><html><body><h1>Wrote a small amount of data to req.session</h1></body></html>');

});



app.get('/massive_key', function(req, res){

    var blah = 'blah blah ';

    // string.repeat(X) repeats a string X number of times
    req.session.big = blah.repeat(200);

    // write html content
    res.send('<!DOCTYPE html><html><body><h1>Wrote a HUGE amount of data to req.session</h1></body></html>');
});



// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});