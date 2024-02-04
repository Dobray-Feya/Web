define(["jquery", "lodash", "test"], function ($, _, test) {
    // Для примера сделали модуль с побочным эффектом. Он ничего не выдает
    $("<div>").text(test.message).appendTo(document.body);
});