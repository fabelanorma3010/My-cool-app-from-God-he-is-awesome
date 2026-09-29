let currentTemperatureCelsius = null;
let currentUnit = "celsius";

function refreshWeather(response) {
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  currentTemperatureCelsius = response.data.temperature.current;
  displayTemperature();

  getForecast(response.data.city);
}

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function displayTemperature() {
  let temperatureElement = document.querySelector("#temperature");

  if (currentTemperatureCelsius === null) {
    return;
  }

  if (currentUnit === "celsius") {
    temperatureElement.innerHTML = Math.round(currentTemperatureCelsius);
  } else {
    temperatureElement.innerHTML = Math.round(
      celsiusToFahrenheit(currentTemperatureCelsius),
    );
  }
}

function handleCelsiusClick() {
  if (currentUnit === "celsius") {
    return;
  }

  currentUnit = "celsius";
  document.querySelector("#celsius-link").classList.add("active");
  document.querySelector("#fahrenheit-link").classList.remove("active");
  displayTemperature();
}

function handleFahrenheitClick() {
  if (currentUnit === "fahrenheit") {
    return;
  }

  currentUnit = "fahrenheit";
  document.querySelector("#fahrenheit-link").classList.add("active");
  document.querySelector("#celsius-link").classList.remove("active");
  displayTemperature();
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum,
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

let celsiusLinkElement = document.querySelector("#celsius-link");
celsiusLinkElement.addEventListener("click", handleCelsiusClick);

let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");
fahrenheitLinkElement.addEventListener("click", handleFahrenheitClick);
