"use strict";

(function () {
    console.log("Подзадача 1");

    function sortDescending(array) {
        array.sort((n1, n2) => n2 - n1);
    }

    function getFirstElements(array, count) {
        return array.slice(0, count);
    }

    function getLastElements(array, count) {
        return array.slice(-count);
    }

    function getEvenNumbersSum(array) {
        return array
            .filter(n => n % 2 === 0)
            .reduce((n1, n2) => n1 + n2, 0);
    }

    function printArray(array, text) {
        if ((typeof text === "string")) {
            console.log(text + ":");
        }

        console.log(array.join(", "));
    }

    function printValue(value, text) {
        if (typeof text === "string") {
            console.log(text + ":");
        }

        console.log(value);
    }

    const array1 = [8, -9, 3, 3.1, 3.2, -3, 12, 4, 6];
    printArray(array1, "Исходный массив");

    sortDescending(array1);
    printArray(array1, "Массив после сортировки по убыванию");

    printArray(getFirstElements(array1, 5), "5 первых элементов отсортированного массива");
    printArray(getLastElements(array1, 5), "5 последних элементов отсортированного массива");

    printValue(getEvenNumbersSum(array1), "Сумма четных элементов массива");

    console.log("Подзадача 2");

    function createNumbersArray(count) {
        let array = [];

        for (let i = 1; i <= count; i++) {
            array.push(i);
        }

        return array;
    }

    function getEvenNumbersSquares(array) {
        return array
            .filter(x => (x % 2 === 0))
            .map(x => x * x);
    }

    const array2 = createNumbersArray(100);
    printArray(array2, "Массив чисел от 1 до 100");

    printArray(getEvenNumbersSquares(array2), "Квадраты четных элементов массива");
})();