var searchHistory = []
var lastCitySearched = ""

// displays current weather
function renderWeather(weather) {
    console.log(weather);
    //empty previous display
    $("#current").empty();

    //targets current container
    var results = document.querySelector("#current");

    //current date
    var city = document.createElement("h2");
    city.textContent = weather.city.name + " " + moment().format("M/D/YYYY");
    results.append(city);

    //weather icon
    var iconcode = weather.list[i].weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    var icon = document.createElement("img");
    icon.src = iconurl;
    results.append(icon);

    //current temp
    var temp = document.createElement("p");
    temp.textContent = "Temp: " + (weather.list[0].main.temp - 200).toFixed(1) + " °F";
    results.append(temp);

    //current wind
    var wind = document.createElement("p");
    wind.textContent = "Wind: " + weather.list[0].wind.speed + " MPH";
    results.append(wind);

    //current humidity
    var humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + weather.list[0].main.humidity + " %";
    results.append(humidity);

    // save the last city searched
    lastCitySearched = weather.city.name;

    // calls saveSearchHistory
    saveSearchHistory(weather.city.name);
}

// displays 5 day forecast
function renderFutureWeather(weather) {
    //empty previous display
    $(".icons").empty();

    //loops data for each day
    for (var i = 1; i <= 5; i++) {
        
        //selects icon id
        var results = document.querySelector("#icon" + [i]);
  
        //dates for 5 day forecast
        var day = document.createElement("p");
        date = moment().add(i, "d").format("M/D/YYYY");
        day.textContent = date;
        results.append(day);

        //icons for 5 day forecast
        var iconcode = weather.list[i].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        var icon = document.createElement("img");
        icon.src = iconurl;
        results.append(icon);

        //temp for 5 day forecast
        var temp = document.createElement("p");
        temp.textContent = "Temp: " + (weather.list[i].main.temp - 200).toFixed(1) + " °F";
        results.append(temp);

        //wind for 5 day forecast
        var wind = document.createElement("p");
        wind.textContent = "Wind: " + weather.list[i].wind.speed + " MPH";
        results.append(wind);

        //humidity for 5 day forecast
        var humidity = document.createElement("p");
        humidity.textContent = "Humidity: " + weather.list[i].main.humidity + " %";
        results.append(humidity);
    }
}

//gets latitude and longitude from fetch api
function fetchCityName(city) {
    var url1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=aacafb400b6eef1cdd04ebdad8f51f57";

    fetch(url1)
        .then((response) => response.json())
        .then((data) => fetchWeather(data));
}

//gets data from city using latitude and longitude
function fetchWeather(location) {
    var lat = location.coord.lat;
    var lon = location.coord.lon;

    var url2 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=aacafb400b6eef1cdd04ebdad8f51f57";
    
    //calls renderWeather function
    fetch(url2)
    .then((response) => response.json())
    .then((data) => renderWeather(data));

    //calls renderFutureWeather function
    fetch(url2)
    .then((response) => response.json())
    .then((data) => renderFutureWeather(data));
}

function searchSubmitHandler(event) {
    // stop page from refreshing
    event.preventDefault();

    // get value from input element
    var cityName = $("#cityInput").val().trim();

    // check if the search field has a value
    if(cityName) {
        // pass the value to getCityWeather function
        fetchCityName(cityName);

        // clear the search input
        $("#cityInput").val("");
    } else {
        // if nothing was entered alert the user
        alert("Please enter a city name");
    }
};

function saveSearchHistory(city) {
    if(!searchHistory.includes(city)){
        searchHistory.push(city);
        $("#searchHistory").append("<a href='#' class='list-group-item list-group-item-action' id='" + city + "'>" + city + "</a>")
    } 

    // save the searchHistory array to local storage
    localStorage.setItem("weatherSearchHistory", JSON.stringify(searchHistory));

    // save the lastCitySearched to local storage
    localStorage.setItem("lastCitySearched", JSON.stringify(lastCitySearched));

    // calls loadSearchHistory function
    loadSearchHistory();
};

// load saved city search history from local storage
function loadSearchHistory() {
    searchHistory = JSON.parse(localStorage.getItem("weatherSearchHistory"));
    lastCitySearched = JSON.parse(localStorage.getItem("lastCitySearched"));

    if (!searchHistory) {
        searchHistory = []
    }

    if (!lastCitySearched) {
        lastCitySearched = ""
    }

    // clear any previous values
    $("#searchHistory").empty();

    // for loop that will run through all the citys
    for(i = 0 ; i < searchHistory.length ;i++) {

        // add the city as a link and set it's id
        $("#searchHistory").append("<a href='#' class='list-group-item list-group-item-action' id='" + searchHistory[i] + "'>" + searchHistory[i] + "</a>");
    }
  };

// load search history from local storage
loadSearchHistory();

// start page with the last city searched if there is one
if (lastCitySearched != ""){
    fetchCityName(lastCitySearched);
}

// event handlers
$("#searchForm").submit(searchSubmitHandler);
$("#searchHistory").on("click", function(event){
    // get the links id value
    var prevCity = $(event.target).closest("a").attr("id");
    // pass it's id value to the getCityWeather function
    fetchCityName(prevCity);
});
