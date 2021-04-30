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

  axios.get(apiUrl).then(showTemp);
  axios.get(apiUrl).then(showHumi);
  axios.get(apiUrl).then(showWind);
}
let form = document.querySelector("form");
form.addEventListener("submit", insertCity);

function showTemp(response) {
  let celcius = Math.round(response.data.main.temp);
  let temp = document.querySelector("#degree");
  temp.innerHTML = `Temperature: ${celcius}ºC`;
}
function showHumi(response) {
  let humidi = response.data.main.humidity;
  let humi = document.querySelector("#humid");
  humi.innerHTML = `Humidity: ${humidi}%`;
}
function showWind(response) {
  let windy = Math.round(response.data.wind.speed);
  let win = document.querySelector("#theWind");
  win.innerHTML = `Wind: ${windy} Km/h`;
}
