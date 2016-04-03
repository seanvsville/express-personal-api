// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var personal_info = [
 {
  name: 'Sean Van Ho',
  github_link: 'https://github.com/seanvsville',
  github_profile_image: 'https://avatars0.githubusercontent.com/u/16998442?v=3&s=460',
  current_city: 'Hayward',
  favorite_albums: ['On a Wire', 'OK, Computer', 'Good Kid, M.A.A.D City', 'Reasonable Doubt', 'Something Wicked This Way Comes']
}];

var albums_list = [
  {
    title: 'On a Wire',
    artist: 'The Get Up Kids',
    yearReleased: 'March 14, 2002',
    albumCover: 'http://ecx.images-amazon.com/images/I/519JvdzX-WL.jpg',
    songs: ['Overdue', 'Overdue', 'Stay Gone', 'Let the Reigns Go Loose', 'Fall From Grace', 'Grunge Pig', 'High as the Moon', 'All That I Know', 'Walking on a Wire', 'Wish You Were Here', 'Campfire Kansas', 'The Worst Idea', 'Hannah Hold On']
  },
  {
    title: 'OK, Computer',
    artist: 'Radiohead',
    yearReleased: 'March 21, 1997',
    albumCover: 'http://ecx.images-amazon.com/images/I/81ni71zIxIL._SL1406_.jpg',
    songs: ['Airbag', 'Paranoid Android', 'Subterranean Homesick Alien', 'Exit Music (For A Film)', 'Let Down', 'Karma Police', 'Fitter Happier', 'Electioneering', 'Climbing Up The Walls', 'No Surprises', 'Lucky', 'The Tourist']
  },
  {
    title: 'Good Kid, M.A.A.D City',
    artist: 'Kendrick Lamar',
    yearReleased: 'October 22, 2012',
    albumCover: 'http://ecx.images-amazon.com/images/I/71cOtUzraFL._SX522_.jpg',
    songs: ['Sherane a.k.a Master Splinters Daughter', 'Bitch Dont Kill My Vibe', 'Backseat Freestyle', 'The Art of Peer Pressure', 'Money Trees', 'Poetic Justice', 'Good Kid', 'm.A.A.d city', 'Swimming Pools (Drank)', 'Sing About Me I’m Dying of Thirst', 'Real', 'Compton', 'The Recipe', 'Black Boy Fly', 'Now Or Never', 'County Building Blues']
  },
  {
    title: 'Reasonable Doubt',
    artist: 'Jay-Z',
    yearReleased: 'June 25, 1996',
    albumCover: 'http://static.stereogum.com/uploads/2015/04/Reasonable-Doubt.jpg',
    songs: ['Cant Knock the Hustle', 'Politics as Usual', 'Brooklyns Finest', 'Dead Presidents II', 'Feelin It', 'D Evils', '22 Twos', 'Can I Live', 'Aint No Nigga', 'Friend or Foe', 'Coming of Age', 'Cashmere Thoughts', 'Bring It On', 'Regrets']
  },
  {
    title: 'Something Wicked This Way Comes',
    artist: 'The Herbalizer',
    yearReleased: 'March 19, 2002',
    albumCover: 'https://ninjatune.net/images/releases/something-wicked-this-way-comes-main.jpg',
    songs: ['Something Wicked', 'Verbal Anime', 'Time 2 Build', 'Carat Blag', 'Mr Holmes', 'Good Girl Gone Bad', 'The Hard Stuff', 'Distinguished Jamaican English', 'Worldwide Connected', 'The Turnaround', 'Battle of Bongo Hill', 'It Aint Nuttin', 'Unsungsong']
  }
];

  var artists_list = [
    {
      name: 'The Get Up Kids',
      members: ['Matt Pryor', 'Jim Suptic', 'John Greenway', 'Rob Pope', 'James Dewees', 'Ryan Pope'],
    },
    {
      name: 'Radiohead',
      members: ['Thom Yorke', 'Philip Selway', 'John Greenway', 'Ed OBrien', 'Colin Greenwood'],
    },
    {
      name: 'Kendrick Lamar',
      members: ['Kendrick Lamar'],
    },
    {
      name: 'Jay-Z',
      members: ['Jay-Z'],
    },
    {
      name: 'The Herbaliser',
      members: ['Ollie Trattles', 'Kaidi Tatham', 'Patrick Dawes', 'Jake Wherry', 'Chris Bowden'],
    }
  ];

  db.Profile.remove({}, function(err, profile) {
  console.log('remove all profile information');
  db.Profile.create(personal_info, function(err, profile){
    if (err) {
      console.log(err);
      return;
    }
    console.log(profile);
    console.log('recreated profile');
    console.log("created", profile.length, "profile");

  });
});

  db.Album.remove({}, function(err, profile) {
  console.log('remove all albums');
  db.Album.create(albums_list, function(err, albums){
    if (err) {
      console.log(err);
      return;
  }
  console.log(profile);
  console.log('recreated albums');
  console.log("created", profile.length, "albums");

  });
});

db.Artist.remove({}, function(err, profile) {
console.log('remove all profile information');
db.Artist.create(artists_list, function(err, artists){
  if (err) {
    console.log(err);
    return;
  }
  console.log(artists);
  console.log('recreated artists');
  console.log("created", profile.length, "artists");

  });
});

/*process.exit();*/

    /*db.Album.remove({}, function(err, albums){
      console.log('removed all albums');
      albums_list.forEach(function (albumData) {
        var album = new db.Album({
          title: albumData.title,
          albumCover: albumData.image,
          releaseDate: albumData.releaseDate
        });
        db.Artist.findOne({name: albumData.artist}, function (err, foundArtist) {
          console.log('found artist ' + foundArtist.name + ' for album ' + album.title);
          if (err) {
            console.log(err);
            return;
          }
          // saves found Artist into album
          album.artist = foundArtist;
          album.save(function(err, savedAlbum){
            if (err) {
              return console.log(err);
            }
            console.log('saved ' + savedAlbum.title + ' by ' + foundArtist.name);
          });
        });
      });
    });*/



// var new_campsite = {description: 'Sharp rocks. Middle of nowhere.'}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log('Error:', err);
//   }

//   console.log('Created new campsite', campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
