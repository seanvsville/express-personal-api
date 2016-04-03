var mongoose = require('mongoose');
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  'mongodb://localhost/personal-api');

module.exports.Profile = require('./profile.js');
module.exports.Album = require('./album.js');
module.exports.Artist = require('./artist.js');
