const CHANGE_BUTTON = document.getElementById("handle_cont");
const darkMode = localStorage.getItem("darkmode");

const pageModes = () => {
  const enableDarkMode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
  };

  const disableDarkMode = () => {
    document.body.classList.remove("darkmode");

    localStorage.setItem("darkmode", null);
  };

  if (localStorage.getItem("darkmode") === "active") {
    enableDarkMode();
  }

  CHANGE_BUTTON.addEventListener("click", () => {
    const currentMode = localStorage.getItem("darkmode");
    currentMode !== "active" ? enableDarkMode() : disableDarkMode();
  });
};

pageModes();
