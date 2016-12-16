var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    entry: "./app/index.tsx",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist", "public")
    },

    devtool: "source-map",

    resolve: {
        extensions: ["", ".ts", ".tsx", ".js", ".jsx"]
    },

    module: {
        loaders: [
            { test: /\.(tsx|ts)$/, loader: "awesome-typescript-loader" }
        ],

        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{ from: 'public'}])
    ],
    devServer: {
        historyApiFallback: true,
        proxy: {
            "/api": "http://localhost:3000"
        }
    }
};