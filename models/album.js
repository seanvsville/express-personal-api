var mongoose = require('mongoose'),
      Schema = mongoose.Schema,
 songsSchema = new Schema({
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
  songs: [songSchema]
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
