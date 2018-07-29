$(document).ready(function() {

  //display flipcountdown
  $('#retroclockbox1').flipcountdown({
    beforeDateTime: '10/14/2018/' + ' 8:30:00'
  });

  //bootstrap datepicker
  $('#dateTimePicker').datetimepicker({
    format: 'L',
    defaultDate: new Date()
  });

  //display current date weather on page laod
  $('#datebtn').trigger('click');

});


class Track {
  constructor(id, distance, runtype, trackPinPoint) {
    this.id = id;
    this.distance = distance;
    this.runtype = runtype;
    this.trackPinPoint = trackPinPoint;
  }
}

class City {
  constructor(id, tracksList, coordinates) {
    this.id = id;
    this.tracksList = tracksList;
    this.coordinates = coordinates;
  }
}


// Display inspirational quote
var myQuote = $('.quote')[0];
setTimeout(showQuote, 300);

var myTimer = setInterval(changeQuote, 2000);

//Stop the displaying of phrases if clicked.
myQuote.onclick = function() {
  clearInterval(myTimer);
  // myMessage.innerHTML = ""; // daca scoatem linia asta de cod mesajul va ramane cel care este displayed cu totul
}

//Inspirational quotes - functions

function showQuote() {
  myQuote.className = "quote onDisplay intro-heading text-uppercase";
}

//Display all inspirational phrases each at a time
var phrases = ["Run faster", "Be Braver", "Be Bolder", "Trust your self", "Be the best you can be"];
var counter = 0;

function changeQuote() {
  if (counter >= phrases.length) {
    counter = 0;
  }
  myQuote.innerHTML = phrases[counter];
  counter++;
}
//
//
// Weather event

var button = document.getElementById('datebtn');
button.addEventListener('click', function() {
  var date = $('input[name="datePicker"]').val();
  var seconds = transformDate(date);
  weatherReport(seconds);
});


var trail10 = new Track('trail10', 10, 'flat', [{
  lat: 45.6310933,
  lng: 25.64033649
}, {
  lat: 45.66085497,
  lng: 25.59501789
}, {
  lat: 45.68004765,
  lng: 25.64445637
}]);
var trail5 = new Track('trail5', 5, 'flat', [{
  lat: 45.66085497,
  lng: 25.59501789
}, {
  lat: 45.6310933,
  lng: 25.64033649
}, {
  lat: 45.68004765,
  lng: 25.64445637
}]);
var peVale = new Track('Pe Vale', 5, 'trail', [{
  lat: 45.58979548,
  lng: 25.46469236
}, {
  lat: 45.58321815,
  lng: 25.50580526
}, {
  lat: 45.58925491,
  lng: 25.47606493
}]);
var peVale2 = new Track('Pe Vale2', 5, 'combined', [{
  lat: 45.58925491,
  lng: 25.47606493
}, {
  lat: 45.58321815,
  lng: 25.50580526
}, {
  lat: 45.58979548,
  lng: 25.46469236
}]);

var brasovTracks = [trail10, trail5];
var rasnovTracks = [peVale, peVale2];

var brasov = new City('Brasov', brasovTracks, {
  lat: 45.6579755,
  lng: 25.6011977
});

var rasnov = new City('Rasnov', rasnovTracks, {
  lat: 45.5937295,
  lng: 25.4610231
});

var allCities = [rasnov, brasov];


function createCitySelectionList(allCities) {
  var citiesSelection = document.getElementById('cities');
  var str = '';
  allCities.sort(function(a, b) {
    var nameA = a.id.toUpperCase(); // ignore upper and lowercase
    var nameB = b.id.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });

  for (var i = 0; i < allCities.length; i++) {
    var selectedCity = allCities[i];
    str = str + '<option value="' + selectedCity.id + '" id="' + selectedCity.id + '">' + selectedCity.id + '</option>';
  }

  citiesSelection.innerHTML = str;
};

createCitySelectionList(allCities);

