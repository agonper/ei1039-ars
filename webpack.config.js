var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

var PROD = JSON.stringify(process.env.NODE_ENV) === 'production';

var plugins = [
    new CopyWebpackPlugin([
        { from: 'public'},
        { from: 'node_modules/flexboxgrid/dist/flexboxgrid.min.css', to: 'css'}
    ]),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.SERVER_URL': JSON.stringify(process.env.SERVER_URL)
    })
];

if (PROD) plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
        warnings: false,
        booleans: false,
        unused: false
    }
}));

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
    plugins: plugins,
    devServer: {
        historyApiFallback: true,
        proxy: {
            "/api": "http://localhost:3000",
            "/auth": "http://localhost:3000"
        }
    }
};