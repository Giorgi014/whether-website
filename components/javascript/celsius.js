const KelvinToCelsius = (kelvin) => {
    const celsius = kelvin - 273.15;

    return Math.round(celsius) + "°C";
}
console.log(KelvinToCelsius(300));
