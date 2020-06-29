const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }],
    },
    devServer: {
        contentBase: './dist',
    },
};