const apiKey = "c002eabec3dffadff47e3a2e8c28fb4f";
const city = document.getElementById("city");
const COUNTRY_CODE = document.getElementById("country_code");
const temp = document.getElementById("temperature_degrees");
const WEATHER_INFO = document.getElementById("temperature_info");
const HUMIDITY_INDEX = document.getElementById("humidity_index");
const WIND_SPEED_INDEX = document.getElementById("wind_speed_index");
const PRESSURE_INDEX = document.getElementById("pressure_index");
const FEELS_LIKE_INDEX = document.getElementById("feels_like_index");
const VISIBILITY_INDEX = document.getElementById("visibility_index");
const SUNRISE_TIME = document.getElementById("sunrise_time");
const SUNSET_TIME = document.getElementById("sunset_time");
const search = document.getElementById("search");
const SEARCH_BTN = document.getElementById("seach_btn");
const FORECAST_CONTAINER =
  document.getElementsByClassName("forecast_container");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const fetchCurrentData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
  const res = await fetch(url);

  return await res.json();
};

const fetchForecastData = async (lat, lon) => {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const res = await fetch(forecastUrl);
  return await res.json();
};
console.log(fetchForecastData(16.4063, -78.1586));

const renderTodayWeather = (cities) => {
  const WEATHER_CONDITION = cities.weather[0].main;

  city.textContent = `${cities.name},`;
  COUNTRY_CODE.textContent = cities.sys.country;
  temp.textContent = Math.round(cities.main.temp);
  WEATHER_INFO.textContent = cities.weather[0].main;
  HUMIDITY_INDEX.textContent = `${cities.main.humidity}%`;
  WIND_SPEED_INDEX.textContent = `${cities.wind.speed}km/h`;
  PRESSURE_INDEX.textContent = `${cities.main.pressure}hPa`;
  FEELS_LIKE_INDEX.textContent = `${cities.main.feels_like}°C`;
  VISIBILITY_INDEX.textContent = `${cities.visibility}m`;
  SUNRISE_TIME.textContent = `${cities.sys.sunrise}`;
  SUNSET_TIME.textContent = `${cities.sys.sunset}`;

  const isRaining = () => {
    if (WEATHER_CONDITION.toLowerCase() === "rain") {
      startRain();
    } else {
      stopRaining();
    }
  };
  const isSnowing = () => {
    if (WEATHER_CONDITION.toLowerCase() === "snow") {
      startSnow();
    } else {
      stopSnowing();
    }
  };

  isRaining();
  isSnowing();
};

const searchCity = async () => {
  const searchedCity = search.value;

  if (searchedCity) {
    const cities = await fetchCurrentData(searchedCity);
    renderTodayWeather(cities);
    search.value = "";
  }
};

search.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchCity();
  }
});

SEARCH_BTN.addEventListener("click", () => {
  searchCity();
});

const renderHtml = async () => {
  try {
    const cities = await fetchCurrentData("batumi");
    renderTodayWeather(cities);
  } catch (err) {
    console.log("Error: ", err);
  }
};

renderHtml();
console.log(fetchCurrentData("batumi"));
