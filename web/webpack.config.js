var path = require("path");

module.exports = {
	context: __dirname,
	entry: {
		site: "./src/js/site.js"
	},
	output: {
		path: "wwwroot/js",
		filename: "[name].js"
	},
	cache: true,
	module: {
		loaders: [
			{
				test: /(\.js)|(\.jsx)$/,
				include: [
					path.resolve(__dirname, "src", "js"),
					path.resolve(__dirname, "test", "unit")
				],
				// exclude: /(node_modules|bower_components|lib)/,
				loader: "babel-loader",
				query: {
					presets: ['es2015'],
					cacheDirectory: true
				}
			}
		]
	}
}