const KelvinToFahrenheit = (kelvin) => {
    const fahrenheit = (kelvin - 273.15) * 9/5 + 32;

    return Math.round(fahrenheit) + "°F";
}

console.log(KelvinToFahrenheit(300));
