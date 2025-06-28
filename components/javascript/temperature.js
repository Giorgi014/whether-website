const CHANGE_TEMPERATURE = document.getElementById("temp_handle_cont");
const fahrenheit = localStorage.getItem("fahrenheit");

const temperatureMode = () => {
  const enableFahrenheit = () => {
    document.body.classList.add("fahrenheit");
    localStorage.setItem("fahrenheit", "celsius");
  };

  const disableFahrenheit = () => {
    document.body.classList.remove("fahrenheit");

    localStorage.setItem("fahrenheit", null);
  };

  if (localStorage.getItem("fahrenheit") === "celsius") {
    enableFahrenheit();
  }

  CHANGE_TEMPERATURE.addEventListener("click", () => {
    const currentMode = localStorage.getItem("fahrenheit");
    currentMode !== "celsius" ? enableFahrenheit() : disableFahrenheit();
  });
};

temperatureMode();
