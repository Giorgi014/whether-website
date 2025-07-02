const loader = document.getElementsByClassName("k-cube-grid");
const WEATHER_CONTAINER = document.getElementsByClassName("searched_city_container");
const WEATHER_CONTENT = document.getElementsByName("city_container");

const isLoading = () => {
    loader.style.display = "block";
    WEATHER_CONTENT.style.display = "none"
}

const isLoaded = () => {
    loader.style.display = "none";
    WEATHER_CONTENT.style.display = "flex"
}