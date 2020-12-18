const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const routes = require('./controllers/burgers_controller.js');
const expressHandlebars = require('express-handlebars');
const methodOverride = require('method-override');

// serve static content for the app
app.use(express.static('public'));

// parse as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set handlebars
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(methodOverride('_method')); 

// import routes & allow the server to access them
app.use(routes);

// start the server
app.listen(PORT, function() {
    // log server-side when started
    console.log('Server listening on http://localhost:' + PORT); 
})