console.log("Sanity Check: JS is working!");
var template;
var $albumsList;
var allAlbums = [];

$(document).ready(function(){

  $albumsList = $('#albumsTarget');

  // compile handlebars template
  var source = $('#albums-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: onSuccess,
    error: onError
  });

  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: profileSuccess,
    error: profileError
  });

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

  $albumsList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/albums/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/albums/'+$(this).attr('data-id'),
      success: deleteAlbumSuccess,
      error: deleteAlbumError,
    });
  });

/*  $albumsList.on('submit', '#addSongForm', function(e) {
    e.preventDefault();
    console.log('new song');
    $.ajax({
      method: 'POST',
      url: '/api/albums/'+$(this).attr('data-id')+'/songs',
      data: $(this).serializeArray(),
      success: newSongSuccess,
      error: newSongSuccess,
    });
  });*/

//end of document ready
});

// Helper function to render all posts to views
// Empties array and re-render each time posts data changes
function render() {
  $albumsList.empty();
  var albumsHtml = template({ albums: allAlbums });
  $albumsList.append(albumsHtml);
}

function onSuccess(json) {
  allAlbums = json;
  render();
}

function onError(e) {
  console.log('uh ohhhhh');
  $('#albumsTarget').append('Failed to load albums, is the server working?');
}

function profileSuccess(json) {
$('#profileTarget').append('<h1>' + json[0].name + '</h1>Github Profile:</br><img src="' +
  json[0].github_profile_image + '" target="_blank" id="profile"><ul><li>Github Link: <a href="' +
  json[0].github_link + '">seanvsville</a></li><li>Current City: ' +
  json[0].current_city + '</li>' + '<li>Favorite Albums: <ul><li>' +
  json[0].favorite_albums.join('; ') + '</li></ul></li></ul>');
}

function profileError(e) {
  console.log('uh ohhhhh');
  $('#profileTarget').append('Failed to load albums, is the server working?');
}

function newAlbumSuccess(json) {
  $('#newAlbumForm input').val('');
  allAlbums.push(json);
  render();
}

function newAlbumError() {
  console.log('uh ohhhhh');
  $('#albumTarget').append('Failed to load albums, is the server working?');
}

function deleteAlbumSuccess(json) {
  var album = json;
  console.log(json);
  var albumId = album._id;
  console.log('delete album', albumId);
  // find the album with the correct ID and remove it from our allAlbums array
  for(var index = 0; index < allAlbums.length; index++) {
    if(allAlbums[index]._id === albumId) {
      allAlbums.splice(index, 1);
      break;
    }
  }
  render();
}

function deleteAlbumError() {
  console.log('delete album error!');
}

/*function newSongSuccess(json) {
  var album = json;
  var albumId = album._id;
  for(var index = 0; index < allAlbums.length; index++) {
    if(allAlbums[index]._id === albumId) {
      allAlbum[index] = album;
      break;
    }
  }
  render();
}

function newSongError() {
  console.log('adding new song error!');
}*/
