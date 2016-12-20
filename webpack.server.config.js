var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    target: "node",
    entry: "./server/index.ts",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist", "server")
    },

    devtool: "source-map",

    resolve: {
        extensions: ["", ".ts", ".js"],
        alias: {
            graphql: path.resolve('./node_modules/graphql')
        }
    },

    module: {
        loaders: [
            { test: /\.ts$/, loader: "awesome-typescript-loader" }
        ],

        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    externals: nodeModules
};