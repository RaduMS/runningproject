$(function() {

  // Display inspirational quote
  var $myQuote = $('.quote');
  var counter = 0;
  var phrases = [];

  initQuoteData();
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

  function initQuoteData () {
    phrases = ["As we run, </br>we become", "Run </br>fast", "Be </br>braver", "Be </br>bolder", "Trust </br>yourself", "Be the best </br>you can be", "The long run is what puts the tiger in the cat"];
  }

    // Function for changing the quotes
  function changeQuote() {

    if (counter < phrases.length) {
        $myQuote.fadeOut(2000, function(){
        $myQuote.html(phrases[counter]);
        $myQuote.fadeIn(2000, function() {
          counter++;
          changeQuote();
        });
      })
    }
  }
});

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
