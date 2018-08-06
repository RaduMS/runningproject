$(document).ready(function() {

  // Display inspirational quote
  changeQuote();

  //Display flipcountdown
  $('#retroclockbox1').flipcountdown({
    beforeDateTime: '10/14/2018/' + ' 8:30:00'
  });

  //Date picker
  $('#dateTimePicker').datetimepicker({
    format: 'L',
    defaultDate: new Date()
  });

  //Display current date on weather
  $('#datebtn').trigger('click');
});

function changeQuote() {

  var myQuote = $('.quote');
  var counter = 0;
  var phrases = ["As we run, </br>we become", "Run </br>fast", "Be </br>braver", "Be </br>bolder", "Trust </br>yourself", "Be the best </br>you can be", "The long run is what puts the tiger in the cat"];

  if (counter < phrases.length) {
    myQuote.fadeOut(2000, function(){
      myQuote.html(phrases[counter]);
      myQuote.fadeIn(2000, function() {
        counter++;
        changeQuote();
      });
    })
  }
}

// Weather event
$("#datebtn").on('click', function() {
  var date = $('input[name="datePicker"]').val();
  var seconds = transformDate(date);
  weatherReport(seconds);
});


// Declaration of classes for the tracks
class Track {
  constructor(id, distance, runtype, trackPinPoint) {
    this.id = id;
    this.distance = distance;
    this.runtype = runtype;
    this.trackPinPoint = trackPinPoint;
  }
}

//Declaration of classes for the cities
class City {
  constructor(id, tracksList, coordinates) {
    this.id = id;
    this.tracksList = tracksList;
    this.coordinates = coordinates;
  }
}

// Brasov coordinates
var brasovFlat5 = new Track('5 km run', 5, 'flat',
  [{
  lat: 45.64242268,
  lng: 25.58926858
  },
  {
  lat: 45.64287648,
  lng: 25.58881528
  },
  {
  lat: 45.64707304,
  lng: 25.58929942
  },
  {
  lat: 45.66225903,
  lng: 25.58154784
  },
  {
  lat: 45.66168882,
  lng: 25.57888436
  },
  {
  lat: 45.646025,
  lng: 25.58781348
  },
  {
  lat: 45.64057943,
  lng: 25.58563552
  },
  {
  lat: 45.64183961,
  lng: 25.58821044
  },
  {
  lat: 45.64157708,
  lng: 25.58876298
  },
  {
  lat: 45.64230467,
  lng: 25.58938525
  }]);

var brasovFlat10 = new Track('10K run', 10, 'flat',
  [{
  lat: 45.64242268,
  lng: 25.58926858
  },
  {
  lat: 45.64287648,
  lng: 25.58881528
  },
  {
  lat: 45.64707304,
  lng: 25.58929942
  },
  {
  lat: 45.66225903,
  lng: 25.58154784
  },
  {
  lat: 45.66168882,
  lng: 25.57888436
  },
  {
  lat: 45.646025,
  lng: 25.58781348
  },
  {
  lat: 45.64057943,
  lng: 25.58563552
  },
  {
  lat: 45.64183961,
  lng: 25.58821044
  },
  {
  lat: 45.64157708,
  lng: 25.58876298
  },
  {
  lat: 45.64230467,
  lng: 25.58938525
  },
  {
  lat: 45.64287648,
  lng: 25.58881528
  },
  {
  lat: 45.64555997,
  lng: 25.59001825
  },
  {
  lat: 45.6460925,
  lng: 25.60009263
  },
  {
  lat: 45.65099651,
  lng: 25.60875006
  },
  {
  lat: 45.64796863,
  lng: 25.59848399
  },
  {
  lat: 45.64653724,
  lng: 25.58858193
  },
  {
  lat: 45.64054457,
  lng: 25.58560061
  },
  {
  lat: 45.64184225,
  lng: 25.58826471
  },
  {
  lat: 45.64163973,
  lng: 25.58877634
  },
  {
  lat: 45.64231481,
  lng: 25.58931278
  }]);

