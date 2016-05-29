var path = require('path');
var webpack = require('webpack');

var babelLoaderSettings = JSON.stringify({
	cacheDirectory: true,
	presets: ['es2015'],
});

module.exports = {
	devtool: '#sourcemap',
	entry: {
		scripts: [
			'./src/index.js'
		],
	},
	output: {
		path: path.join(__dirname),
		filename: '[name].js',
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
	],
	resolve: {
		root: [
			path.resolve('./app/')
		]
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel?'+babelLoaderSettings],
				include: [path.join(__dirname, 'src')]
			},
		],
	}
};
