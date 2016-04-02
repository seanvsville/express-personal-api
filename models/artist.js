var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArtistSchema = new Schema({
  name: String,
  members: Array,
});

var Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;