var brasovCombined21 = new Track('Halfmarathon', 21, 'combined',
  [{
  lat: 45.64242268,
  lng: 25.58926858
  },
  {
  lat: 45.64287648,
  lng: 25.58881528
  },
  {
  lat: 45.64707304,
  lng: 25.58929942
  },
  {
  lat: 45.66225903,
  lng: 25.58154784
  },
  {
  lat: 45.66168882,
  lng: 25.57888436
  },
  {
  lat: 45.646025,
  lng: 25.58781348
  },
  {
  lat: 45.64057943,
  lng: 25.58563552
  },
  {
  lat: 45.64183961,
  lng: 25.58821044
  },
  {
  lat: 45.64157708,
  lng: 25.58876298
  },
  {
  lat: 45.64230467,
  lng: 25.58938525
  },
  {
  lat: 45.64287648,
  lng: 25.58881528
  },
  {
  lat: 45.64555997,
  lng: 25.59001825
  },
  {
  lat: 45.6460925,
  lng: 25.60009263
  },
  {
  lat: 45.65099651,
  lng: 25.60875006
  },
  {
  lat: 45.63615124,
  lng: 25.63209938
  },
  {
  lat: 45.65415146,
  lng: 25.61221662
  },
  {
  lat: 45.65306779,
  lng: 25.60871098
  },
  {
  lat: 45.6510102,
  lng: 25.60814726
  },
  {
  lat: 45.64801022,
  lng: 25.59851276
  },
  {
  lat: 45.64649777,
  lng: 25.58846982
  },
  {
  lat: 45.64799782,
  lng: 25.5829145
  },
  {
  lat: 45.64622026,
  lng: 25.57691487
  },
  {
  lat: 45.64799782,
  lng: 25.5829145
  },
  {
  lat: 45.64068803,
  lng: 25.58567055
  },
  {
  lat: 45.64231481,
  lng: 25.58931278
  }]);

var brasovCombined42 = new Track('Marathon', 42, 'combined',
  [{
  lat: 45.64242268,
  lng: 25.58926858
  },
  {
  lat: 45.64707304,
  lng: 25.58929942
  },
  {
  lat: 45.66225903,
  lng: 25.58154784
  },
  {
  lat: 45.66168882,
  lng: 25.57888436
  },
  {
  lat: 45.64057943,
  lng: 25.58563552
  },
  {
  lat: 45.64157708,
  lng: 25.58876298
  },
  {
  lat: 45.64230467,
  lng: 25.58938525
  },
  {
  lat: 45.64287648,
  lng: 25.58881528
  },
  {
  lat: 45.64555997,
  lng: 25.59001825
  },
  {
  lat: 45.6460925,
  lng: 25.60009263
  },
  {
  lat: 45.65099651,
  lng: 25.60875006
  },
  {
  lat: 45.63615124,
  lng: 25.63209938
  },
  {
  lat: 45.65415146,
  lng: 25.61221662
  },
  {
  lat: 45.65306779,
  lng: 25.60871098
  },
  {
  lat: 45.6510102,
  lng: 25.60814726
  },
  {
  lat: 45.64801022,
  lng: 25.59851276
  },
  {
  lat: 45.64649777,
  lng: 25.58846982
  },
  {
  lat: 45.64799782,
  lng: 25.5829145
  },
  {
  lat: 45.64165571,
  lng: 25.56124351
  },
  {
  lat: 45.59775017,
  lng: 25.55235467
  },
  {
  lat: 45.64165571,
  lng: 25.56124351
  },
  {
  lat: 45.64799782,
  lng: 25.5829145
  },
  {
  lat: 45.64068803,
  lng: 25.58567055
  },
  {
  lat: 45.63915032,
  lng: 25.59333346
  },
  {
  lat: 45.64231481,
  lng: 25.58931278
  }]);

var brasovTrail10 = new Track('10K run', 10, 'trail',
  [{
  lat: 45.64185073,
  lng: 25.58856986
  },
  {
  lat: 45.63970541,
  lng: 25.59032939
  },
  {
  lat: 45.63717323,
  lng: 25.58739977
  },
  {
  lat: 45.64107782,
  lng: 25.59842943
  },
  {
  lat: 45.6349092,
  lng: 25.60292182
  },
  {
  lat: 45.63055247,
  lng: 25.59094161
  },
  {
  lat: 45.63511925,
  lng: 25.5950254
  },
  {
  lat: 45.64050739,
  lng: 25.59597879
  },
  {
  lat: 45.64185073,
  lng: 25.58856986
  }]);

