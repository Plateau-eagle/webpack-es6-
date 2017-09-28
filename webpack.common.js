const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
	entry: {
		app: './src/main.js',
		vendors: [
			'jquery'
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[hash:7].js',
		publicPath: '../'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: ["babel-loader"],
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [{
					loader: "css-loader",
					options: {
						minimize: true
					}
				}]
			})
		}, {
			test: /\.(png|svg|jpg|gif)$/,
			use: [{
				loader: "url-loader",
				options: {
					limit: 10000,
					name: 'img/[name].[ext]'
				}
			}]
		}, {
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use: [{
				loader: "url-loader",
				options: {
					limit: 10000,
					name: 'fonts/[name].[ext]'
				}
			}]
		}]
	},
	plugins: [
		new ExtractTextPlugin("css/[name].[hash:7].css")
	]
}