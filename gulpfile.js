var gulp    = require('gulp');
var webpack = require('gulp-webpack');
var del     = require('del');
var react   = require('gulp-react');

gulp.task('default', function () {
	// place code for your default task here
});

// Build for production
var buildDir = 'build';
gulp.task("build", ['clean:build', "webpack:build", "react:build"]);

gulp.task('clean:build', function (callback) {
	del(buildDir, callback);
});
gulp.task("webpack:build", ['clean:build'], function () {
	var config = require('./config/webpack.build');

	return gulp.src('app/client/main.jsx')
		.pipe(webpack(config))
		.pipe(gulp.dest(buildDir + '/app/public/js'));
});

gulp.task("react:build", ['clean:build'], function () {
	return gulp.src('./app/components/**/*.jsx', {base: './app/'})
		.pipe(react())
		.pipe(gulp.dest(buildDir + '/app'));
});