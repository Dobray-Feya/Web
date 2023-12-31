"use strict";

(function () {
    Vue.createApp({
        // data() - краткий синтаксис из ES 6, аналогично data: function() { … }
        data() {
            return {
                message: "hello!"
            };
        },

        methods: {
            changeMessage() {
                this.message = this.message.indexOf("Привет") >= 0
                    ? "Пока, Vue!" : "Привет, Vue!";
            }
        }
    }).mount("#form");
})();