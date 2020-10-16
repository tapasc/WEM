const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const _SRCPath = path.resolve(__dirname + "/src");
const _RootPath = __dirname;



module.exports = {
	mode: "development",
	entry: ['bluebird', _RootPath + "/src/index.js"],
	output: {
		path: _RootPath + "/dist",
		filename: "bundle.js"
	},
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(jpg|jpeg|png|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'images'
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader',
				],
			},
			{
				test: /\.mp3$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'audio',
					publicPath: 'audio/'
				}
			},
			{
				test: /\.html$/i,
				loader: 'file-loader'
			},
			{
				test: /\.hbs$/,
				use: ['handlebars-loader']
			}
		]
	},
	devServer: {
		port: 9000,
		hot: true
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "Win Einstein's Money",
			template: _SRCPath + "/templates/index.ejs"
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			JQuery: 'jquery'
		}),
		new CopyPlugin({
			patterns: [
				{
					from: _SRCPath + "/images",
					to: _RootPath + "/dist/images"
				},
				{
					from: _SRCPath + "/audio",
					to: _RootPath + "/dist/audio"
				},
				{
					from: _SRCPath + "/video",
					to: _RootPath + "/dist/video"
				}
			]
		})

	]
}