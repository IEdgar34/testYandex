const gulp = require("gulp");
const webpack = require("webpack-stream");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));

gulp.task("styles", () => {
	return gulp
		.src("src/sass/style.scss")
		.pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
		.pipe(autoprefixer({ overrideBrowserslist: ["last 2 version"] }))
		.pipe(browserSync.stream())
		.pipe(gulp.dest("dist/css"));
});
gulp.task("content", () => {
	return gulp
		.src(["src/icons/*", "src/css/fonts.css"], { base: "src" })
		.pipe(browserSync.stream())
		.pipe(gulp.dest("dist"));
});

gulp.task("img", () => {
	return gulp.src("src/images/**/*.{png,jpg,jpeg,gif,svg}", { encoding: false }).pipe(gulp.dest("dist/images"));
});

gulp.task("html", () => {
	return gulp.src("src/**/**.html").pipe(browserSync.stream()).pipe(gulp.dest("dist"));
});
gulp.task("build", () => {
	return gulp
		.src("./src/js/main.js")
		.pipe(
			webpack({
				mode: "development",
				output: {
					filename: "script.js",
				},
				watch: false,
				devtool: "source-map",
				module: {
					rules: [
						{
							test: /\.m?js$/,
							exclude: /(node_modules|bower_components)/,
							use: {
								loader: "babel-loader",
								options: {
									presets: [
										[
											"@babel/preset-env",
											{
												debug: true,
												corejs: 3,
												useBuiltIns: "usage",
											},
										],
									],
								},
							},
						},
					],
				},
			})
		)
		.pipe(gulp.dest("dist"))
		.on("end", browserSync.reload);
});

gulp.task("server", () => {
	browserSync.init({
		server: "./dist/",
		port: 4000,
		notify: true,
	});
	gulp.watch("./src/sass/**/*.+(sass|scss)", gulp.parallel("styles"));
	gulp.watch("./src/**/*.html", gulp.parallel("html"));
	gulp.watch("./src/js/**/*.*", gulp.parallel("build"));
	gulp.watch(["src/fonts/**/*.*", "src/icons/**/*.*", "src/images/**/*.*"], gulp.parallel("content", "img"));
});

gulp.task("default", gulp.parallel("server", "html", "styles", "img"));