function createTrackSelectionList(allCities) {

  var createdCity = displaySelectedCity(allCities);
  var tracks = createdCity.tracksList;

  var flatTracksList = tracksList('flat');
  createSpecificTrackSelectionList(flatTracksList, 'flatTrackOptions');
  var trailTracksList = tracksList('trail');
  createSpecificTrackSelectionList(trailTracksList, 'trailTrackOption');
  var combinedTracksList = tracksList('combined');
  createSpecificTrackSelectionList(combinedTracksList, 'combinedTrackOptions')

  function tracksList(trackTipe) {
    var listTracks = [];
    for (var i = 0; i < tracks.length; i++) {
      var trackItem = tracks[i];
      if (trackItem.runtype == trackTipe) {
        listTracks.push(trackItem);
      }
    }
    return listTracks;
  }

  function createSpecificTrackSelectionList(tracks, idSelectionList) {
    var trackOptions = document.getElementById(idSelectionList);
    var optionsGroup = '<option default>Select Track</option>';
    var km = [];

    for (var i = 0; i < tracks.length; i++) {
      var trackItem = tracks[i];
      km.push(trackItem.distance);
    }
    //le filtrez ca sa imi ramana numai valori unice
    var uniqueArray = km.filter(function(item, position) {
      return km.indexOf(item) == position;
    });
    // le sortez sa fie in ordine crescatoare
    uniqueArray.sort(function(a, b) {
      return a - b
    });

    for (var i = 0; i < uniqueArray.length; i++) {
      var kilometers = uniqueArray[i];
      var options = '';
      for (var j = 0; j < tracks.length; j++) {
        var trackItem = tracks[j];
        if (trackItem.distance == kilometers) {
          options = options + '<option value="' + trackItem.id + '" id="' + trackItem.id + '">' + trackItem.id + '</option>';
        }
      }
      optionsGroup = optionsGroup + '<optgroup label="' + uniqueArray[i] + ' km">' + options + '</optgroup>';
    }
    trackOptions.innerHTML = optionsGroup;
  }
}

createTrackSelectionList(allCities);


// Map drawing - functions
//
function initMap() {

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  // seteaza harta la o anumita locatie pentru inceput inainte sa calculeze ruta
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {
      lat: 45.66049334,
      lng: 25.60806649
    }
  });
  // map displayd on entering page
  directionsDisplay.setMap(map);
  console.log(directionsDisplay);

  //
  // cand se schimba selectu de la orase
  //

  document.getElementById('cities').addEventListener('change', function() {
    createTrackSelectionList(allCities);

    var cityMap = displaySelectedCity(allCities);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: cityMap.coordinates
    });
    // map displayd on entering page
    directionsDisplay.setMap(null);

  });

  //

  //
  // cand se schimba selectul de la trasee
  //

  showTrackOnMap('flatTrackOptions');
  showTrackOnMap('trailTrackOption');
  showTrackOnMap('combinedTrackOptions');

  //functia de afisare a traseului pe harta
  function showTrackOnMap(idSelectionList) {
    document.getElementById(idSelectionList).addEventListener('change', function() {
      var cityMap = displaySelectedCity(allCities);
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: cityMap.coordinates
      });
      directionsDisplay.setMap(map);
      var selectedTrack = displaySelectedTrack(idSelectionList);
      calculateAndDisplayRoute(directionsService, directionsDisplay, selectedTrack.trackPinPoint);
      var $maplink = $('a[href="#maps"]');
      $maplink.trigger('click');
    });
  }


} //End of function init map


function displaySelectedTrack(idSelectionList) {
  var city = displaySelectedCity(allCities);
  var tracks = city.tracksList;
  var selectedTrack = document.getElementById(idSelectionList).value;
  for (var i = 0; i < tracks.length; i++) {
    var result = tracks[i]
    if (selectedTrack == result.id) {
      return result;
    }
  }
}

