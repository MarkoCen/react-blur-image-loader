var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './index.jsx',
    target: 'node',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'dist.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    externals: [nodeExternals()],
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel-loader'},
            { test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: false
        })
    ]
}