function GetInfo() {
    const newName = document.getElementById("cityInput");
    const cityName = document.getElementById("currentCity");
    currentCity.innerHTML = newName;
}

fetch("http://api.openweathermap.org/geo/1.0/direct?q=newName&limit=5&appid=aacafb400b6eef1cdd04ebdad8f51f57");

fetch("api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=828d79693a4956081486ecac446f61b2");