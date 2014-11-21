"use strict";

var gulp = require('gulp');
var fs = require('fs-extra');
var gutil = require("gulp-util");
var filter = require('gulp-filter');
var replace = require('gulp-replace');
var sass = require('gulp-ruby-sass');

var Promise = require('es6-promise').Promise;

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

var webpack = require("webpack");
var webpackBuild = require('./webpack.config.build');
var webpackDev = require('./webpack.config.dev');

var paths = {
	build: 'build/',
	app: 'app/',
	style: 'app/style/main.scss',
	publicCSS: 'app/public/css',
	components: 'app/components/**/*.jsx',
	routes: 'app/routes/**/*.js',
	views: 'app/views/**/*.ejs',
	staticFiles: 'app/public/**/*'
};

gulp.task('css', function () {
	return gulp.src(paths.style)
		.pipe(sass())
		.on('error', function (err) {
			console.log(err.message);
		})
		.pipe(gulp.dest(paths.publicCSS));
});


// Build for production
gulp.task('build', ['clean:build', 'webpack:build', 'copy:build', 'copy:node-modules:build', 'bust:build']);

// Clean build directory
gulp.task('clean:build', function (callback) {
	fs.remove(paths.build, callback);
});

// Create chunks and uglify with webpack
gulp.task('webpack:build', ['clean:build'], function (callback) {
	webpack(webpackBuild, function (err, stats) {
		if (err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString({
			colors: true,
			hash: false,
			timings: false,
			assets: true,
			chunks: false,
			chunkModules: false,
			modules: false,
			children: true
		}));
		callback();
	});
});

// Copy the app to the build directory
gulp.task('copy:build', ['clean:build'], function () {
	var src = [
		'package.json',
		'server.js',
		paths.app + '*.js',
		paths.components,
		paths.routes,
		paths.views,
		paths.staticFiles
	];
	var filterViews = filter('**/*.ejs');
	return gulp.src(src, {
		base: '.'
	})

	// Replace the development public path of webpack with the build public path
	.pipe(filterViews)
		.pipe(replace(webpackDev.output.publicPath, webpackBuild.output.publicPath))
		.pipe(filterViews.restore())

	.pipe(gulp.dest(paths.build));
});


// Cache busters
gulp.task('bust:build', ['bust-collect:build', 'bust-replace:build']);

// Collect resources for cache busting
gulp.task('bust-collect:build', ['webpack:build', 'copy:build'], function () {
	return gulp.src(paths.staticFiles, {
			cwd: paths.build
		})
		.pipe(cachebust.resources());
});

// Replace collected resources
gulp.task('bust-replace:build', ['bust-collect:build'], function () {

	var src = [paths.views, paths.publicCSS + '*.css'];

	return gulp.src(src, {
			cwd: paths.build,
			base: paths.build
		})
		.pipe(cachebust.references())
		.pipe(gulp.dest(paths.build));
});

// Copy dependencies to build directory
gulp.task('copy:node-modules:build', ['clean:build'], function (callback) {

	var dest = paths.build + 'node_modules/';
	fs.mkdirsSync(dest);
	var promises = [];

	var promiseFromCopy = function (source, dest) {
		return new Promise(function (resolve, reject) {
			fs.copy(source, dest, function (err) {
				if (err) {
					reject(err);
				} else {
					resolve(true);
				}
			});
		});
	};

	var packages = require('./package.json').dependencies;
	for (var pkg in packages) {
		var path = './node_modules/' + pkg;
		// console.log(path)
		promises.push(promiseFromCopy(path, dest + pkg));
	}
	// callback()

	Promise.all(promises).then(function () {
		gutil.log("[copy]", 'Copied ' + Object.keys(packages).length + ' module(s).');
		callback();
	});

});