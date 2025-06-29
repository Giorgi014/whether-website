const apiKey = "c002eabec3dffadff47e3a2e8c28fb4f";
const city = document.getElementById("city");
const country_code = document.getElementById("country_code");
const temp = document.getElementById("temperature_degrees");
const weather_info = document.getElementById("temperature_info");
const humidity_index = document.getElementById("humidity_index");
const wind_speed_index = document.getElementById("wind_speed_index");
const pressure_index = document.getElementById("pressure_index");

const fetchData = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=surami`;
  const res = await fetch(url + `&appid=${apiKey}`);

  return await res.json();
};

const renderTodayWeather = (cities) => {
  city.innerHTML = `${cities.name},`;
  country_code.innerHTML = cities.sys.country;
  temp.innerHTML = cities.main.temp;
  weather_info.innerHTML = cities.weather[0].main;
  humidity_index.innerHTML = `${cities.main.humidity}%`;
  wind_speed_index.innerHTML = `${cities.wind.speed}km/h`;
  pressure_index.innerHTML = `${cities.main.pressure}hPa`;
};

const renderHtml = async () => {
  try {
    const cities = await fetchData();
    renderTodayWeather(cities);
  } catch (err) {
    console.log("Error: ", err);
  }
};

renderHtml();
console.log(fetchData());
