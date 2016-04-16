var env = {
	isWindows: process.platform.indexOf("win") !== -1,
	isProduction: /production/i.test(process.env.NODE_ENV)
};

var input = {
	html: ["../BookStore/Views/**/*.cshtml", "wwwroot/template/**/*.html"],
	scss: {
		target: ["src/css/site.scss"],
		watch: ["src/css/**/*.scss"]
	},
	js: "src/js/**/*.js"
};

var output = {
	css: "wwwroot/css",
	js: "wwwroot/js"
};

console.log("Environment: " + (process.env.NODE_ENV || "Development"));

// Load production tasks
require("./tasks/gulpProd.js")(env, input, output);

// Load development tasks
if (!env.isProduction) require("./tasks/gulpDev.js")(env, input, output);
