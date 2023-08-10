

function renderWeather(weather) {
    console.log(weather);
    $("#current").empty();
    var results = document.querySelector("#current");

    var city = document.createElement("h2");
    city.textContent = weather.city.name;
    results.append(city);

    date = moment().format("M/D/YYYY");
    results.append(date);

    var temp = document.createElement("p");
    temp.textContent = "Temp: " + weather.list[0].main.temp + " °F";
    results.append(temp);

    var wind = document.createElement("p");
    wind.textContent = "Wind: " + weather.list[0].wind.speed + " MPH";
    results.append(wind);

    var humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + weather.list[0].main.humidity + " %";
    results.append(humidity);
}

function renderFutureWeather(weather) {
    for (var i = 1; i <= 5; i++) {
        var results = document.querySelector("#icon" + [i]);

        var futureDate = $("#date" + [i]);
        date = moment().add(i, "d").format("M/D/YYYY");
        futureDate.append(date);

        var temp = document.createElement("p");
        temp.textContent = "Temp: " + weather.list[i].main.temp + " °F";
        results.append(temp);

        var wind = document.createElement("p");
        wind.textContent = "Wind: " + weather.list[i].wind.speed + " MPH";
        results.append(wind);

        var humidity = document.createElement("p");
        humidity.textContent = "Humidity: " + weather.list[i].main.humidity + " %";
        results.append(humidity);
    }
}


function fetchCityName(query) {
    var url1 = "https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=aacafb400b6eef1cdd04ebdad8f51f57";

    fetch(url1)
        .then((response) => response.json())
        .then((data) => fetchWeather(data));
}

function fetchWeather(location) {
    var lat = location.coord.lat;
    var lon = location.coord.lon;

    var url2 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=aacafb400b6eef1cdd04ebdad8f51f57";
    
    fetch(url2)
    .then((response) => response.json())
    .then((data) => renderWeather(data));

    fetch(url2)
    .then((response) => response.json())
    .then((data) => renderFutureWeather(data));
}

fetchCityName();