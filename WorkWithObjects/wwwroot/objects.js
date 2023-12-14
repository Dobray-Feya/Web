(function () {
    const countries = [
        {
            name: "Россия",
            cities: [
                { name: "Екатеринбург", "population": "1493600" },
                { name: "Казань", "population": "1259173" },
                { name: "Москва", "population": "13015126" },
                { name: "Нижний Новгород", "population": "1233949" },
                { name: "Новосибирск", "population": "1621330" },
                { name: "Санкт-Петербург", "population": "5607916" },
                { name: "Челябинск", "population": "1179288" }
            ]
        },
        {
            name: "Китай",
            cities: [
                { name: "Гуанчжоу", "population": "14043500" },
                { name: "Пекин", "population": "21705000" },
                { name: "Тяньцзинь", "population": "15469500" },
                { name: "Ухань", "population": "10607700" },
                { name: "Чунцин", "population": "30751600" },
                { name: "Шанхай", "population": "24152700" },
                { name: "Шеньчжэнь", "population": "11908400" }
            ]
        },
        {
            name: "Индия",
            cities: [
                { name: "Ахмадабад", "population": "5570585" },
                { name: "Бангалор", "population": "8425970" },
                { name: "Дели", "population": "11007835" },
                { name: "Мумбаи", "population": "12478447" },
                { name: "Хайдарабад", "population": "6809970" },
                { name: "Ченнаи", "population": "4681087" }
            ]
        }
    ];

    function getCountriesNamesWithMaxCitiesCount(countries) {
        let countriesWithmaxCitiesCount = [];
        let maxCitiesCount = 0;

        countries.forEach((country) => {
            const citiesCount = country.cities.length;

            if (citiesCount > maxCitiesCount) {
                maxCitiesCount = citiesCount;
                countriesWithmaxCitiesCount = [country];
            } else if (citiesCount === maxCitiesCount) {
                countriesWithmaxCitiesCount.push(country);
            }
        });

        return countriesWithmaxCitiesCount.map(country => country.name);
    }

    console.log(`Страны с наибольшим числом городов:`);
    console.log(getCountriesNamesWithMaxCitiesCount(countries).join(", "));

    function getContriesPopulations(countries) {
        let countriesPopulations = {};

        countries.forEach(country => {
            countriesPopulations[country.name] = country.cities
                .map(city => city.population)
                .reduce((e1, e2) => Number(e1) + Number(e2), 0)
        });

        return countriesPopulations;
    }

    console.log(`Численность населения по странам:`);

    const countriesPopulations = getContriesPopulations(countries);

    for (let countryName in countriesPopulations) {
        console.log(`${countryName} - ${new Intl.NumberFormat("ru-RU").format(countriesPopulations[countryName])}`);
    }
})();