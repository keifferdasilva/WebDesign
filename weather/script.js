document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=b68a4410124533e62712187e05144cd3";
    fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {	
    console.log(json);
    let results = "";
      results += '<h2>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
	results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png" class=\'icon\'/>';
      }
      results += '<p class=\'temp\'>Current Temperature: ' + json.main.temp + " &deg;F</p>";
      results += '<p>Feels Like: ' + json.main.feels_like + "&deg;F</p>";
      results += '<p>Max: ' + json.main.temp_max + "&deg;F Min: " + json.main.temp_min + "&deg;F</p>";
      results += '<p>Humidity: ' + json.main.humidity + "%</p>";
      results += "<p>Wind Speed: " + json.wind.speed + " mph</p>";
      var sunrise = new Date(json.sys.sunrise * 1000);
      results += '<p>Sunrise: ' + sunrise.toLocaleTimeString() + '</p>';
      var sunset = new Date(json.sys.sunset * 1000);
      results += '<p>Sunset: ' + sunset.toLocaleTimeString() + '</p>';
      results += "<p class=\'last\'>";
      for (let i=0; i < json.weather.length; i++) {
	results += json.weather[i].description;
	if (i !== json.weather.length - 1)
	  results += ", ";
      }
      results += "</p>";
      document.getElementById("weatherResults").innerHTML = results;
    });
    const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=b68a4410124533e62712187e05144cd3";
    fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
        let forecast = "";
          for (let i=0; i < json.list.length; i++) {
    	forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
    	forecast += '<img src="https://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png" class=\'icon\'/>';
    	forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
        forecast += "<p>Max Temp: " + json.list[i].main.temp_max + "</p>";
        forecast += "<p>Min Temp: " + json.list[i].main.temp_min + "</p>";
        forecast += "<p>Humidity: " + json.list[i].main.humidity + "%</p>";
        forecast += "<p>Wind Speed: " + json.list[i].wind.speed + " mph</p>";
    	
    	forecast += '<p class=\'description\'>' + json.list[i].weather[0].description + '</p>';
    	forecast += '<div class=\'divider\'></div>'; 
          }
          document.getElementById("forecastResults").innerHTML = forecast;
    });
});