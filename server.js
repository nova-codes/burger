const express = require('express');

var PORT = process.env.PORT || 8080;

var app = express();

// serve static content for the app
app.use(express.static('public'));

// parse as JSON
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

// set handlebars
var expressHandlebars = require('express-handlebars');

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

// import routes & allow the server to access them
var routes = require('./controllers/burgers_controller.js');
app.use(routes);

// start the server
app.listen(PORT, function() {
    // log server-side when started
    console.log('Server listening on http://localhost:' + PORT); 
})