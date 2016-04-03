console.log("Sanity Check: JS is working!");
var template;
var $albumsList;
var allAlbum = [];

$(document).ready(function(){

  $albumsList = $('#albumTarget');

  // compile hadlebars template
  var source = $('#albums-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: handleSuccess,
    error: handleError
  });

});

function handleSuccess(json) {
  console.log();
  $('#personalInfo').append('<h1>' + json[0].name + '</h1>Github Profile:</br><img src="' +
  json[0].github_profile_image + '" target="_blank" id="profile"><ul><li>Github Link: <a href="' +
  json[0].github_link + '">seanvsville</a></li><li>Current City: ' +
  json[0].current_city + '</li>' + '<li>Favorite Albums: <ul><li>' +
  json[0].favorite_albums.join('; ') + '</li></ul></li></ul>');
}

function handleError(json) {
  console.log('uh ohhhhh');
  $('#personalInfo').text('Failed to load albums, is the server working?');
}

$('#newAlbumForm').on('submit', function(e) {
  e.preventDefault();
  console.log('new album serialized', $(this).serializeArray());
  $.ajax({
    method: 'POST',
    url: '/api/albums',
    data: $(this).serializeArray(),
    success: newAlbumSuccess,
    error: newAlbumError,
  });
});

// Helper function to render all posts to views
// Empties array and re-render each time posts data changes
function render() {
  $albumsList.empty();
  var albumsHTML = template({ albums: allAlbums });
  $albumsList.append(albumsHTML);
}

function newAlbumSuccess() {
  $('#newAlbumForm input').val('');
  allAlbums.push(json);
  render();
}
