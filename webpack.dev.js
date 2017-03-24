var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './test/test.jsx',
    output: {
        path: path.resolve(__dirname, './test'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel-loader'},
            { test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "test"),
        // publicPath: "/test/",
        compress: true,
        port: 9000
    }
}