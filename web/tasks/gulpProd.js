var gulp = require("gulp"),
	sass = require("gulp-sass"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	exec = require("child_process").exec;

module.exports = function (env, input, output) {
	
	gulp.task("build", ["sass", "webpack:build"]);

	gulp.task("sass", function () {
		var style = env.isProduction ? "compressed" : "expanded";
		return gulp.src(input.scss)
			.pipe(sass({ outputStyle: style }).on('error', sass.logError))
			.pipe(gulp.dest(output.css));
	});

	gulp.task("webpack:build", ["uglify:js"]);
	
	gulp.task("webpack", function (cb) {
		var cmd = (env.isWindows) ?
			".\\node_modules\\.bin\\webpack.cmd" :
			"./node_modules/.bin/webpack";
		exec(cmd, function (err) {
			if (!err) cb(null)
			else cb(true);
		});
	})

	gulp.task("uglify:js", ["webpack"], function () {
		var options = {
			mangle: false,
			output: {
				semicolons: true,
			},
			compress: {
				warnings: false
			}
		};

		gulp.src([output.js + "/**/*.js",
			"!" + output.js + "/**/*.min.js"])
			.pipe(uglify(options))
			.pipe(rename((path) => path.basename += ".min"))
			.pipe(gulp.dest(output.js));
	});
}