function displaySelectedCity(allCities) {
  var city = document.getElementById('cities').value;
  for (var i = 0; i < allCities.length; i++) {
    var result = allCities[i];
    if (city == result.id) {
      return result;
    }
  }
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, arr) {

  var waypts = [];
  for (var i = 1; i < arr.length - 1; i++) {
    waypts.push({
      location: arr[i],
      stopover: true
    });
  }

  directionsService.route({
    origin: arr[0],
    destination: arr[arr.length - 1],
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: 'WALKING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      var summaryPanel = document.getElementById('directions');
      summaryPanel.innerHTML = '';
      var distance = 0;
      var distanceInKm = 0;
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
          '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
        distance += route.legs[i].distance.value;
      }
      distanceInKm = Math.round(distance / 10) / 100;
      summaryPanel.innerHTML += "Total distance: " + distanceInKm + 'km';
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function transformDate(dateItem) {
  var dateChosen = new Date(dateItem);
  //get miliseconds since 1st Jan 1970
  dateChosen = dateChosen.getTime();
  //get seconds since 1st Jan 1970.
  dateChosen = dateChosen / 1000;
  return dateChosen;
}


function weatherReport(seconds) {
  // variables config for coordinates, url and api key
  // latitude and longitude are accepted arguments and passed
  // once a user has submitted the form.
  var apiKey = '80c9dbbcb6689d9f14426b3f07663f36',
    url = 'https://api.darksky.net/forecast/',
    city = displaySelectedCity(allCities),
    seconds = seconds,
    api_call = url + apiKey + "/" + city.coordinates.lat + "," + city.coordinates.lng + "," + seconds;

  api_call = api_call.concat("?units=ca&callback=?")

  // Call to the DarkSky API to retrieve JSON
  var darkSkyApi = $.getJSON(api_call, function(forecast) {
    $('.getDate').html("min: " + Math.round(forecast.daily.data[0].temperatureMin) + " &#8451" + "/ " + "max: " + Math.round(forecast.daily.data[0].temperatureMax) + " &#8451" + "<br/>" + forecast.daily.data[0].summary);
  });
  return darkSkyApi;
}
//Spotify API -- music
$(function() {
  var token = getToken();
  if (token != '') {
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);
    searchSpotify();
    var $musicLink = $('a[href="#music"]');
    $musicLink.trigger('click');
  }

  $('#login').on('click', loginHandler);
  $('#searchResults').on('click', searchResultsHandler);
  $('#searchButton').on('click', searchSpotify);

  function loginHandler(e) {
    // https://developer.spotify.com/documentation/general/guides/authorization-guide/
    // Implicit Grant Flow
    var client_id = '5dd485d00f9840639256087ffbe74e73';
    var response_type = 'token';
    var redirect_uri = location.href;

    //redirect to authorization
    location.href = 'https://accounts.spotify.com/authorize' +
      '?client_id=' + client_id +
      '&response_type=' + response_type +
      '&redirect_uri=' + redirect_uri;
  }

  function getToken() {
    var result = '';
    // Get the hash of the url
    if (window.location.hash != '') {
      var hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce(function(initial, item) {
          if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});

      result = hash.access_token;
      window.location.hash = '';
    }

    return result;
  }

  function searchSpotify() {
    if (token != '') {
      var searchQuery = $('#query').val();
      var type = ['playlist'];
      spotifyApi.search(searchQuery, type).then(function(data) {
        console.log('Artist information', data);
        var firstPlaylist = data.playlists.items[0];
        updatePlayer(firstPlaylist.uri);
        displayResults(data.playlists.items);
      }, function(err) {
        console.error(err);
      });
    } else {
      loginHandler();
    }
  }


  function displayResults(results) {
    var items = '';
    for (var i = 0; i < results.length; i++) {
      items += '<li class="list-group-item" data-uri="' + results[i].uri + '">' +
        '<img class="img-fluid rounded" src="' + results[i].images[0].url + '">' +
        '<a href="javascript:;">' + results[i].name + '</a>' +
        '</li>'
    }
    $('#searchResults').html(items);
  }

  function searchResultsHandler(e) {
    var uri = $(e.target).closest('li').data('uri');
    updatePlayer(uri);
    // $(window).scrollTop(0);
    var $musicLink = $('a[href="#music"]');
    $musicLink.trigger('click');
  }

  function updatePlayer(uri) {
    $('#resultIframe').attr('src', 'https://open.spotify.com/embed?uri=' + uri);
  }
});
$.cookie("example", "foo bla bal bal ", {});
console.log($.cookie);
// $.removeCookie("example");