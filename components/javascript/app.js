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
const MAX_TEMPERATURE = document.getElementById("day_time");
const MIN_TEMPERATURE = document.getElementById("night_time");


let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const fetchData = async (city) => {
  // const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  const res = await fetch(url);

  return await res.json();
};

const renderTodayWeather = (cities) => {
  const WEATHER_CONDITION = cities.list[0].weather[0].main;
  const sunriseTimestamp = new Date(cities.city.sunrise * 1000);
  const sunsetTimestamp = new Date(cities.city.sunset * 1000);
  
  city.textContent = `${cities.city.name},`;
  COUNTRY_CODE.textContent = cities.city.country;
  temp.textContent = isFahrenheit
  ? KelvinToFahrenheit(cities.list[0].main.temp)
  : KelvinToCelsius(cities.list[0].main.temp);
  WEATHER_INFO.textContent = cities.list[0].weather[0].main;
  HUMIDITY_INDEX.textContent = `${cities.list[0].main.humidity}%`;
  WIND_SPEED_INDEX.textContent = `${cities.list[0].wind.speed}km/h`;
  PRESSURE_INDEX.textContent = `${cities.list[0].main.pressure}hPa`;
  FEELS_LIKE_INDEX.textContent = isFahrenheit
  ? KelvinToFahrenheit(cities.list[0].main.feels_like)
  : KelvinToCelsius(cities.list[0].main.feels_like);
  VISIBILITY_INDEX.textContent = `${cities.list[0].visibility}m`;
  SUNRISE_TIME.textContent = `${sunriseTimestamp.getHours()}:${sunriseTimestamp.getMinutes()}`;
  SUNSET_TIME.textContent = `${sunsetTimestamp.getHours()}:${sunsetTimestamp.getMinutes()}`;

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

const renderForcast = (cities) => {
  const dailyForecasts = [];
  const today = new Date();
  
  for (let i = 0; i < 5; i++) {
    const dayStart = i * 8;
    const dayEnd = dayStart + 8;
    const dayData = cities.list.slice(dayStart, dayEnd);
    
    if (dayData.length > 0) {
      const temperatures = dayData.map(item => item.main.temp);
      const maxTemp = Math.max(...temperatures);
      const minTemp = Math.min(...temperatures);
      
      dailyForecasts.push({
        maxTemp,
        minTemp,
        weather: dayData[0].weather[0].main
      });
    }
  }
  
  console.log('Daily forecasts:', dailyForecasts);
  
  const dayContainers = document.querySelectorAll('.days');
  
  dailyForecasts.forEach((dayForecast, index) => {
    if (dayContainers[index]) {
      const dayContainer = dayContainers[index];
      const dayTimeElement = dayContainer.querySelector('.day_time .temperature_degrees');
      const nightTimeElement = dayContainer.querySelector('.night_time .temperature_degrees');
      
      if (dayTimeElement && nightTimeElement) {
        const maxTemperature = isFahrenheit
          ? KelvinToFahrenheit(dayForecast.maxTemp)
          : KelvinToCelsius(dayForecast.maxTemp);
        
        const minTemperature = isFahrenheit
          ? KelvinToFahrenheit(dayForecast.minTemp)
          : KelvinToCelsius(dayForecast.minTemp);
        
        dayTimeElement.textContent = maxTemperature;
        nightTimeElement.textContent = minTemperature;
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
