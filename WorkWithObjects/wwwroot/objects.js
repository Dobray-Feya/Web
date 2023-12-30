(function () {
    const countries = [
        {
            name: "Россия",
            cities: [
                {
                    name: "Екатеринбург",
                    population: 1493600
                },
                {
                    name: "Казань",
                    population: 1259173
                },
                {
                    name: "Москва",
                    population: 13015126
                },
                {
                    name: "Нижний Новгород",
                    population: 1233949
                },
                {
                    name: "Новосибирск",
                    population: 1621330
                },
                {
                    name: "Санкт-Петербург",
                    population: 5607916
                },
                {
                    name: "Челябинск",
                    population: 1179288
                }
            ]
        },
        {
            name: "Китай",
            cities: [
                {
                    name: "Гуанчжоу",
                    population: 14043500
                },
                {
                    name: "Пекин",
                    population: 21705000
                },
                {
                    name: "Тяньцзинь",
                    population: 15469500
                },
                {
                    name: "Ухань",
                    population: 10607700
                },
                {
                    name: "Чунцин",
                    population: 30751600
                },
                {
                    name: "Шанхай",
                    population: 24152700
                },
                {
                    name: "Шеньчжэнь",
                    population: 11908400
                }
            ]
        },
        {
            name: "Индия",
            cities: [
                {
                    name: "Ахмадабад",
                    population: 5570585
                },
                {
                    name: "Бангалор",
                    population: 8425970
                },
                {
                    name: "Дели",
                    population: 11007835
                },
                {
                    name: "Мумбаи",
                    population: 12478447
                },
                {
                    name: "Хайдарабад",
                    population: 6809970
                },
                {
                    name: "Ченнаи",
                    population: 4681087
                }
            ]
        }
    ];

    function getCountriesWithMaxCitiesCount(countries) {
        const countriesWithMaxCitiesCount = [];
        let maxCitiesCount = 0;

        countries.forEach(country => {
            let citiesCount = country.cities.length;

            if (citiesCount > maxCitiesCount) {
                maxCitiesCount = citiesCount;
                countriesWithMaxCitiesCount.splice(0, countriesWithMaxCitiesCount.length, country);
            } else if (citiesCount === maxCitiesCount) {
                countriesWithMaxCitiesCount.push(country);
            }
        });

        return countriesWithMaxCitiesCount;
    }

    console.log("Страны с наибольшим числом городов:");
    console.log(getCountriesWithMaxCitiesCount(countries)
        .map(country => country.name)
        .join(", "));

    function getCountriesPopulations(countries) {
        const countriesPopulations = {};

        countries.forEach(country => {
            countriesPopulations[country.name] = country.cities
                .reduce((populationSum, city) => populationSum + city.population, 0);
        });

        return countriesPopulations;
    }

    console.log("Численность населения по странам:");

    const countriesPopulations = getCountriesPopulations(countries);

    for (const countryName in countriesPopulations) {
        console.log(`${countryName} - ${new Intl.NumberFormat("ru-RU").format(countriesPopulations[countryName])}`);
    }
})();