'use strict';
var gulp      = require('gulp');
var gutil     = require('gulp-util');
var config    = require('../config').cachebust;
var CacheBust = require('gulp-cachebust');

var cacheBust = new CacheBust();

gulp.task('cachebust', ['cachebust:collect', 'cachebust:replace']);

// collect resources for cache cachebusting
gulp.task('cachebust:collect', ['sass', 'webpack', 'copy'], function () {
	return gulp.src(config.assets)
		.pipe(cacheBust.resources());
});

// replace collected resources
gulp.task('cachebust:replace', ['cachebust:collect'], function () {

	gutil.log('[cachebust:replace] ' + Object.keys(cacheBust.mappings).length + ' asset(s)...');

	return gulp.src(config.src)
		.pipe(cacheBust.references())
		.pipe(gulp.dest(config.dest));
});