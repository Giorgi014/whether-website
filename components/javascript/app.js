const apiKey = "c002eabec3dffadff47e3a2e8c28fb4f";
const city = document.getElementById("city");
const country_code = document.getElementById("country_code");
const temp = document.getElementById("temperature_degrees");
const weather_info = document.getElementById("temperature_info");
const humidity_index = document.getElementById("humidity_index");
const wind_speed_index = document.getElementById("wind_speed_index");
const pressure_index = document.getElementById("pressure_index");

const search = document.getElementById("search");
const search_btn = document.getElementById("seach_btn");

const fetchData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
  const res = await fetch(url);

  return await res.json();
};

const renderTodayWeather = (cities) => {
  city.textContent = `${cities.name},`;
  country_code.textContent = cities.sys.country;
  temp.textContent = cities.main.temp;
  weather_info.textContent = cities.weather[0].main;
  humidity_index.textContent = `${cities.main.humidity}%`;
  wind_speed_index.textContent = `${cities.wind.speed}km/h`;
  pressure_index.textContent = `${cities.main.pressure}hPa`;
};

const searchCity = async () => {
  const searchedCity = search.value;

  if (searchedCity) {
    const cities = await fetchData(searchedCity);
    renderTodayWeather(cities);
    search.value = "";
  }
};

search.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchCity();
  }
});

search_btn.addEventListener("click", () => {
  searchCity();
});

const renderHtml = async () => {
  try {
    const cities = await fetchData("batumi");
    renderTodayWeather(cities);
  } catch (err) {
    console.log("Error: ", err);
  }
};

renderHtml();
console.log(fetchData("batumi"));
