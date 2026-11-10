let currentUnit = "celsius";
let currentWeatherResponse;
let currentForecastResponse;

function refreshWeather(response) {
  currentWeatherResponse = response;
  renderCurrentWeather();
  getForecast(response.data.city);
}

function renderCurrentWeather() {
  if (!currentWeatherResponse) {
    return;
  }

  let response = currentWeatherResponse;
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
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
  temperatureElement.textContent = Math.round(convertTemperature(temperature));
  iconElement.textContent = getWeatherIcon(response.data.condition.description);
  iconElement.classList.add("weather-app-icon");
}

function convertTemperature(celsius) {
  return currentUnit === "fahrenheit" ? (celsius * 9) / 5 + 32 : celsius;
}

function setTemperatureUnit(unit) {
  currentUnit = unit;
  let celsiusButton = document.querySelector("#celsius-link");
  let fahrenheitButton = document.querySelector("#fahrenheit-link");
  celsiusButton.classList.toggle("active", unit === "celsius");
  celsiusButton.setAttribute("aria-pressed", unit === "celsius");
  fahrenheitButton.classList.toggle("active", unit === "fahrenheit");
  fahrenheitButton.setAttribute("aria-pressed", unit === "fahrenheit");

  renderCurrentWeather();
  if (currentForecastResponse) {
    displayForecast(currentForecastResponse);
  }
}

function getWeatherIcon(description) {
  let condition = description.toLowerCase();

  if (condition.includes("thunder")) {
    return "⛈️";
  }
  if (condition.includes("snow")) {
    return "❄️";
  }
  if (condition.includes("drizzle")) {
    return "🌦️";
  }
  if (condition.includes("rain")) {
    return "🌧️";
  }
  if (
    condition.includes("mist") ||
    condition.includes("fog") ||
    condition.includes("haze") ||
    condition.includes("smoke") ||
    condition.includes("dust")
  ) {
    return "🌫️";
  }
  if (condition.includes("clear")) {
    return "☀️";
  }
  if (condition.includes("cloud")) {
    return "☁️";
  }

  return "🌡️";
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
  currentForecastResponse = response;
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <span class="weather-forecast-icon">${getWeatherIcon(
          day.condition.description,
        )}</span>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(
              convertTemperature(day.temperature.maximum),
            )}°</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
              convertTemperature(day.temperature.minimum),
            )}°</div>
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
document
  .querySelector("#celsius-link")
  .addEventListener("click", () => setTemperatureUnit("celsius"));
document
  .querySelector("#fahrenheit-link")
  .addEventListener("click", () => setTemperatureUnit("fahrenheit"));
