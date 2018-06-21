class Track {
  constructor(id, distance, runtype, traseu) {
    this.id = id;
    this.distance = distance;
    this.runtype = runtype;
    this.traseu = traseu;
  }
}

class Oras {
  constructor(id, trasee, coordonate) {
    this.id = id;
    this.trasee = trasee;
    this.coordonate = coordonate;
  }
}
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

var trasee = [trail10, trail5];
var traseeRasnov = [peVale, peVale2];

var brasov = new Oras('Brasov', trasee, {
  lat: 45.6579755,
  lng: 25.6011977
});

var rasnov = new Oras('Rasnov', traseeRasnov, {
  lat: 45.5937295,
  lng: 25.4610231
});

var orasele = [rasnov, brasov];


function introduOraseInSelect(orasele) {
  var selectOrase = document.getElementById('orase');
  var str = '';
  orasele.sort(function(a, b) {
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

  for (var i = 0; i < orasele.length; i++) {
    var orasul = orasele[i]
    str = str + '<option value="' + orasul.id + '" id="' + orasul.id + '">' + orasul.id + '</option>';
  }

  selectOrase.innerHTML = str;
  // console.log(orasele);
};

introduOraseInSelect(orasele);

function introduTraseeleInSelect(orasele) {

  var selectTrasee = document.getElementById('selectH');
  var optgroup = '<option default>Select Track</option>';
  var km = [];
  var orasulObject = orasulAlesEste(orasele);
  var trasee = orasulObject.trasee;
  for (var i = 0; i < trasee.length; i++) {
    var traseul = trasee[i];
    km.push(traseul.distance);
  }
  // le filtrez ca sa imi ramana numai valori unice
  var uniqueArray = km.filter(function(item, pos) {
    return km.indexOf(item) == pos;
  });
  // le sortez sa fie in ordine crescatoare
  uniqueArray.sort(function(a, b) {
    return a - b
  });

  for (var i = 0; i < uniqueArray.length; i++) {
    var kilometri = uniqueArray[i]
    var options = loop();

    function loop() {
      var options = '';
      for (var i = 0; i < trasee.length; i++) {
        var traseulSecond = trasee[i];
        if (traseulSecond.distance == kilometri) {
          options = options + '<option value="' + traseulSecond.id + '" id="' + traseulSecond.id + '">' + traseulSecond.id + '</option>';
        }
      }
      return options;
    }
    optgroup = optgroup + '<optgroup label="' + uniqueArray[i] + ' km">' + options + '</optgroup>';
  }
  selectTrasee.innerHTML = optgroup;
}

introduTraseeleInSelect(orasele);


// var userChoice = ['trail', 5]

// for (var i = 0; i < trasee.length; i++) {
//   if (trasee[i].runtype == userChoice[0] && trasee[i].distance == userChoice[1]) {
//     console.log(trasee[i].traseu);
//   }
// }


//
// functiile de desenare a harti
//

// initMap se apeleaza in lincul de la sctriptul de mai jos unde introduci appi key
function initMap(arr) {

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

  document.getElementById('orase').addEventListener('change', function() {


    introduTraseeleInSelect(orasele);

    var hartaOras = orasulAlesEste(orasele);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: hartaOras.coordonate
    });
    // map displayd on entering page
    directionsDisplay.setMap(null);
    console.log(directionsDisplay);
  });

  //
  // cand se schimba selectul de la trasee
  //

  document.getElementById('selectH').addEventListener('change', function() {

    var hartaOras = orasulAlesEste(orasele);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: hartaOras.coordonate
    });
    directionsDisplay.setMap(map);
    var traseulEste = traseulAlesEste();
    console.log(traseulEste);
    calculateAndDisplayRoute(directionsService, directionsDisplay, traseulEste.traseu);
    console.log(directionsDisplay);
    // visitPage();
  });

}

function traseulAlesEste() {
  var orasul = orasulAlesEste(orasele);
  var trasee = orasul.trasee;
  var traseulAles = document.getElementById('selectH').value;
  for (var i = 0; i < trasee.length; i++) {
    var result = trasee[i]
    if (traseulAles == result.id) {
      return result;
    }
  }
}

function orasulAlesEste(orasele) {
  var orasul = document.getElementById('orase').value;
  for (var i = 0; i < orasele.length; i++) {
    var result = orasele[i];
    if (orasul == result.id) {
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
      var distanta = 0;
      var distantaKm = 0;
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
          '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
        distanta += route.legs[i].distance.value;
      }
      distantaKm = Math.round(distanta / 10) / 100;
      summaryPanel.innerHTML += "Distanta totala este: " + distantaKm + 'km';
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

// function visitPage() {
//   window.location = 'harta.html';
// }




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var button = document.getElementById('datebtn');
button.addEventListener('click', vremea);

function vremea() {
  var date = $('#datePicker').val();
  var seconds = transformDate(date);
  weatherReport(seconds);
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
    city = orasulAlesEste(orasele),
    seconds = seconds,
    api_call = url + apiKey + "/" + city.coordonate.lat + "," + city.coordonate.lng + "," + seconds;

  api_call = api_call.concat("?units=ca&callback=?")

  // Call to the DarkSky API to retrieve JSON
  var darkSkyApi = $.getJSON(api_call, function(forecast) {
    $('.getDate').html(forecast.daily.data[0].temperatureMax + " &#8451" + " / " + forecast.daily.data[0].summary);
    // console.log(forecast.hourly.data[13]);
    // console.log(forecast.daily);
    // console.log(forecast.daily.data[0].summary);
  });
  return darkSkyApi;
}