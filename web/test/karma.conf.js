var webpackConfig = require("../webpack.config.js");

module.exports = function (config) {
	config.set({
		frameworks: ["jasmine"],
		basePath: "../",
		files: [
			"wwwroot/lib/jquery/dist/jquery.js",
			"wwwroot/lib/angular/angular.js",
			"wwwroot/lib/angular-animate/angular-animate.js",
			"wwwroot/lib/angular-route/angular-route.js",
			"wwwroot/lib/angular-mocks/angular-mocks.js",
			"wwwroot/js/site.js",
		// { pattern: "src/js/**/*.js", included: true, served: true, watched: true },
		// { pattern: "wwwroot/template/**/*.html", included: false, served: true },
			"wwwroot/template/**/*.html",
			"test/unit/**/*Spec.*"
		],
		// proxies: {
		// 	"/template": "/base/wwwroot/template/"
		// },
		preprocessors: {
			"test/unit/**/*Spec.*": ["webpack"],
			"wwwroot/template/**/*.html": "ng-html2js"
		},

		// Webpack
		webpack: {
			module: webpackConfig.module,
		},
		webpackMiddleware: {
            noInfo: true
        },
		
		// Reporter
		reporters: ["mocha"],
		mochaReporter: {
			output: "full",
			divider: "-"
		},
		
		// Custom PhantomJS 
		browsers: ["MyPhantomJS"],
		customLaunchers: {
			'MyPhantomJS': {
				base: 'PhantomJS',
				options: {
					windowName: 'my-window',
					settings: {
					},
				},
				flags: ['--load-images=false'],
			}
		},

		plugins: [
			"karma-jasmine",
			"karma-webpack",
			"karma-mocha-reporter",
			"karma-phantomjs-launcher",
			"karma-ng-html2js-preprocessor"
		],
		autowatch: true,
		singleRun: false,
	})
}