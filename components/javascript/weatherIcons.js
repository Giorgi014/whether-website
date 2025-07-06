const getWeatherIcon = (weatherCondition) => {
  const condition = weatherCondition.toLowerCase();

  const iconMap = {
    clear: "./assets/icon/weather-icons-master/svg/wi-day-sunny.svg",
    clouds: "./assets/icon/weather-icons-master/svg/wi-cloudy.svg",
    rain: "./assets/icon/weather-icons-master/svg/wi-rain.svg",
    drizzle: "./assets/icon/weather-icons-master/svg/wi-sprinkle.svg",
    thunderstorm: "./assets/icon/weather-icons-master/svg/wi-thunderstorm.svg",
    snow: "./assets/icon/weather-icons-master/svg/wi-snow.svg",
    sleet: "./assets/icon/weather-icons-master/svg/wi-sleet.svg",
    wind: "./assets/icon/weather-icons-master/svg/wi-strong-wind.svg",
  };

  return iconMap[condition];
};
