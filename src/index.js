//import "src/styles.css";
// Use this function to see the data and time in your app
let now = new Date();
function checkWeek(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let todays = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let actualFecha = `${todays} ${hours}:${minutes}`;
  return actualFecha;
}
let today = checkWeek(now);
let check = document.querySelector("#fecha");
check.innerHTML = today;

// Use this function to insert the city, display it in other side of the app
// and at to see the temperature using API

function insertCity(event) {
  event.preventDefault();
  let input = document.querySelector("#enter-city");
  let actualCity = document.querySelector("#city");
  let apiKey = "fceab41571af72ba31162dfdc25877b8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=${units}`;
  actualCity.innerHTML = input.value;

  axios.get(apiUrl).then(showEvent);
}
let form = document.querySelector("form");
form.addEventListener("submit", insertCity);

function forcastDay(times) {
  let date = new Date(times * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "fceab41571af72ba31162dfdc25877b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showEvent(response) {
  console.log(response);
  let descriptionWeather = response.data.weather[0].description;
  let description = document.querySelector("#description");
  let iconWeather = response.data.weather[0].icon;
  let icon = document.querySelector("#icon");
  let celcius = Math.round(response.data.main.temp);
  let temp = document.querySelector("#degree");
  let humidi = response.data.main.humidity;
  let humi = document.querySelector("#humid");
  let windy = Math.round(response.data.wind.speed);
  let win = document.querySelector("#theWind");

  description.innerHTML = `${descriptionWeather}`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconWeather}@2x.png`
  );
  temp.innerHTML = `Temperature: ${celcius}ºC`;
  humi.innerHTML = `Humidity: ${humidi}%`;
  win.innerHTML = `Wind: ${windy} Km/h`;

  getForecast(response.data.coord);
}
