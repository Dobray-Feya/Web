"use strict";

(function () {
    const people = [
        {
            name: "Светлана",
            age: 30
        },
        {
            name: "Валентина Петровна",
            age: 47
        },
        {
            name: "Татьяна Валерьевна",
            age: 65
        },
        {
            name: "Клара",
            age: 23
        },
        {
            name: "Галочка",
            age: 10
        },
        {
            name: "Леночка",
            age: 5
        },
        {
            name: "Ангелина",
            age: 20
        },
        {
            name: "Татьяна Валерьевна",
            age: 71
        },
        {
            name: "Кристина",
            age: 30
        },
        {
            name: "Ульяна",
            age: 19
        },
        {
            name: "Клара",
            age: 23
        },
        {
            name: "Светлана",
            age: 26
        },
        {
            name: "Клара",
            age: 26
        }
    ];

    function getAverageAge(people) {
        return _.chain(people)
            .map("age")
            .reduce((sum, age) => sum + age, 0)
            .divide(people.length)
            .value();
    }

    function getPeopleFrom20To30(people) {
        return _.chain(people)
            .filter(p => p.age >= 20 && p.age <= 30)
            .sortBy("age")
            .value();
    }

    function getUniqueNamesOfPeopleFrom20To30(people) {
        return _.chain(people)
            .filter(p => p.age >= 20 && p.age <= 30)
            .map("name")
            .uniq()
            .sort()
            .reverse()
            .value();
    }

    function getNamesFrequency(people) {
        const namesFrequency = {};

        _.chain(people)
            .map("name")
            .forEach(name => {
                namesFrequency[name] = namesFrequency[name] + 1 || 1;
            })
            .value();

        return namesFrequency;
    }

    console.log("Средний возраст:");
    console.log(getAverageAge(people));

    console.log("Им от 20 до 30 лет (в порядке возрастания):");
    const peopleFrom20To30 = getPeopleFrom20To30(people);
    peopleFrom20To30.forEach(p => console.log(p.name + " - " + p.age));

    console.log("Имена людей в возрасте от 20 до 30 лет (в порядке убывания, без повторов):");
    const uniqueNamesOfPeopleFrom20To30 = getUniqueNamesOfPeopleFrom20To30(people);
    uniqueNamesOfPeopleFrom20To30.forEach(name => console.log(name));

    console.log("Сколько раз встречается каждое имя:");
    const namesFrequency = getNamesFrequency(people);
    _.forIn(namesFrequency, (frequency, name) => console.log(name + " - " + frequency));
})();