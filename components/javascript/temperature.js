// This file handles the temperature unit conversion feature, allowing users to switch between Celsius and Fahrenheit.
const CHANGE_TEMPERATURE = document.getElementById("temp_handle_cont");
// const fahrenheit = localStorage.getItem("tempterature");
const isFahrenheit = localStorage.getItem("tempterature") === "fahrenheit";

const temperatureMode = () => {
  const enableFahrenheit = () => {
    document.body.classList.add("fahrenheit");
    localStorage.setItem("tempterature", "fahrenheit");
  };

  const disableFahrenheit = () => {
    document.body.classList.remove("fahrenheit");
    localStorage.setItem("tempterature", "celsius");
  };

  if (isFahrenheit) {
    enableFahrenheit();
  }else{
    disableFahrenheit();
  }

  CHANGE_TEMPERATURE.addEventListener("click", () => {
    const currentMode = localStorage.getItem("tempterature");
    currentMode !== "fahrenheit" ? enableFahrenheit() : disableFahrenheit();
  });
};

temperatureMode();