var brasovTrail21 = new Track('Halfmarathon', 21, 'trail',
  [{
  lat: 45.64185073,
  lng: 25.58856986
  },
  {
  lat: 45.63970541,
  lng: 25.59032939
  },
  {
  lat: 45.63717323,
  lng: 25.58739977
  },
  {
  lat: 45.64107782,
  lng: 25.59842943
  },
  {
  lat: 45.6349092,
  lng: 25.60292182
  },
  {
  lat: 45.63055247,
  lng: 25.59094161
  },
  {
  lat: 45.64052034,
  lng: 25.60485301
  },
  {
  lat: 45.63091501,
  lng: 25.58328202
  },
  {
  lat: 45.61992506,
  lng: 25.58095582
  },
  {
  lat: 45.60965878,
  lng: 25.58451779
  },
  {
  lat: 45.62610794,
  lng: 25.59129841
  },
  {
  lat: 45.63511925,
  lng: 25.5950254
  },
  {
  lat: 45.64050739,
  lng: 25.59597879
  },
  {
  lat: 45.64185073,
  lng: 25.58856986
  }]);

var brasovTrail42 = new Track('Marathon', 42, 'trail',
  [{
  lat: 45.64185073,
  lng: 25.58856986
  },
  {
  lat: 45.63970541,
  lng: 25.59032939
  },
  {
  lat: 45.63717323,
  lng: 25.58739977
  },
  {
  lat: 45.64107782,
  lng: 25.59842943
  },
  {
  lat: 45.6349092,
  lng: 25.60292182
  },
  {
  lat: 45.63055247,
  lng: 25.59094161
  },
  {
  lat: 45.64052034,
  lng: 25.60485301
  },
  {
  lat: 45.63091501,
  lng: 25.58328202
  },
  {
  lat: 45.61992506,
  lng: 25.58095582
  },
  {
  lat: 45.58716845,
  lng: 25.56675084
  },
  {
  lat: 45.59593662,
  lng: 25.56624568
  },
  {
  lat: 45.59003772,
  lng: 25.55730938
  },
  {
  lat: 45.57391729,
  lng: 25.55048584
  },
  {
  lat: 45.56862996,
  lng: 25.56705117
  },
  {
  lat: 45.60965878,
  lng: 25.58451779
  },
  {
  lat: 45.62610794,
  lng: 25.59129841
  },
  {
  lat: 45.63511925,
  lng: 25.5950254
  },
  {
  lat: 45.64050739,
  lng: 25.59597879
  },
  {
  lat: 45.64185073,
  lng: 25.58856986
  }]);

//Rasnov coordinates
var rasnovTrail5 = new Track('5 km', 5, 'trail',
  [{
  lat: 45.58979548,
  lng: 25.46469236
  },
  {
  lat: 45.58659861,
  lng: 25.49882239
  },
  {
  lat: 45.58925491,
  lng: 25.47606493
  }]);

var rasnovTrail10 = new Track('10K run', 10, 'trail',
  [{
  lat: 45.59683817,
  lng: 25.54754797
  },
  {
  lat: 45.5907202,
  lng: 25.46558377
  }]);

var rasnovTrail21 = new Track('Halfmarathon', 21, 'trail',
  [{
  lat: 45.5907202,
  lng: 25.46558377
  },
  {
  lat: 45.59545028,
  lng: 25.55254704
  },
  {
  lat: 45.5907202,
  lng: 25.46558377
  }]);

var rasnovFlat5 = new Track('5 km run', 5, 'flat',
  [{
  lat: 45.58979548,
  lng: 25.46469236
  },
  {
  lat: 45.58659861,
  lng: 25.49882239
  },
  {
  lat: 45.58925491,
  lng: 25.47606493
  }]);

var rasnovFlat10 = new Track('10K run', 10, 'flat',
  [{
  lat: 45.59683817,
  lng: 25.54754797
  },
  {
  lat: 45.5907202,
  lng: 25.46558377
  }]);

var rasnovFlat21 = new Track('Halfmarathon', 21, 'flat',
  [{
  lat: 45.5907202,
  lng: 25.46558377
  },
  {
  lat: 45.59545028,
  lng: 25.55254704
  },
  {
  lat: 45.5907202,
  lng: 25.46558377
  }]);

var rasnovCombined5 = new Track('5 km run', 5, 'combined',
  [{
  lat: 45.58979548,
  lng: 25.46469236
  },
  {
  lat: 45.58659861,
  lng: 25.49882239
  },
  {
  lat: 45.58925491,
  lng: 25.47606493
  }]);

