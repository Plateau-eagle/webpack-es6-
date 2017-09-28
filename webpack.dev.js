const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: ('./dist'),
        host: 'localhost',
        compress: true,
        port: 3333,
        historyApiFallback: true,
        hot: true,
        inline: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
