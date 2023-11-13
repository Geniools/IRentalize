const path = require("path");
const webpack = require("webpack");
const dotenv = require('dotenv');

// call dotenv, and it will return an Object with a parsed key
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./static/frontend"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".js", ".jsx", ".css"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.png$/,
                use: {
                    loader: "url-loader?limit=100000"
                },
            },
            {
                test: /\.jpg$/,
                use: {
                    loader: "file-loader"
                },
            }
        ],
    },
    optimization: {
        minimize: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the React lib size
                NODE_ENV: JSON.stringify("production"),
            },
        }),
        new webpack.DefinePlugin(envKeys),
    ],
};