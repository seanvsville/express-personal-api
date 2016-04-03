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
    url: '/api/albums',
    success: handleSuccess,
    error: handleError
  });

  function handleSuccess(json) {
    $('#personalInfo').append('<h1>' + json[0].name + '</h1><ul><li>' + json[0].github_link + '</li>' +
      '<li>' + json[0].github_link + '</li>' + '<li>' + json[0].github_profile_image + '</li>' +
      '<li>' + json[0].current_cit + '</li>' + '<li>' + json[0].favorite_albums + '</li></ul>');
  }

  function handleError(json) {
    console.log('uh ohhhhh');
    $('#personalInfo').text('Failed to load albums, is the server working?');
  }

  });

});
