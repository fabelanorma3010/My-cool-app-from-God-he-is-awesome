let currentUnit = "celsius";
let currentWeatherResponse;
let currentForecastResponse;

let loveQuotes = [
  "Love grows in the little moments we choose to share.",
  "A loving heart can make an ordinary day feel like home.",
  "Love is finding joy in helping another person shine.",
  "The sweetest kind of love makes room for us to grow.",
  "Love is a thousand small acts of kindness woven together.",
  "When words fall short, a caring presence can say so much.",
  "Love turns time together into memories worth keeping.",
  "To love is to listen, even in the quiet moments.",
  "A little patience and a little kindness can carry love a long way.",
  "Love brings warmth to days we never expected to be bright.",
  "The beauty of love is in showing up, again and again.",
  "Love is a gentle reminder that no one has to walk alone.",
];
let lastLoveQuoteIndex = -1;

let jokes = [
  "Why did the cloud bring a pencil? It wanted to draw some rain.",
  "What did the sunshine say to the umbrella? You can take the day off.",
  "Why did the raindrop sit by the window? It wanted a better view of the fall.",
  "What did the forecast say to the picnic? Let's take this one day at a time.",
  "Why did the breeze visit the library? It wanted to leaf through a book.",
  "What did the snowflake say at the party? I'm glad we could drift together.",
  "Why did the thermometer get a sweater? It was feeling a little low.",
  "What did the puddle say after the storm? I've really come together.",
  "Why did the rainbow open a bakery? It loved making colorful layers.",
  "What did the windy day say to the kite? I think we'll get along just fine.",
];
let lastJokeIndex = -1;

let sellingTips = [
  "Ask questions to understand what your customer needs before recommending a product.",
  "Explain how your product solves a problem, not just what features it has.",
  "Use clear, honest photos and descriptions so buyers know what to expect.",
  "Set a price that accounts for your costs and reflects the value you offer.",
  "Respond to questions promptly and politely, even when someone is not ready to buy.",
  "Make shipping costs, delivery times, and return policies easy to find.",
  "Listen to customer feedback and use it to improve your product or service.",
  "Share genuine customer reviews only with permission and without altering their meaning.",
  "Follow up respectfully after a sale to make sure the customer is satisfied.",
  "Keep track of which products sell well and adjust your inventory accordingly.",
];
let lastSellingTipIndex = -1;

function randomNewIndex(length, previousIndex) {
  let choices = length - (previousIndex === -1 ? 0 : 1);
  let index = Math.floor(Math.random() * choices);
  if (previousIndex !== -1 && index >= previousIndex) {
    index++;
  }
  return index;
}

function showLoveQuote() {
  lastLoveQuoteIndex = randomNewIndex(loveQuotes.length, lastLoveQuoteIndex);
  document.querySelector("#love-quote-result").textContent =
    loveQuotes[lastLoveQuoteIndex];
}

function showJoke() {
  lastJokeIndex = randomNewIndex(jokes.length, lastJokeIndex);
  document.querySelector("#joke-result").textContent = jokes[lastJokeIndex];
}

function showSellingTip() {
  lastSellingTipIndex = randomNewIndex(sellingTips.length, lastSellingTipIndex);
  document.querySelector("#selling-tip-result").textContent =
    sellingTips[lastSellingTipIndex];
}

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
  let condition = response.data.condition.description.toLowerCase();

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.textContent = Math.round(convertTemperature(temperature));
  document.querySelector("#cold-alert").textContent =
    temperature < 0 ? "It's below 0°C and cold! Wear a sweater." : "";
  document.querySelector("#sunny-alert").textContent =
    condition.includes("sunny") || condition.includes("clear")
      ? "Have a beautiful sunny day!"
      : "";
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

