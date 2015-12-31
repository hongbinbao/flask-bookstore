var gulp = require("gulp"),
	spawn = require("child_process").spawn,
	browserSync = require("browser-sync");

module.exports = function (env, input, output) {

	gulp.task("build:dev", ["sass", "webpack:watch"]);

	gulp.task("webpack:watch", function () {
		var cmd = (env.isWindows) ? "webpack.cmd" : "webpack";
		spawn(cmd, ["--watch"], {
			detached: false,
			stdio: "inherit"
		})
	});

	gulp.task("browser-sync", ["build:dev"], function () {
		browserSync.init({
			proxy: "localhost:5004",
			// reloadDelay: 2000,
			snippetOptions: {
				rule: {
					match: /<\/body>/i,
					fn: (snippet, match) => snippet + match
				}
			}
		});
	});

	gulp.task("dev", ["browser-sync"], function () {
		// Watch HTML
		gulp.watch(input.html).on("change", browserSync.reload);
	
		// Watch SCSS
		gulp.watch(input.scss, ["sass"]);
		gulp.watch(output.css + "/**/*.css")
			.on("change", browserSync.reload);
	
		// Watch JS
		gulp.watch(output.js + "/**/*.js")
			.on("change", browserSync.reload);
	});

	gulp.task("test:cs", function () {
		spawn("dnx", ["test"], {
			cwd: "../BookLibrary.Test",
			detached: true,
			stdio: "inherit"
		});
	});
}
