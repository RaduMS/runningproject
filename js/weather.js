//Weather display
$.when( $.ready ).then(function() {
  //Display current date on weather
  // Weather event
  $("#datebtn").on('click', dateClickHandler);
  $('#datebtn').trigger('click');

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

  // Date conversion for the weather display
  function transformDate(dateItem) {
    var dateChosen = new Date(dateItem);
    //get miliseconds since 1st Jan 1970
    dateChosen = dateChosen.getTime();
    //get seconds since 1st Jan 1970.
    dateChosen = dateChosen / 1000;
    return dateChosen;
  }

  function dateClickHandler () {
    var date = $('input[name="datePicker"]').val();
    var seconds = transformDate(date);
    weatherReport(seconds);
  }
});