async function requestGemini(payload) {
  let response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  let data;

  try {
    data = await response.json();
  } catch (error) {
    if (response.status === 403 || response.status === 404) {
      throw new Error(
        "This server cannot run the Vercel API function. Open the deployed Vercel site or use `vercel dev` instead of Live Server.",
      );
    }
    throw new Error(
      `The Gemini endpoint returned a non-JSON response (HTTP ${response.status}).`,
    );
  }

  if (!response.ok) {
    throw new Error(data.error || "The Gemini request failed.");
  }

  return data;
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

async function generateTravelGuide(event) {
  event.preventDefault();

  let country = travelCountryInput.value.trim();
  let button = document.querySelector("#travel-guide-button");

  if (!country) {
    return;
  }

  button.disabled = true;
  travelGuideResult.textContent = "Creating your travel guide...";

  try {
    let data = await requestGemini({ type: "travel-guide", country });
    travelGuideResult.textContent = data.guide;
  } catch (error) {
    travelGuideResult.textContent = `Could not create a travel guide: ${error.message}`;
  } finally {
    button.disabled = false;
  }
}

function getLocalDateValue() {
  let date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
}

function formatJournalDate(dateValue) {
  let [year, month, day] = dateValue.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function loadJournalEntry(dateValue) {
  try {
    journalSavedEntry =
      localStorage.getItem(`weather-app-journal-${dateValue}`) || "";
    journalCurrentDate = dateValue;
    journalEntryInput.value = journalSavedEntry;
    deleteJournalEntryButton.disabled = !journalSavedEntry;
    journalStatus.textContent = journalSavedEntry
      ? `Loaded entry for ${formatJournalDate(dateValue)}.`
      : `No saved entry for ${formatJournalDate(dateValue)}.`;
  } catch (error) {
    console.error("Could not load the journal entry.", error);
    journalCurrentDate = dateValue;
    journalSavedEntry = "";
    journalEntryInput.value = "";
    deleteJournalEntryButton.disabled = true;
    journalStatus.textContent = "Could not read journal entries in this browser.";
  }
}

function saveJournalEntry() {
  let entry = journalEntryInput.value.trim();
  if (!entry) {
    journalStatus.textContent = "Write something before saving.";
    return;
  }

  try {
    localStorage.setItem(`weather-app-journal-${journalCurrentDate}`, entry);
    journalSavedEntry = entry;
    journalEntryInput.value = entry;
    deleteJournalEntryButton.disabled = false;
    journalStatus.textContent = `Saved entry for ${formatJournalDate(journalCurrentDate)}.`;
  } catch (error) {
    console.error("Could not save the journal entry.", error);
    journalStatus.textContent = "Could not save the entry in this browser.";
  }
}

function deleteJournalEntry() {
  if (
    !journalSavedEntry ||
    !window.confirm(
      `Delete your saved entry for ${formatJournalDate(journalCurrentDate)}?`,
    )
  ) {
    return;
  }

  try {
    localStorage.removeItem(`weather-app-journal-${journalCurrentDate}`);
    journalSavedEntry = "";
    journalEntryInput.value = "";
    deleteJournalEntryButton.disabled = true;
    journalStatus.textContent = `Deleted entry for ${formatJournalDate(journalCurrentDate)}.`;
  } catch (error) {
    console.error("Could not delete the journal entry.", error);
    journalStatus.textContent = "Could not delete the entry in this browser.";
  }
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

let journalDateInput = document.querySelector("#journal-date");
let journalEntryInput = document.querySelector("#journal-entry");
let saveJournalEntryButton = document.querySelector("#save-journal-entry");
let deleteJournalEntryButton = document.querySelector("#delete-journal-entry");
let journalStatus = document.querySelector("#journal-status");
let journalCurrentDate = getLocalDateValue();
let journalSavedEntry = "";
let travelCountryInput = document.querySelector("#travel-country");
let travelGuideResult = document.querySelector("#travel-guide-result");

journalDateInput.value = journalCurrentDate;
loadJournalEntry(journalCurrentDate);
journalDateInput.addEventListener("change", function () {
  if (!journalDateInput.value) {
    journalDateInput.value = journalCurrentDate;
    return;
  }

  if (journalEntryInput.value !== journalSavedEntry) {
    let discardChanges = window.confirm(
      "You have unsaved changes. Discard them and open another date?",
    );
    if (!discardChanges) {
      journalDateInput.value = journalCurrentDate;
      return;
    }
  }
  loadJournalEntry(journalDateInput.value);
});
saveJournalEntryButton.addEventListener("click", saveJournalEntry);
deleteJournalEntryButton.addEventListener("click", deleteJournalEntry);
document
  .querySelector("#travel-guide-form")
  .addEventListener("submit", generateTravelGuide);

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
document
  .querySelector("#celsius-link")
  .addEventListener("click", () => setTemperatureUnit("celsius"));
document
  .querySelector("#fahrenheit-link")
  .addEventListener("click", () => setTemperatureUnit("fahrenheit"));
document
  .querySelector("#love-quote-button")
  .addEventListener("click", showLoveQuote);
document.querySelector("#joke-button").addEventListener("click", showJoke);
document
  .querySelector("#selling-tip-button")
  .addEventListener("click", showSellingTip);

let videoFile = document.querySelector("#video-file");
let videoPreview = document.querySelector("#video-preview");
let videoStatus = document.querySelector("#video-status");
let videoUrl;

videoFile.addEventListener("change", function () {
  let file = videoFile.files[0];
  if (!file) {
    return;
  }

  videoPreview.pause();
  videoPreview.removeAttribute("src");
  videoPreview.load();
  videoPreview.hidden = true;
  if (videoUrl) {
    URL.revokeObjectURL(videoUrl);
    videoUrl = undefined;
  }

  if (file.type !== "video/mp4" && !file.name.toLowerCase().endsWith(".mp4")) {
    videoFile.value = "";
    videoStatus.textContent = "Please choose an MP4 video.";
    return;
  }

  try {
    videoUrl = URL.createObjectURL(file);
    videoStatus.textContent = "Loading video...";
    videoPreview.src = videoUrl;
    videoPreview.hidden = false;
  } catch (error) {
    console.error("Could not open the video.", error);
    videoStatus.textContent = "Could not open this video. Please try another file.";
  }
});

videoPreview.addEventListener("loadedmetadata", function () {
  videoStatus.textContent = "Video ready to play.";
});
videoPreview.addEventListener("error", function () {
  videoStatus.textContent =
    "Could not play this video. The file or its codec may not be supported.";
});
