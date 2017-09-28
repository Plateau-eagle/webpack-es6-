const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
module.exports = merge(common, {
	devtool: 'cheap-module-source-map',
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new uglify(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
			filename: 'js/vendors.[hash:7].js'
		}),
		new htmlPlugin({
			minify: {
				removeAttributeQuotes: true,
				collapseWhitespace: true
			},
			hash: true,
			template: './index.html'

		})
	]
});