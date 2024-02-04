const path = require("path"); // модуль из Node.js для работы с путями

const { CleanWebpackPlugin } = require("clean-webpack-plugin");  // плагин для удаления файлов. По умолчанию очищает папку,заданную в output
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // собирает все стили из всех модулей в 1 файл css
const { VueLoaderPlugin } = require("vue-loader"); // обрабатывает однофайловые vue-компоненты
const webpack = require("webpack"); // импортируем сам Webpack, чтобы ипсользовать его настройки для Vue
const HtmlWebpackPlugin = require("html-webpack-plugin"); // добавляет в index.html ссылки на CSS и JS

module.exports = {
    // Webpack Dev Server
    devServer: {
        hot: true,   //использовать Hot module replacement (HMR)
        open: true,  // открыть браузер с приложением при старте Webpack Dev Server
        proxy: {
            "/api": "http://localhost:3000"
        }
    },

    entry: "./js/script.js",

    output: {
        filename: "script.js",

        // path - модуль из Node.js, resolve выдает абсолютный путь, __dirname - неявная переменная Node.js
        path: path.resolve(__dirname, "../public"),
        // assetModuleFilename - настройка, задает имена и расположение файлов в целевой папке
        assetModuleFilename: "[path][name][ext]?[contenthash]"
    },

    // указали, что в development режиме будет подгружаться source map
    devtool: "source-map",

    // target настройка, чтобы код, который генерит Webpack (н-р, в минифицированном js), переводился из JS6 в JS5 (но наш код останется, как был; для нашего кода нужен babel - см. rules)
    target: ["web", "es5"],

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]  // Порядок применения лоадеров: справа налево
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/, // мы хотим, чтобы картинки, которые встречаются в CSS, просто перекладывались в выходную папку
                type: "asset/resource" // До Webpack 5 нужно было использовать file-loader. Теперь вместо этого можно указать свойство type
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: "styles.css"
        }),

        new VueLoaderPlugin(),

        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: "true",
            __VUE_PROD_DEVTOOLS__: "false",
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false"
        }),

        new HtmlWebpackPlugin({
            template: "index.html"
        })
    ]
};