var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

  SongsSchema = new Schema({
      name: String
    });

var AlbumSchema = new Schema({
  title: {
    type: Schema.Types.ObjectId,
    ref: 'Artist'
  },
  artist: String,
  yearReleased: String,
  albumCover: String,
  songs: [SongSchema]
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
