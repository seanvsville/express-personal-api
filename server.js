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

 // get profile
 app.get('/api/profile', function (req, res) {
   // send all profile as JSON response
   db.Profile.find().populate('profile')
    .exec(function(err, profile) {
      if (err) {
        return console.log('index error: ' + err);
      }
      res.json(profile);
    });
 });

 // get all albums
app.get('/api/albums', function (req, res) {
  // send all albums as JSON response
  db.Album.find()
    .populate('artist')
    .exec(function (err, albums) {
      if (err) { return console.log("index error: " + err); }
      res.json(albums);
  });
});

// create new album
app.post('/api/albums', function (req, res) {
  var newAlbum = new db.Album({
    title: req.body.title,
    albumCover: req.body.albumCover,
    releaseDate: req.body.releaseDate,
  });

  // create artist from req.body
  db.Artist.create({name: req.body.artist}, function(err, artist){
    if (err) {
      return console.log(err);
    }

    // add this artist to the movie
    newAlbum.artist = artist;

    // save newAlbum to database
    newAlbum.save(function(err, album){
      if (err) {
        return console.log('save error: ' + err);
      }
      console.log('saved ', album.title);

      // send back the album
      res.json(album);
    });
  });
});

  // delete album
  app.delete('/api/albums/:id', function (req, res) {
    // get album id from url params (`req.params`)
    console.log('albums delete', req.params);
    var albumId = req.params.id;
    // find the index of the album we want to remove
    db.Album.findOneAndRemove({ _id: albumId }, function (err, deletedAlbum) {
      res.json(deletedAlbum);
    });
  });

  // add song to existing album
  app.post('/api/albums/:album_id/songs', function (req, res) {
    var albumId = req.params.album_id;
    db.Album.findById(albumId)
    .populate('artist')
    .exec(function (err, foundAlbum){
      console.log(foundAlbum);
      // if error, return status code 500: internal server error
      if (err) {
        res.status(500).json("error does not compute");
      }
      else if (foundAlbum === null) {
        res.status(404).json({newSongError: "No album found by this ID"});
      }
      else {
        foundAlbum.songs.push(req.body);
        foundAlbum.save();
        res.status(201).json(foundAlbum);
      }
    });
  });

  // Delete a song associated with a album
  app.delete('/api/albums/:album_id/songs/:song_id', function (req, res) {
    // Get album id from url params (`req.params`)
    var albumId = req.params.album_id;
    var songId = req.params.song_id;
    db.Album.findById(albumId)
      .populate('artist')
      .exec(function(err, foundAlbum) {
        if (err) {
          res.status(500).json({error: err.message});
        } else if (foundAlbum === null) {
          res.status(404).json({error: "No Album found by this ID"});
        } else {
          // find the song by id
          var deletedSong = foundAlbum.songs.id(songId);
          // delete the found song
          deletedSong.remove();
          // save the found album with the song deleted
          foundAlbum.save();
          // send back the found album without the song
          res.json(foundAlbum);
        }
      });
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
      {method: "DELETE", path: "/api/albums/:album_id/songs/:song_id", description: "Delete an album you dislike"}
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