var rasnovCombined10 = new Track('10K run', 10, 'combined',
  [{
  lat: 45.59683817,
  lng: 25.54754797
  },
  {
  lat: 45.5907202,
  lng: 25.46558377
  }]);

var rasnovCombined21 = new Track('Halfmarathon', 21, 'combined',
  [{
  lat: 45.5907202,
  lng: 25.46558377
  },
  {
  lat: 45.59545028,
  lng: 25.55254704
  },
  {
  lat: 45.5907202,
  lng: 25.46558377
  }]);

// List of tracks for all the cities
var brasovTracks = [brasovFlat5, brasovFlat10, brasovCombined21, brasovCombined42, brasovTrail10, brasovTrail21, brasovTrail42];
var rasnovTracks = [rasnovTrail5, rasnovTrail10, rasnovTrail21, rasnovFlat5, rasnovFlat10, rasnovFlat21, rasnovCombined5, rasnovCombined10, rasnovCombined21];

// Coordinates of the cities in the selection list
var brasov = new City('Brasov', brasovTracks, {
  lat: 45.6579755,
  lng: 25.6011977
});

var rasnov = new City('Rasnov', rasnovTracks, {
  lat: 45.5937295,
  lng: 25.4610231
});

var allCities = [rasnov, brasov];

createCitySelectionList(allCities);
createTrackSelectionList(allCities);

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
    var optionsGroup = '<option default>Select distance</option>';
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

// Map drawing - functions
// Map initialization
function initMap() {

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  // Sets the map to an initial location before starting to calculate the route

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {
      lat: 45.66049334,
      lng: 25.60806649
    }
  });

  // map displayd on entering page
  directionsDisplay.setMap(map);

  // To change a selected city
  $("#cities").on('change', function() {
    createTrackSelectionList(allCities);

    var cityMap = displaySelectedCity(allCities);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: cityMap.coordinates
    });

    // map displayd on entering page
    directionsDisplay.setMap(null);

  });

  // To show a selected track on the map
  showTrackOnMap('flatTrackOptions');
  showTrackOnMap('trailTrackOption');
  showTrackOnMap('combinedTrackOptions');

  // To show the track on the map
  function showTrackOnMap(idSelectionList) {
    $('#'+idSelectionList).on('change', function() {
      var cityMap = displaySelectedCity(allCities);
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: cityMap.coordinates
      });
      directionsDisplay.setMap(map);
      var selectedTrack = displaySelectedTrack(idSelectionList);
      calculateAndDisplayRoute(directionsService, directionsDisplay, selectedTrack.trackPinPoint);
      var $maplink = $('a[href="#mapSection"]');
      $maplink.trigger('click');
    });
  }
} //End of function init map

function displaySelectedCity(allCities) {
  var city = $('#cities').val();
  for (var i = 0; i < allCities.length; i++) {
    var result = allCities[i];
    if (city == result.id) {
      return result;
    }
  }
}

function displaySelectedTrack(idSelectionList) {
  var city = displaySelectedCity(allCities);
  var tracks = city.tracksList;
  var selectedTrack = $('#'+idSelectionList).val();
  for (var i = 0; i < tracks.length; i++) {
    var result = tracks[i]
    if (selectedTrack == result.id) {
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
    optimizeWaypoints: false,
    travelMode: 'WALKING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      var summaryPanel = document.getElementById('directions');
      summaryPanel.innerHTML = '';
      var distance = 0;
      var distanceInKm = 0;
      // debugger;
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<strong>Route Segment ' + routeSegment +
          ': </strong><br>';
        // summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        // summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
        distance += route.legs[i].distance.value;
      }
      distanceInKm = Math.round(distance / 10) / 100;
      summaryPanel.innerHTML += "<strong>Total distance: </strong>" + distanceInKm + ' km';
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

// Date conversion for the weather display
function transformDate(dateItem) {
  var dateChosen = new Date(dateItem);
  //get miliseconds since 1st Jan 1970
  dateChosen = dateChosen.getTime();
  //get seconds since 1st Jan 1970.
  dateChosen = dateChosen / 1000;
  return dateChosen;
}

//Weather display
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

// $.cookie("example", "foo bla bal bal ", {});
// console.log($.cookie('example'));
// // $.removeCookie("example");
// document.cookie = "username=John Doe; expires=Thu, 18 Dec 2019 12:00:00 UTC; path=/";
