module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        clean: {
            build: ["dist"]
        },

        cssmin: {
            target: {
                files: {
                    "dist/style.css": [
                        "node_modules/bootstrap/dist/css/bootstrap.css",
                        "css/style1.css",
                        "css/style2.css"
                    ]
                }
            }

        },

        uglify: {
            target: {
                files: {
                    "dist/script.js": [
                        "node_modules/jquery/dist/jquery.js",
                        "node_modules/bootstrap/dist/js/bootstrap.js",
                        "js/script1.js",
                        "js/script2.js"
                    ]
                }
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks("grunt-contrib-uglify"); // Minify JavaScript files

    grunt.loadNpmTasks("grunt-contrib-cssmin"); // Minify CSS

    grunt.loadNpmTasks("grunt-contrib-clean"); // Clean folder (dist) btfore putting files in it

    // Default task(s).
    grunt.registerTask("default", ["clean:build", "cssmin", "uglify"]); // Grant does this task on starting
                                                    // it starts with command "grunt" if task is "default"
                                                    // or "grunt task-name" if task has name "task-name" (grunt.registerTask("task-name", ["clean:build"]);)
};