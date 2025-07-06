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
const DAY_WEATHER = document.querySelectorAll("#day_weather");
const MAX_TEMPERATURE = document.querySelectorAll("#day_time");
const MIN_TEMPERATURE = document.querySelectorAll("#night_time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];



const updateWeatherIcon = (iconPath, targetElement) => {
  if (targetElement) {
    targetElement.src = iconPath;
  }
};

const fetchData = async (city) => {
  // const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  const res = await fetch(url);

  return await res.json();
};

const renderTodayWeather = (cities) => {
  const cityName = `${cities.city.name},`;
  const countryCode = cities.city.country;
  const weatherCondition = cities.list[0].weather[0].main;
  const weatherTemp = isFahrenheit
  ? KelvinToFahrenheit(cities.list[0].main.temp)
  : KelvinToCelsius(cities.list[0].main.temp);
  const feelsLikeTemp = isFahrenheit
  ? KelvinToFahrenheit(cities.list[0].main.feels_like)
  : KelvinToCelsius(cities.list[0].main.feels_like);
  const humidity = `${cities.list[0].main.humidity}%`;
  const windSpeed = `${cities.list[0].wind.speed}km/h`;
  const pressure = `${cities.list[0].main.pressure}hPa`;
  const visibility = `${cities.list[0].visibility}m`;
  const sunriseTimestamp = new Date(cities.city.sunrise * 1000);
  const sunsetTimestamp = new Date(cities.city.sunset * 1000);
  const sunriseTime = `${sunriseTimestamp.getHours()}:${sunriseTimestamp.getMinutes()}`;
  const sunsetTime = `${sunsetTimestamp.getHours()}:${sunsetTimestamp.getMinutes()}`;
  const weatherIcon = getWeatherIcon(weatherCondition);
  const mainWeatherIcon = document.querySelector('.city_weather img');

  city.textContent = cityName;
  COUNTRY_CODE.textContent = countryCode;
  temp.textContent = weatherTemp;
  WEATHER_INFO.textContent = weatherCondition;
  HUMIDITY_INDEX.textContent = humidity;
  WIND_SPEED_INDEX.textContent = windSpeed;
  PRESSURE_INDEX.textContent = pressure;
  FEELS_LIKE_INDEX.textContent = feelsLikeTemp;
  VISIBILITY_INDEX.textContent = visibility;
  SUNRISE_TIME.textContent = sunriseTime;
  SUNSET_TIME.textContent = sunsetTime;
  
  updateWeatherIcon(weatherIcon, mainWeatherIcon);

  const isRaining = () => {
    if (weatherCondition.toLowerCase() === "rain") {
      startRain();
    } else {
      stopRaining();
    }
  };
  const isSnowing = () => {
    if (weatherCondition.toLowerCase() === "snow") {
      startSnow();
    } else {
      stopSnowing();
    }
  };

  isRaining();
  isSnowing();
};

const renderForcast = (cities) => {
  const dailyForecasts = [];
  const today = new Date();

  for (let i = 0; i < 5; i++) {
    const dayStart = i * 8;
    const dayEnd = dayStart + 8;
    const dayData = cities.list.slice(dayStart, dayEnd);

    if (dayData.length > 0) {
      const temperatures = dayData.map((item) => item.main.temp);
      const maxTemp = Math.max(...temperatures);
      const minTemp = Math.min(...temperatures);

      const forecastDate = new Date(today);
      forecastDate.setDate(today.getDate() + i);
      const dayName = days[forecastDate.getDay()];

      dailyForecasts.push({
        maxTemp,
        minTemp,
        weather: dayData[0].weather[0].main,
        dayName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dayName,
      });
    }
  }

  console.log(dailyForecasts);

  dailyForecasts.forEach((dayForecast, index) => {
    if (MAX_TEMPERATURE[index] && MIN_TEMPERATURE[index]) {
      const maxTemperature = isFahrenheit
        ? KelvinToFahrenheit(dayForecast.maxTemp)
        : KelvinToCelsius(dayForecast.maxTemp);

      const minTemperature = isFahrenheit
        ? KelvinToFahrenheit(dayForecast.minTemp)
        : KelvinToCelsius(dayForecast.minTemp);

      MAX_TEMPERATURE[index].textContent = maxTemperature;
      MIN_TEMPERATURE[index].textContent = minTemperature;
      DAY_WEATHER[index].textContent = dayForecast.weather;
      
      const forecastIcon = getWeatherIcon(dayForecast.weather);
      const forecastWeatherIcon = document.querySelectorAll('.days img')[index];
      updateWeatherIcon(forecastIcon, forecastWeatherIcon);
      
      const dayNameElement = document.querySelectorAll('.days .day')[index];
      if (dayNameElement) {
        dayNameElement.textContent = dayForecast.dayName;
      }
    }
  });

  if (dailyForecasts.length > 0) {
    MAX_TEMPERATURE.textContent = isFahrenheit
      ? KelvinToFahrenheit(dailyForecasts[0].maxTemp)
      : KelvinToCelsius(dailyForecasts[0].maxTemp);
    MIN_TEMPERATURE.textContent = isFahrenheit
      ? KelvinToFahrenheit(dailyForecasts[0].minTemp)
      : KelvinToCelsius(dailyForecasts[0].minTemp);
    DAY_WEATHER.textContent = dailyForecasts[0].weather;
  }
};

const searchCity = async () => {
  const searchedCity = search.value;

  if (searchedCity) {
    try {
      if (window.showLoader) window.showLoader();
      const cities = await fetchData(searchedCity);
      renderTodayWeather(cities);
      renderForcast(cities);
      search.value = "";
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      if (window.hideLoader) window.hideLoader();
    }
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
    const cities = await fetchData("batumi");
    renderTodayWeather(cities);
    renderForcast(cities);
  } catch (err) {
    console.log("Error: ", err);
  }
};

renderHtml();
console.log(fetchData("batumi"));
