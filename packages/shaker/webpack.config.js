const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	target: 'web',
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		index: './src/index.ts',
		'index.min': './src/index.ts'
	},
	output: {
		filename: '[name].js'
	},
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: [ '.ts', '.tsx', '.js' ]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: require.resolve('awesome-typescript-loader'),
						options: {
							// compile with TypeScript, then transpile with Babel
							useBabel: true
						}
					}
				]
			}
		]
	},
	optimization: {
		minimizer: [
			new TerserPlugin(
				{
					// terserOptions: {
					// 	output: {
					// 		comments: true
					// 	}
					// }
				}
			)
		],
		minimize: true,
		usedExports: true
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	include: /\.min\.js$/,
		// 	minimize: true
		// }),
		new CopyWebpackPlugin([ { from: 'demo/index.html', to: '.' } ])
	]
};
