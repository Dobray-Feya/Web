(function () {
    const russia = {
        "name": "Россия",
        cities: [
            { "name": "Екатеринбург", "population": "1493600" },
            { "name": "Казань", "population": "1259173" },
            { "name": "Москва", "population": "13015126" },
            { "name": "Нижний Новгород", "population": "1233949" },
            { "name": "Новосибирск", "population": "1621330" },
            { "name": "Санкт-Петербург", "population": "5607916" },
            { "name": "Челябинск", "population": "1179288" },
        ]
    }

    const china = {
        "name": "Китай",
        cities: [
            { "name": "Гуанчжоу", "population": "14043500" },
            { "name": "Пекин", "population": "21705000" },
            { "name": "Тяньцзинь", "population": "15469500" },
            { "name": "Ухань", "population": "10607700" },
            { "name": "Чунцин", "population": "30751600" },
            { "name": "Шанхай", "population": "24152700" },
            { "name": "Шеньчжэнь", "population": "11908400" },
        ]
    }

    const india = {
        "name": "Индия",
        cities: [
            { "name": "Ахмадабад", "population": "5570585" },
            { "name": "Бангалор", "population": "8425970" },
            { "name": "Дели", "population": "11007835" },
            { "name": "Мумбаи", "population": "12478447" },
            { "name": "Хайдарабад", "population": "6809970" },
            { "name": "Ченнаи", "population": "4681087" },
        ]
    }

    const countries = [russia, china, india];

    let countriesWithMaxCitiesNumber = [];
    let maxCitiesNumber = 0;

    countries.forEach((country) => {
        let citiesNumber = country.cities.length;

        if (citiesNumber > maxCitiesNumber) {
            maxCitiesNumber = citiesNumber;
            countriesWithMaxCitiesNumber = [country];
        }
        else if (citiesNumber == maxCitiesNumber) {
                countriesWithMaxCitiesNumber.push(country);
        }
    });

    console.log(`Страны с наибольшим числом городов (${maxCitiesNumber}):`);
    console.log(countriesWithMaxCitiesNumber.map(country => country.name).join(", "));

    let countryPopulations = {};

    countries.forEach((country) => {
        countryPopulations[country.name] = country.cities.map(city => city.population).reduce((x, y) => { return Number(x) + Number(y) }, 0) / 1000000;
    });

    console.log(`Численность населения по странам (млн человек):`);

    for (let countryName in countryPopulations) {
        console.log(`${countryName} - ${countryPopulations[countryName]}`);
    }
})()