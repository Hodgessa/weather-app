function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-city");
  let city = document.querySelector("#location");
  city.innerHTML = searchInput.value;
}
let searchSubmit = document.querySelector("#city-form");
searchSubmit.addEventListener("submit", searchCity);

function getDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let dayTime = document.querySelector("#day-time");
  dayTime.innerHTML = `${day} ${hours}:${minutes}`;
}
getDate();

//function getFahrenheit() {
//let degrees = document.querySelector("#degrees");
//degrees.innerHTML = Math.round(response.data.main.temp);
//}

//function getCelsius() {
//let degrees = document.querySelector("#degrees");
//degrees.innerHTML = Math.round(response.data.main.temp);
//}

//let fahrenheit = document.querySelector("#fahrenheit");
//fahrenheit.addEventListener("click", getFahrenheit);
//let celsius = document.querySelector("#celsius");
//celsius.addEventListener("click", getCelsius);

function showYourTemperature(axiosResponse) {
  let temp = Math.round(axiosResponse.data.main.temp);
  let yourTemp = document.querySelector("#degrees");
  yourTemp.innerHTML = `${temp}`;
}

function showTemperature(axiosResponse) {
  let tempK = axiosResponse.data.main.temp;
  let tempC = Math.round(tempK - 273.15);
  let tempElement = document.querySelector("#degrees");
  tempElement.innerHTML = `${tempC}`;
}

function showLocation(axiosResponse) {
  let locationName = axiosResponse.data.name;
  let location = document.querySelector("#location");
  location.innerHTML = `${locationName}`;
}

function showWeatherCondition(axiosResponse) {
  let weatherCondition = axiosResponse.data.weather[0].main;
  let weather = document.querySelector("#weather-condition");
  weather.innerHTML = `${weatherCondition}`;
}

function search(city) {
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showLocation);
  axios.get(apiUrl).then(showWeatherCondition);
}

function getAndShowTemperature() {
  let city = document.querySelector("#enter-city").value;
  search(city);
}

searchSubmit.addEventListener("submit", getAndShowTemperature);

function showPosition(position) {
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showYourTemperature);
  axios.get(apiUrl).then(showLocation);
  axios.get(apiUrl).then(showWeatherCondition);
}

function findYourWeather() {
  let yourCity = document.querySelector("#location");
  yourCity.innerHTML = showTemperature;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let findButton = document.querySelector("#your-weather");
findButton.addEventListener("click", getCurrentPosition);

search("New York");
