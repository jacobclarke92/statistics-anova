var path = require('path');
var webpack = require('webpack');

var babelLoaderSettings = JSON.stringify({
	cacheDirectory: true,
	presets: ['es2015', 'react', 'stage-0'],
});

module.exports = {
	devtool: '#sourcemap',
	entry: {
		scripts: [
			'./scripts/index.js'
		],
	},
	output: {
		path: path.join(__dirname, 'webroot', 'dist'),
		filename: '[name].js',
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
	],
	resolve: {
		root: [
			path.resolve('./scripts/')
		]
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel?'+babelLoaderSettings],
				include: [path.join(__dirname, 'scripts')]
			},
		],
	}
};
