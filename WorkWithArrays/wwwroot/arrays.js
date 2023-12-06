// Подзадача 1

(function () {
    "use strict"
    console.log("Подзадача 1");

    let array = [8, -9, 3, 3.1, 3.2, -3, 12, 4, 6];
    printArray(array, "Исходный массив");

    sortDescending(array);
    printArray(array, "Массив после сортировки по убыванию");

    printArray(getFirstElements(array, 5), "5 первых элементов отсортированного массива");
    printArray(getLastElements(array, 5), "5 последних элементов отсортированного массива");

    printValue(sumEvenElements(array), "Сумма четных элементов массива");

    function sortDescending(array) {
        if (array === [] || array.length === 1) {
            return array;
        }

        array.sort((x, y) => y - x);
    }

    function getFirstElements(array, count) {
        return array.slice(0, count);
    }

    function getLastElements(array, count) {
        return array.slice(array.length - count);
    }

    function sumEvenElements(array) {
        return array.filter(x => (x % 2 === 0)).reduce((x, y) => x + y, 0);
    }
})();

// Подзадача 2

(function () {
    "use strict"
    console.log("Подзадача 2");

    const array = createNumbersArray(100);
    printArray(array, "Массив чисел от 1 до 100");

    printArray(getEvenElementsSquares(array), "Квадраты четных элементов массива");

    function createNumbersArray(count) {
        let array = [];

        for (let i = 1; i <= count; i++) {
            array.push(i);
        }

        return array;
    }

    function getEvenElementsSquares(array) {
        return array.filter(x => (x % 2 === 0)).map(x => x * x);
    }

})()

// Глобальные функция - общие для обеих подзадач

function printArray(array, text) {
    if ((typeof text === "string")) {
        console.log(text + ":");
    }

    console.log(array.join(", "));
}

function printValue(value, text) {
    if ((typeof text === "string")) {
        console.log(text + ":");
    }

    console.log(value);
}