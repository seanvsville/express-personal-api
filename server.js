// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

/************
 * DATABASE SETUP and CONFIGURATION *
 ************/
//require express in our app
var express = require('express'),
 bodyParser = require('body-parser');

// connect to db models
var db = require('./models');

// generate a new express app and call it 'app'
var app = express();

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

/**********
 * ROUTES *
 **********/

 // define a root route: localhost:3000/
 app.get('/', function (req, res) {
   res.sendFile('views/index.html' , { root : __dirname});
 });



/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/seanvsville/express-personal-api/README.md",
    base_url: "http://apricot-cobbler-58165.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Information about me", },
      {method: "POST", path: "/api/albums", description: "E.g. Add a new favorite album"},
      {method: "GET", path: "/api/albums", description: "Get information about my favorite albums"},
      {method: "DELETE", path: "/api/albums", description: "Delete an album you dislike"},
      {method: "PUT", path: "/api/albums", description: "Found a typo? Correct my information"}
    ]
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
