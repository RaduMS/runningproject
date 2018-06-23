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

// weather event
var button = document.getElementById('datebtn');
button.addEventListener('click', function() {
  var date = $('#datePicker').val();
  var seconds = transformDate(date);
  // var latitude = 45.6580;
  // var longitude = 25.6012;
  weatherReport(seconds);

});
// var trail5 = new Track(5, 'trail', [1, 1], [2, 2]);
// var trail5_2 = new Track(5, 'trail', [3, 3], [5, 5]);
// var trail10 = new Track(10, 'trail', [3, 3], [4, 4]);

var trail10 = new Track('trail10', 10, 'trail', [{
  lat: 45.6310933,
  lng: 25.64033649
}, {
  lat: 45.66085497,
  lng: 25.59501789
}, {
  lat: 45.68004765,
  lng: 25.64445637
}]);
var trail5 = new Track('trail5', 5, 'trail', [{
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
var peVale2 = new Track('Pe Vale2', 5, 'trail', [{
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
  // console.log(orasele);
};

createCitySelectionList(allCities);

function createTrackSelectionList(allCities) {

  var trackOptions = document.getElementById('trackOptions');
  var optionsGroup = '<option default>Select Track</option>';
  var km = [];
  var createdCity = displaySelectedCity(allCities);
  var tracks = createdCity.tracksList;
  for (var i = 0; i < tracks.length; i++) {
    var trackItem = tracks[i];
    km.push(trackItem.distance);
  }
  // le filtrez ca sa imi ramana numai valori unice
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

createTrackSelectionList(allCities);

// functiile de desenare a harti
//

// initMap se apeleaza in lincul de la sctriptul de mai jos unde introduci appi key
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
    console.log(directionsDisplay);
  });

  //
  // cand se schimba selectul de la trasee
  //

  document.getElementById('trackOptions').addEventListener('change', function() {

    var cityMap = displaySelectedCity(allCities);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: cityMap.coordinates
    });
    directionsDisplay.setMap(map);
    var selectedTrack = displaySelectedTrack();
    console.log(selectedTrack);
    calculateAndDisplayRoute(directionsService, directionsDisplay, selectedTrack.trackPinPoint);
    console.log(directionsDisplay);
    // visitPage();
  });

}

function displaySelectedTrack() {
  var city = displaySelectedCity(allCities);
  var tracks = city.tracksList;
  var selectedTrack = document.getElementById('trackOptions').value;
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
      var summaryPanel = document.getElementById('directions-panel');
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
  //get seconds since 1st Jan 1970. + 61200 seconds until 2PM to show a temperature in the day time
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
    $('.getDate').html(forecast.daily.data[0].temperatureMax + " &#8451" + " / " + forecast.daily.data[0].summary);
  });
  return darkSkyApi;
}

function currentDate() {
  var dateToday = new Date();
  var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  var dataStr = dateToday.getFullYear() + '-' + months[dateToday.getMonth()] + '-' + dateToday.getDate();
  var data1 = document.getElementById('datePicker');
  data1.min = dataStr;
  console.log(data1.min);
}
currentDate();