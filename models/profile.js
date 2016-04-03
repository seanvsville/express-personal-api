var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  name: String,
  github_link: String,
  github_profile_image: String,
  current_city: String,
  favorite_albums: Array
});

var Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
