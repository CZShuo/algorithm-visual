const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/js/index.jsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.(jpg|png|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[path][name].[hash].[ext]',
            }
        }]
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    },
};