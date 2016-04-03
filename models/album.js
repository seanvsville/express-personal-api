var mongoose = require('mongoose'),
      Schema = mongoose.Schema,
  songSchema = new Schema({
   name: String
 });

var AlbumSchema = new Schema({
  title: String,
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist'
  },
  yearReleased: String,
  albumCover: String,
  songs: String,
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
