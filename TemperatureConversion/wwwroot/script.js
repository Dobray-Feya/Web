"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const convertButton = document.getElementById("convert-button");
    const celsiusField = document.getElementById("celsius-field");
    const fahrenheitField = document.getElementById("fahrenheit-field");
    const kelvinField = document.getElementById("kelvin-field");


    convertButton.addEventListener("click", function () {
        const celsiusTemperatureString = celsiusField.value.trim();
        const celsiusTemperature = Number(celsiusTemperatureString);

        celsiusField.classList.remove("invalid");

        if (celsiusTemperatureString === "" || isNaN(celsiusTemperature)) {
            celsiusField.classList.add("invalid");
            return;
        }

        const fahrenheitTemperature = (9 * celsiusTemperature / 5 + 32).toFixed(2);
        const kelvinTemperature = (Number(celsiusTemperature) + 273.15).toFixed(2);

        fahrenheitField.value = fahrenheitTemperature;
        kelvinField.value = kelvinTemperature;
    });
});