let now = new Date();
let h3 = document.querySelector("h3");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednessday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
h3.innerHTML = `${day} ${hour}:${minute}`;

function showCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector(".city");
  let cityInput = document.querySelector("#search-text-input");

  if (cityInput.value) {
    cityElement.innerHTML = cityInput.value;
  } else {
    cityElement.innerHTML = null;
    alert("Please type a city");
  }

  let apiKey = "7ec50fc0a595f3c817fb74829d724ff2";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}
let enterCityForm = document.querySelector("#search-form");
enterCityForm.addEventListener("submit", showCity);

function showTemp(response) {
  let city = document.querySelector(".city");
  city.innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  console.log(temp);
  let h2 = document.querySelector(".temperature");
  h2.innerHTML = `${temp}°C`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

function searchLocation(position) {
  let apiKey = "7ec50fc0a595f3c817fb74829d724ff2";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentButtonPosition = document.querySelector("button.btn.btn-secondary");
currentButtonPosition.addEventListener("click", retrievePosition);
