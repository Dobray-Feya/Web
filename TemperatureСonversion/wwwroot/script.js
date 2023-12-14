"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const convertButton = document.getElementById("convertButton");
    const celsiusField = document.getElementById("celsiusField");

    convertButton.addEventListener("click", function (e) {
        let celsiusTemperature = celsiusField.value.trim();

        celsiusField.classList.remove("invalid");

        if (isNaN(celsiusTemperature)) {
            celsiusField.classList.add("invalid");
            return;
        }

        let fahrenheitTemperature = (9 * celsiusTemperature / 5 + 32).toFixed(2);
        let kelvinTemperature = (Number(celsiusTemperature) + 273.15).toFixed(2);

        document.getElementById("fahrenheitField").setAttribute("value", fahrenheitTemperature);
        document.getElementById("kelvinField").setAttribute("value", kelvinTemperature);
    });
})