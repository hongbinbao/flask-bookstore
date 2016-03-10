exports.config = {
	baseUrl: "http://localhost:5004/",

	framework: "jasmine",

	suites: {
		mainView: ["e2e/mainViewSpec.js", "e2e/searchBookSpec.js"],
		detailView: "e2e/detailViewSpec.js"
	},

	capabilities: {
		"browserName": "chrome"
	},
	
	// PhantomJS is not as expected
	
	// multiCapabilities: [
	// 	{
	// 		"browserName": "chrome"
	// 	}, {
	// 		"browserName": "phantomjs",
	// 		"phantomjs.ghostdriver.cli.args": ["--loglevel=NONE"]
	// 	}
	// ],
	
	onPrepare: function () {
		// Disable animations
		var disableNgAnimate = function () {
			angular.module("disableNgAnimate", []).run(["$animate", function ($animate) {
				$animate.enabled(false);
			}]);
		};
		browser.addMockModule("disableNgAnimate", disableNgAnimate);
		
		// Reporter
		var SpecReporter = require("jasmine-spec-reporter");
		jasmine.getEnv().addReporter(new SpecReporter({
			displayStacktrace: "specs"
		}));
	},

	allScriptsTimeout: 11000,

	jasmineNodeOpts: {
		print: function () { },
		showColors: true,
	}
};
