const CHANGE_TEMPERATURE = document.getElementById("temp_handle_cont");
const fahrenheit = localStorage.getItem("fahrenheit");
const isFahrenheit = localStorage.getItem("fahrenheit") === "celsius";

const temperatureMode = () => {
  const enableFahrenheit = () => {
    document.body.classList.add("fahrenheit");
    localStorage.setItem("fahrenheit", "celsius");
  };

  const disableFahrenheit = () => {
    document.body.classList.remove("fahrenheit");

    localStorage.setItem("fahrenheit", null);
  };

  if (isFahrenheit) {
    enableFahrenheit();
  }else{
    disableFahrenheit();
  }

  CHANGE_TEMPERATURE.addEventListener("click", () => {
    const currentMode = localStorage.getItem("fahrenheit");
    currentMode !== "celsius" ? enableFahrenheit() : disableFahrenheit();
  });
};

temperatureMode();
