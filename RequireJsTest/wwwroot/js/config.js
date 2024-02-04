requirejs.config({
    baseUrl: "js",
    paths: {
        jquery: "../node_modules/jquery/dist/jquery",
        lodash: "../node_modules/lodash/lodash"
    }
});

require(["app"]);